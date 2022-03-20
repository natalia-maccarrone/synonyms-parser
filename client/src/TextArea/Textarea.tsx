import * as S from './StyledTextArea';

export interface IProps {
  setText: (text: string) => void;
  text: string;
}

const TextArea = ({ setText, text }: IProps) => {
  return (
    <S.TextArea
      placeholder="Enter your text here..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default TextArea;
