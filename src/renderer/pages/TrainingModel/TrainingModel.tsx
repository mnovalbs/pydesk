import {
  Button,
  Divider,
  Input,
  Label,
  makeStyles,
  Slider,
  Textarea,
  Title3,
} from '@fluentui/react-components';
import { useState } from 'react';
import PageWrapper from 'renderer/components/Common/PageWrapper';
import {
  InputWrapper,
  Section,
  TrainingActionButtons,
  TrainingLogTitle,
  TrainingModelWrapper,
  TrainingWrapper,
} from './styled-components';

const useStyles = makeStyles({
  textarea: {
    width: '100%',
    minHeight: '90px',
  },
});

const TrainingModel = () => {
  const [sliderValue, setSliderValue] = useState(70);

  const classes = useStyles();

  return (
    <PageWrapper title="Training Model">
      <TrainingModelWrapper>
        <Section>
          <Title3>Model and Hyperparameters (regression)</Title3>
          <InputWrapper>
            <Input placeholder="Model" />
            <Input placeholder="Learning rate" />
            <Input placeholder="Batch size" />
            <Input placeholder="Epochs" />
            <Input placeholder="Loss function" />
          </InputWrapper>
        </Section>

        <Section>
          <Title3>Model and Hyperparameters (classification)</Title3>
          <InputWrapper>
            <Input placeholder="Model" />
            <Input placeholder="Learning rate" />
            <Input placeholder="Batch size" />
            <Input placeholder="Epochs" />
            <Input placeholder="Loss function" />
            <Input placeholder="SMOTE" />
          </InputWrapper>
        </Section>

        <Section>
          <Title3>Class Labeling</Title3>
          <InputWrapper>
            <Input placeholder="Low Risk" />
            <Input placeholder="Normal" />
            <Input placeholder="Risk" />
            <Input placeholder="High Risk" />

            <div>
              <div>
                <Slider
                  id="slider"
                  value={sliderValue}
                  min={20}
                  max={100}
                  onChange={(e, newVal) => setSliderValue(newVal.value)}
                />
              </div>
              <Label htmlFor="slider">
                Split your data ({sliderValue}/100)
              </Label>
            </div>
          </InputWrapper>
        </Section>

        <TrainingWrapper>
          <div>
            <TrainingLogTitle>
              <Title3>Training Log</Title3>
              <Input placeholder="Model name to save" />
            </TrainingLogTitle>
            <Textarea
              disabled
              className={classes.textarea}
              defaultValue="Training log here..."
            />
          </div>

          <TrainingActionButtons>
            <Button appearance="primary">Train</Button>
            <Button>Plot Confusion Matrix</Button>
            <Divider>or</Divider>
            <Button>Plot Series Prediction</Button>
          </TrainingActionButtons>
        </TrainingWrapper>
      </TrainingModelWrapper>
    </PageWrapper>
  );
};

export default TrainingModel;
