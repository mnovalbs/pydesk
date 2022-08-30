import { Caption1, makeStyles, Text } from '@fluentui/react-components';
import { Card, CardHeader } from '@fluentui/react-components/unstable';
import { ReactNode } from 'react';

interface ProjectCardProps {
  name: ReactNode;
  description: ReactNode;
  image?: any;
}

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
});

const ProjectCard = ({ name, description, image }: ProjectCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        image={image}
        header={<Text weight="semibold">{name}</Text>}
        description={<Caption1>{description}</Caption1>}
      />
    </Card>
  );
};

export default ProjectCard;
