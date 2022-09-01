import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: calc(100vh - 60px);
`;

export const Box = styled.div`
  width: 100%;
  border: 1px solid #424242;
  min-height: 400px;
  padding: 30px;
  flex: 1;
`;

export const BoxScroll = styled.div`
  overflow-x: auto;
`;
