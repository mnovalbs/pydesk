import { Button, Title1 } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { ArrowLeft16Filled } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project as IProject } from 'renderer/types/Project';
import { Box, Wrapper } from 'renderer/components/Common';
import ProjectCheckpoint from 'renderer/components/ProjectCheckpoint';

const Project = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<IProject[]>([]);
  const navigate = useNavigate();

  const fetchProjects = () => {
    window.electron.ipcRenderer.sendMessage('getProjects', []);
    window.electron.ipcRenderer.once('getProjects', setProjects);
  };

  window.electron.ipcRenderer.once('datasetLoaded', fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, []);

  const goToProjectList = () => navigate('/');

  const selectedProject = projects.find((project) => project.id === id);

  return (
    <Wrapper>
      <div>
        <Button icon={<ArrowLeft16Filled />} onClick={goToProjectList}>
          Back
        </Button>
      </div>

      <Title1>Project: {selectedProject?.name || '-'}</Title1>

      <Box>
        {!selectedProject && <Alert intent="error">Project not found</Alert>}
        {!!selectedProject && <ProjectCheckpoint project={selectedProject} />}
      </Box>
    </Wrapper>
  );
};

export default Project;
