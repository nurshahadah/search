import React, { useState, ChangeEvent, MouseEvent } from 'react';
import TextInput from '../../components/FormElements/TextInputBox/TextInputBox';
import './SearchBox.css';
import { useDebouncedCallback } from 'use-debounce';
import ResultBox from '../ResultBox/ResultBox';
import { getSearchResults } from '../../services/searchResult';

export interface SearchResultType {
  id: string;
  title: string;
  description: string;
}

const SearchBox = () => {
  const [value, setValue] = useState<string>();
  const [result, setResult] = useState<SearchResultType[]>();
  const [isTyping, setTyping] = useState<boolean>();

  const [debouncedFunction] = useDebouncedCallback((value: string) => {
    if (value === '') {
      return;
    }

    setTyping(true);
    setResult([]);

    getSearchResults(value)
      .then((response) => {
        setResult(response);
        setTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    debouncedFunction(event.target.value);
  };

  const displayResultBox = () => {
    if (!result || value === '') {
      return <></>;
    }

    if (isTyping) {
      return <div className='list-item'>Loading........</div>;
    }

    return result.length === 0 && value !== '' ? (
      <div className='list-item'>No results found</div>
    ) : (
      <ResultBox searchKey={value || ''} results={result} />
    );
  };

  return (
    <div id='search-box'>
      <TextInput value={value} onChange={handleChange} />
      <div className='result-container'>{displayResultBox()}</div>
    </div>
  );
};

export default SearchBox;
