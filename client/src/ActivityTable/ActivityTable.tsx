import { v4 as uuidv4 } from 'uuid';
import * as S from './StyledActivityTable';

interface IProps {
  synonyms: {
    synonyms_found: number;
    word: string;
  }[];
}

const ActivityTable = ({ synonyms }: IProps) => {
  return (
    <S.Container>
      <S.TableTitle>Synonyms per word</S.TableTitle>
      <S.Container>
        <S.Row>
          <h4>Word</h4>
          <h4>Count</h4>
        </S.Row>
        {synonyms.map((row) => {
          return (
            <S.Row key={uuidv4()}>
              <p>{row.word}</p>
              <p>{row.synonyms_found}</p>
            </S.Row>
          );
        })}
      </S.Container>
    </S.Container>
  );
};

export default ActivityTable;
