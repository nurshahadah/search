import React, { InputHTMLAttributes } from 'react';
import './TextInputBox.css';

export interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  // value: string;
}

const InputBox = ({
  className = '',
  placeholder = 'Type something',
  onChange,
}: InputBoxProps) => {
  return (
    <input
      className={`input-text ${className}`}
      type='text'
      placeholder={placeholder}
      {...(onChange && { onChange })}
    ></input>
  );
};

export default InputBox;
