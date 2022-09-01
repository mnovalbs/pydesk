import styled from 'styled-components';

export const ProjectCheckpointWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonActionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;

  button {
    max-width: 100%;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  gap: 15px;

  & > button:first-child {
    flex: 1;
  }
`;

export const CheckButtonWrapper = styled.div`
  max-width: 100px;
`;

export const CheckpointWrapper = styled.div`
  flex: 1;
  max-width: 400px;
`;

export const Subtitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const CheckpointListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const CheckpointItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
`;
