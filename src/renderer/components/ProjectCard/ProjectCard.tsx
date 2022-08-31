import { Caption1, makeStyles, Text } from '@fluentui/react-components';
import { Card, CardHeader } from '@fluentui/react-components/unstable';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from 'renderer/types/Project';

interface ProjectCardProps {
  project: Project;
  image?: any;
}

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
});

const ProjectCard = ({ project, image }: ProjectCardProps) => {
  const { id, name, description } = project;
  const navigate = useNavigate();
  const classes = useStyles();

  const onProjectClick = () => {
    if (id) {
      navigate(`/project/${id}`);
    }
  };

  return (
    <Card className={classes.root} onClick={onProjectClick}>
      <CardHeader
        image={image}
        header={<Text weight="semibold">{name}</Text>}
        description={<Caption1>{description}</Caption1>}
      />
    </Card>
  );
};

export default ProjectCard;
