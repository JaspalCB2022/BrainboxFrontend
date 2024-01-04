import React from 'react';
import { FormText } from "./styled";
import { FormLabelProps } from './types';



export const FormLabel: React.FC<FormLabelProps> = ({ title, errorMessage, required }) => {
  return (
    <FormText error={errorMessage}>
      {title}<span style={{ color: 'red' }}>{required ? '*' : null}</span>
    </FormText>
  );
};

