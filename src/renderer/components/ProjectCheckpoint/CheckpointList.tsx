import { Avatar } from '@fluentui/react-components';
import {
  Checkmark20Regular,
  ArrowRight20Filled,
  Info20Regular,
} from '@fluentui/react-icons';
import { CheckpointItem, CheckpointListWrapper } from './styled-components';

type Status = 'DONE' | 'IN_PROGRESS' | 'DISABLED';
type Checkpoint = {
  label: string;
  status: Status;
};

const checkpoints: Checkpoint[] = [
  {
    label: 'Load your dataset',
    status: 'DONE',
  },
  {
    label: 'Check your dataset',
    status: 'DONE',
  },
  {
    label: 'Select your area',
    status: 'IN_PROGRESS',
  },
  {
    label: 'Check your area',
    status: 'DISABLED',
  },
  {
    label: 'Generate your pre-processing',
    status: 'DISABLED',
  },
];

const statusMap = {
  DONE: {
    icon: <Checkmark20Regular />,
    color: 'teal',
  },
  IN_PROGRESS: {
    icon: <ArrowRight20Filled />,
    color: 'gold',
  },
  DISABLED: {
    icon: <Info20Regular />,
    color: 'beige',
  },
};

const CheckpointList = () => {
  return (
    <CheckpointListWrapper>
      {checkpoints.map((checkpoint) => {
        const { label, status } = checkpoint;
        const { color, icon } = statusMap[status];

        return (
          <CheckpointItem key={label}>
            <Avatar color={color as any} icon={icon} />
            {label}
          </CheckpointItem>
        );
      })}
    </CheckpointListWrapper>
  );
};

export default CheckpointList;
