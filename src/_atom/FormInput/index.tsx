import React from 'react';
import { TextInput } from "./styled";
import { FormInputProps } from './types';

export const FormInput: React.FC<FormInputProps> = ({
  field,
  form,
  tooltip,
  errorMessage,
  ...props
}) => {
  return <TextInput {...field} tooltipOptions={{ position: 'left' }} tooltip={tooltip} {...props} error={errorMessage} />;
};

