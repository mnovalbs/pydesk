import { Avatar } from '@fluentui/react-components';
import {
  Checkmark20Regular,
  ArrowRight20Filled,
  Info20Regular,
} from '@fluentui/react-icons';
import { CheckpointItem, CheckpointListWrapper } from './styled-components';

type Status = 'DONE' | 'IN_PROGRESS' | 'DISABLED';
type Checkpoint = {
  id: string;
  label: string;
  status: Status;
};
type CheckpointListProps = {
  status: string;
};

const checkpoints: Checkpoint[] = [
  {
    id: 'LOAD_DATASET',
    label: 'Load your dataset',
    status: 'DISABLED',
  },
  {
    id: 'CHECK_DATASET',
    label: 'Check your dataset',
    status: 'DISABLED',
  },
  {
    id: 'SELECT_AREA',
    label: 'Select your area',
    status: 'DISABLED',
  },
  {
    id: 'CHECK_AREA',
    label: 'Check your area',
    status: 'DISABLED',
  },
  {
    id: 'GENERATE_PREPROCESSING',
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

const generateCheckpoints = (status: string): Checkpoint[] => {
  let isChecked = false;
  return checkpoints.map((checkpoint) => {
    const { id } = checkpoint;
    const isSelected = id === status;

    isChecked = isChecked || isSelected;

    let selectedStatus: Status = 'DISABLED';
    if (!isChecked) {
      selectedStatus = 'DONE';
    } else if (isSelected) {
      selectedStatus = 'IN_PROGRESS';
    }

    return {
      ...checkpoint,
      status: selectedStatus,
    };
  });
};

const CheckpointList = ({ status: checkpointStatus }: CheckpointListProps) => {
  return (
    <CheckpointListWrapper>
      {generateCheckpoints(checkpointStatus).map((checkpoint) => {
        const { status, label } = checkpoint;
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
