import { useState } from 'react';
import axios from 'axios';

// Components
import ActivityTable from '../ActivityTable/ActivityTable';
import Title from '../Title/Title';
import TextArea from '../TextArea/Textarea';
import Button from '../Button/Button';

// Styles
import * as S from './StyledParser';

const Parser = () => {
  const [text, setText] = useState<string>('');
  const [showTable, setShowTable] = useState(false);
  const [synonyms, setSynonyms] = useState([]);

  const BASE_URL: string =
    process.env.REACT_APP_BASE_URL || 'http://localhost:4000/parse';

  const handleParse = async () => {
    if (text) {
      const response = await axios.post(`${BASE_URL}/parse`, { text });
      if (response?.data?.length) {
        setSynonyms(response.data);
        setShowTable(true);
      }
    }
  };

  const handleClear = () => {
    setText('');
    setShowTable(false);
  };

  return (
    <S.Container>
      <S.ParserContainer>
        <Title />
        <TextArea text={text} setText={setText} />
        <S.ButtonsContainer>
          <Button styleType="secondary" onClick={() => handleClear()}>
            Clear
          </Button>
          <Button styleType="primary" onClick={() => handleParse()}>
            Parse
          </Button>
        </S.ButtonsContainer>
        {showTable && <ActivityTable synonyms={synonyms} />}
      </S.ParserContainer>
    </S.Container>
  );
};

export default Parser;
