/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import { v4 as uuidV4 } from 'uuid';
import { app, BrowserWindow, shell, ipcMain, dialog, protocol } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Project } from 'renderer/types/Project';
import Store from 'electron-store';
import axios from 'axios';
import rq from 'request-promise';
import MenuBuilder from './menu';
import {
  getProject,
  getProjects,
  loadSavedDataset,
  resolveHtmlPath,
  saveDataset,
  saveProject,
} from './util';

const PYTHON_API_URL = 'http://127.0.0.1:6001';

const api = axios.create({
  baseURL: PYTHON_API_URL,
});

const PYTHON_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets/engine/main')
  : path.join(__dirname, '../../assets/engine/main');
const spawnPy = spawn(PYTHON_PATH);
const store = new Store();

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('dbSet', async (event, [name, value]) => {
  store.set(name, value);
});

ipcMain.on('showDataset', async (event, [projectId]) => {
  const project = getProject(projectId);

  if (!project?.datasetPath) {
    return;
  }

  const dataset = await loadSavedDataset(project.datasetPath);
  event.reply('showDataset', dataset);
});

ipcMain.on('saveDataset', (event, [projectId, dataset]) => {
  const project = getProject(projectId);

  if (!project) {
    return;
  }

  const newFilePath = saveDataset(dataset, project.datasetPath!);
  const updatedProject: Project = {
    ...project,
    datasetPath: newFilePath,
  };

  saveProject(updatedProject);
});

ipcMain.on('createQrCode', async (event, [websiteUrl]) => {
  const appPath = app.getPath('userData');
  const fileName = `${uuidV4()}.png`;
  const filePath = `${appPath}/${fileName}`;

  try {
    const { data } = await api({
      method: 'POST',
      url: '/qrcode',
      data: {
        app_path: filePath,
        text: websiteUrl,
      },
    });

    event.reply('createQrCode', data.app_path);
  } catch (e) {
    console.error('createQrCode Error', e);
  }
});

ipcMain.on('loadDataset', (event, [projectId]) => {
  const project = getProject(projectId);

  if (!project) {
    return;
  }

  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'CSV', extensions: ['csv'] }],
    })
    .then(async (result) => {
      const [filePath] = result.filePaths;
      const appPath = app.getPath('userData');
      const fileName = `${uuidV4()}.csv`;
      const newFilePath = `${appPath}/${fileName}`;

      fs.copyFileSync(filePath, newFilePath);
      const updatedProject: Project = {
        ...project,
        datasetPath: newFilePath,
      };

      saveProject(updatedProject);
      const dataset = await loadSavedDataset(newFilePath);
      event.reply('datasetLoaded', dataset);
    })
    .catch(console.error);
});

ipcMain.on('getProjects', async (event) => {
  const projects = getProjects();
  event.reply('getProjects', projects);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async (pythonProcess: ChildProcessWithoutNullStreams) => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;

    if (pythonProcess) {
      console.log('kill python process');
      pythonProcess.kill('SIGINT');
    }
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  protocol.registerFileProtocol('local-protocol', (request, callback) => {
    const url = request.url.replace('local-protocol://getMediaFile/', '');
    try {
      return callback(url);
    } catch (error) {
      console.error(error);
      return callback('404');
    }
  });
});

const waitTime = (time = 5) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      return resolve('OK!');
    }, time * 1000)
  );
};

const startUp = async (errorCount = 0) => {
  try {
    console.log('wait python server');
    await waitTime(5);
    await rq(PYTHON_API_URL);
    console.log('python ready');
    createWindow(spawnPy);
  } catch (e: any) {
    console.error('python error', e.message);
    if (errorCount < 5) {
      startUp(errorCount + 1);
    } else {
      throw Error('max error exceeded');
    }
  }
};

app
  .whenReady()
  .then(() => {
    startUp();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) startUp();
    });
  })
  .catch(console.log);
