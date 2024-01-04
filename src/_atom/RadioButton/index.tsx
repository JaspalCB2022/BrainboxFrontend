import React from 'react';
import { RadioBtn } from "./styled";
import { RadioButtonProps } from './types';



export const RadioButton: React.FC<RadioButtonProps> = ({ label, checked, onChange }) => (
  <RadioBtn>
    <input type="radio" className="in" checked={checked} onChange={onChange} />
    {label}
  </RadioBtn>
);

