import { Button, Title1 } from '@fluentui/react-components';
import { ArrowLeft16Filled } from '@fluentui/react-icons';
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Wrapper } from './index';

interface PageWrapperProps {
  children: ReactNode;
  title: string;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Wrapper>
      <div>
        <Button icon={<ArrowLeft16Filled />} onClick={goBack}>
          Back
        </Button>
      </div>

      <Title1>{title}</Title1>

      <Box>{children}</Box>
    </Wrapper>
  );
};

export default PageWrapper;
