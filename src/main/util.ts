/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { Project } from 'renderer/types/Project';
import Store from 'electron-store';
import fs from 'fs';
import Papa from 'papaparse';
import { v4 as uuidV4 } from 'uuid';
import { app } from 'electron';

const store = new Store();

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const getProjects = (): Project[] => {
  return (store.get('projects') || []) as Project[];
};

export const getProject = (id: string) => {
  const projects = getProjects();
  return projects.find((project) => project.id === id);
};

export const saveProject = (newProject: Project) => {
  const projects = getProjects();
  const newProjects = projects.map((project) => {
    if (project.id === newProject.id) {
      return newProject;
    }
    return project;
  });
  store.set('projects', newProjects);
};

export const saveDataset = (dataset: any, filePath: string) => {
  const csv = Papa.unparse(dataset);

  fs.writeFileSync(filePath, csv);

  return filePath;
};

export const loadSavedDataset = (filePath: string) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);

    Papa.parse(fileStream, {
      complete: resolve,
      error: reject,
    });
  });
};
