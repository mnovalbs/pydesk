import { Button, Divider, Subtitle1, Title2 } from '@fluentui/react-components';
import { Box } from '../Common';
import CheckpointList from './CheckpointList';
import {
  ButtonActionWrapper,
  CheckpointWrapper,
  ProjectCheckpointWrapper,
  Subtitle,
} from './styled-components';

const ProjectCheckpoint = () => {
  return (
    <ProjectCheckpointWrapper>
      <ButtonActionWrapper>
        <Button>Load your dataset</Button>
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
          <CheckpointList />
        </Box>
      </CheckpointWrapper>
    </ProjectCheckpointWrapper>
  );
};

export default ProjectCheckpoint;
