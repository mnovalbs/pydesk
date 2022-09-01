import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;

  & > span {
    width: 100%;
  }

  input {
    flex: 1;
  }
`;

export const ImageWrapper = styled.div`
  width: 400px;
  height: 400px;
  background-color: #eee;
  display: block;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;
