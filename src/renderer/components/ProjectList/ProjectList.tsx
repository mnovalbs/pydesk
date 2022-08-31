import { Title1 } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { Add12Filled } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from 'renderer/types/Project';
import { Box, Wrapper } from 'renderer/components/Common';
import { v4 as uuidv4 } from 'uuid';
import ProjectAddModal from '../ProjectAddModal';
import ProjectCard from '../ProjectCard';
import { ListWrapper } from './styled-components';

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('getProjects', []);
    window.electron.ipcRenderer.once('getProjects', setProjects);
  }, []);

  const closeModalAdd = () => setIsModalAddOpen(false);
  const openModalAdd = () => setIsModalAddOpen(true);

  const addProject = (name: string, description: string) => {
    const newProject = {
      id: uuidv4(),
      name,
      description,
    };
    const newProjects = projects.concat([newProject]);

    setProjects(newProjects);
    window.electron.ipcRenderer.sendMessage('dbSet', ['projects', newProjects]);

    closeModalAdd();

    navigate(`/project/${newProject.id}`);
  };

  const showAlert = projects.length === 0;

  return (
    <Wrapper>
      <Title1>Your Projects</Title1>

      <Box>
        {showAlert && (
          <Alert intent="info">
            You don&apos;t have any active project yet.
          </Alert>
        )}

        <ListWrapper>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}

          <div onClick={openModalAdd}>
            <ProjectCard
              image={<Add12Filled />}
              project={{
                id: '',
                name: 'Add New Project',
                description: 'Click to add new project',
              }}
            />
          </div>
        </ListWrapper>
      </Box>

      <ProjectAddModal
        open={isModalAddOpen}
        onClose={closeModalAdd}
        onSubmit={addProject}
      />
    </Wrapper>
  );
};

export default ProjectList;
