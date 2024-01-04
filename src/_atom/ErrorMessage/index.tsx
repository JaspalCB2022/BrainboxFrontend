import React from 'react';
import './styled'; 
import { Error } from './styled';
import { ErrorMessageProps } from './types';



export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <Error>{message}</Error>;
};

