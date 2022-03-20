import Styled from 'styled-components';

export const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextArea = Styled.textarea`
  height: 250px; 
  width: 70vw;
  border: 8px solid #5b5f51;
  border-radius: 2px;
  &:focus-visible {
    outline: none;
  }
  resize: none;
  padding: 1rem;
`;
