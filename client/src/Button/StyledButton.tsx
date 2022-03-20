import Styled from 'styled-components';

export const Button = Styled.button`
  width: 100px;
  height: 50px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.2);
  &.primary {
    color: #e6cab5;
    font-weight: 700;
    border: 1px solid #f3512f;
    background: #FF5D3B;
    &:hover {
      background: #e6cab5;
      color: #5b5f51;
      border: 1px solid #dabea9;
    }
  }
  &.secondary {
    color: #ff5d3b;
    font-weight: 700;
    border: 1px solid #4f5345;
    background: #4f5345;
    &:hover {
      background: #e6cab5;
      color: #5b5f51;
      border: 1px solid #dabea9;
    }
  }
`;
