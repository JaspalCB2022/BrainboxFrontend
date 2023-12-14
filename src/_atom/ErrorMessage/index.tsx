import React from 'react';
import './styled'; 
import { Error } from './styled';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <Error>{message}</Error>;
};

