import React, { HTMLProps, useState, MouseEvent } from 'react';
import './ResultList.css';
import WordHighlight from '../../components/WordHighlight/WordHighlight';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';

export interface ListProps {
  title: string;
  description: string;
  id: string;
}

export interface ResultListProps extends HTMLProps<HTMLDivElement> {
  dataList: ListProps[];
  searchKey: string;
  className?: string;
  onClose: () => void;
}

const ResultList = ({
  className = '',
  dataList,
  searchKey,
  // history,
  // location,
  // match,
  onClose,
}: ResultListProps) => {
  const history = useHistory();
  const handleClick = (event: MouseEvent<HTMLDivElement>, id: string) => {
    onClose();
    history.push(`/newfeed/${id}`);
  };

  return (
    <>
      {dataList.map(({ id, title, description }) => (
        <div
          key={id}
          className={`list-item ${className}`}
          onClick={(e) => handleClick(e, id)}
        >
          <p className={`font-bold list-title`}>
            <WordHighlight wordToHighlight={searchKey} sentence={title} />
          </p>
          <p>{description}</p>
        </div>
      ))}
    </>
  );
};

export default ResultList;
