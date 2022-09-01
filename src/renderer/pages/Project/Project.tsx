import { Alert } from '@fluentui/react-components/unstable';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project as IProject } from 'renderer/types/Project';
import ProjectCheckpoint from 'renderer/components/ProjectCheckpoint';
import PageWrapper from 'renderer/components/Common/PageWrapper';

const Project = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<IProject[]>([]);

  const fetchProjects = () => {
    window.electron.ipcRenderer.sendMessage('getProjects', []);
    window.electron.ipcRenderer.once('getProjects', setProjects);
  };

  window.electron.ipcRenderer.once('datasetLoaded', fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, []);

  const selectedProject = projects.find((project) => project.id === id);

  return (
    <PageWrapper title={`Project: ${selectedProject?.name || '-'}`}>
      {!selectedProject && <Alert intent="error">Project not found</Alert>}
      {!!selectedProject && <ProjectCheckpoint project={selectedProject} />}
    </PageWrapper>
  );
};

export default Project;
