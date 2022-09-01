import { Button, Divider, Subtitle1 } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import { Project } from 'renderer/types/Project';
import { Box } from '../Common';
import CheckpointList from './CheckpointList';
import {
  ActionButtonWrapper,
  ButtonActionWrapper,
  CheckpointWrapper,
  ProjectCheckpointWrapper,
  Subtitle,
} from './styled-components';

interface ProjectCheckpointProps {
  project: Project;
}

const ProjectCheckpoint = ({ project }: ProjectCheckpointProps) => {
  const navigate = useNavigate();

  const requestLoadDataset = () => {
    window.electron.ipcRenderer.sendMessage('loadDataset', [project.id]);
  };

  const goToCheckDataset = () => {
    navigate(`/project/${project.id}/dataset`);
  };

  const goToTrainingModel = () => {
    navigate(`/project/${project.id}/training-model`);
  };

  const status = !project?.datasetPath ? 'LOAD_DATASET' : 'SELECT_AREA';
  const isCheckEnabled = !!project?.datasetPath;

  return (
    <ProjectCheckpointWrapper>
      <ButtonActionWrapper>
        <ActionButtonWrapper>
          <Button onClick={requestLoadDataset}>Load your dataset</Button>
          <Button disabled={!isCheckEnabled} onClick={goToCheckDataset}>
            Check
          </Button>
        </ActionButtonWrapper>
        <ActionButtonWrapper>
          <Button disabled={!isCheckEnabled}>Select your area</Button>
          <Button disabled={!isCheckEnabled}>Check</Button>
        </ActionButtonWrapper>

        <Divider />

        <Button>Generate your pre-processing</Button>
        <Button onClick={goToTrainingModel}>Training Model</Button>
        <Button>Future Prediction</Button>
      </ButtonActionWrapper>

      <CheckpointWrapper>
        <Box>
          <Subtitle>
            <Subtitle1>Pipeline Modeling</Subtitle1>
          </Subtitle>
          <CheckpointList status={status} />
        </Box>
      </CheckpointWrapper>
    </ProjectCheckpointWrapper>
  );
};

export default ProjectCheckpoint;
