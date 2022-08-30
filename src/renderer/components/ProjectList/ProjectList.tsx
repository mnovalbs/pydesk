import { Title1 } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { Add12Filled } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import ProjectAddModal from '../ProjectAddModal';
import ProjectCard from '../ProjectCard';
import { ListWrapper, Wrapper } from './styled-components';

const ProjectList = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('getProjects', []);
    window.electron.ipcRenderer.once('getProjects', setProjects);
  }, []);

  const closeModalAdd = () => setIsModalAddOpen(false);
  const openModalAdd = () => setIsModalAddOpen(true);

  const addProject = (name: string, description: string) => {
    const newProject = {
      name,
      description,
    };
    const newProjects = projects.concat([newProject]);

    setProjects(newProjects);
    window.electron.ipcRenderer.sendMessage('dbSet', ['projects', newProjects]);

    closeModalAdd();
  };

  const showAlert = projects.length === 0;

  return (
    <Wrapper>
      <Title1>Your Projects</Title1>

      {showAlert && (
        <Alert intent="info">You don&apos;t have any active project yet.</Alert>
      )}

      <ListWrapper>
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
          />
        ))}

        <div onClick={openModalAdd}>
          <ProjectCard
            image={<Add12Filled />}
            name="Add New Project"
            description="Click to add new project"
          />
        </div>
      </ListWrapper>

      <ProjectAddModal
        open={isModalAddOpen}
        onClose={closeModalAdd}
        onSubmit={addProject}
      />
    </Wrapper>
  );
};

export default ProjectList;
