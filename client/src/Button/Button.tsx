import * as S from './StyledButton';

export interface IProps {
  children: String;
  styleType?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ children, styleType, onClick }: IProps) => {
  return (
    <S.Button className={styleType} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
