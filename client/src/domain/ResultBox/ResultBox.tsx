import React, { useState, useEffect } from 'react';
import Title from '../../components/Text/Title';
import { SearchResultType } from '../SearchBox/SearchBox';
import { BUTTON_TEXT } from '../SearchBox/constants';
import ResultList from './ResultList';

export interface ResultBoxProps {
  results: SearchResultType[];
  searchKey: string;
}

const ResultBox = ({ results, searchKey }: ResultBoxProps) => {
  const [showResult, setShow] = useState(true);

  const onClose = () => {
    setShow(false);
  };

  return showResult ? (
    <>
      <Title text={BUTTON_TEXT} />
      {
        <ResultList
          onClose={onClose}
          dataList={results}
          searchKey={searchKey}
        />
      }
    </>
  ) : (
    <></>
  );
};

export default ResultBox;
