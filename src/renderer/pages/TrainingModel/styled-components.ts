import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  align-items: start;

  & > span {
    max-width: 150px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TrainingModelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const TrainingLogTitle = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  & > span:last-child {
    flex: 1;
  }
`;

export const TrainingWrapper = styled.div`
  display: flex;
  gap: 20px;

  & > div:first-child {
    flex: 1;

    textarea {
      min-height: 86px;
    }
  }
`;

export const TrainingActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
