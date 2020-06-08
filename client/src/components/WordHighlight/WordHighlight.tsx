import React, { HTMLProps } from 'react';
import './WordHighlight.css';

export interface WordHighlightProps extends HTMLProps<HTMLSpanElement> {
  wordToHighlight: string;
  sentence: string;
  className?: string;
}

const WordHighlight = ({
  wordToHighlight,
  sentence,
  className = '',
}: WordHighlightProps) => {
  const regex = new RegExp(wordToHighlight, 'gi');
  const match = sentence.match(regex);
  if (!match) {
    return <>{sentence}</>;
  }

  const wordArray = sentence.split(regex);

  return (
    <>
      {wordArray.map((item, index) => {
        return (
          <span key={index} className={className}>
            {item}
            {index !== wordArray.length - 1 && (
              <span className='highlight-active'>{match[index]}</span>
            )}
          </span>
        );
      })}
    </>
  );
};

export default WordHighlight;
