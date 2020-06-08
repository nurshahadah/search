import React, { HTMLProps } from 'react';
import './Title.css';

export interface TitleProps extends HTMLProps<HTMLDivElement> {
  text: string;
}

const Title = ({ text, className = '', ...props }: TitleProps) => {
  return (
    <div className={`title ${className}`} {...props}>
      {text}
    </div>
  );
};

export default Title;
