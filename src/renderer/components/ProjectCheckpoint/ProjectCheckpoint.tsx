import { Button, Divider, Subtitle1 } from '@fluentui/react-components';
import { Project } from 'renderer/types/Project';
import { Box } from '../Common';
import CheckpointList from './CheckpointList';
import {
  ButtonActionWrapper,
  CheckpointWrapper,
  ProjectCheckpointWrapper,
  Subtitle,
} from './styled-components';

interface ProjectCheckpointProps {
  project: Project;
}

const ProjectCheckpoint = ({ project }: ProjectCheckpointProps) => {
  const requestLoadDataset = () => {
    window.electron.ipcRenderer.sendMessage('loadDataset', [project.id]);
  };

  const status = !project?.datasetPath ? 'LOAD_DATASET' : 'SELECT_AREA';

  return (
    <ProjectCheckpointWrapper>
      <ButtonActionWrapper>
        <Button onClick={requestLoadDataset}>Load your dataset</Button>
        <Button>Select your area</Button>

        <Divider />

        <Button>Generate your pre-processing</Button>
        <Button>Training Model</Button>
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
