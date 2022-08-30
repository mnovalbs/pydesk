import { Button, Input, Label, makeStyles } from '@fluentui/react-components';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-components/unstable';
import { useState } from 'react';
import { FormWrapper } from './styled-components';

interface ProjectAddModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
});

const ProjectAddModal = (props: ProjectAddModalProps) => {
  const { open, onClose, onSubmit } = props;

  const classes = useStyles();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Dialog open={open}>
      <DialogSurface aria-label="label">
        <DialogTitle>Add Project</DialogTitle>
        <DialogBody>
          <FormWrapper>
            <div>
              <Label>Project Name</Label>
              <Input
                className={classes.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Project Tag</Label>
              <Input
                className={classes.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </FormWrapper>
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            appearance="primary"
            onClick={() => onSubmit(name, description)}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

export default ProjectAddModal;
