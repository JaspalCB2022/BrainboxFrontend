import React from 'react';
import { RadioBtn } from "./styled";

interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ label, checked, onChange }) => (
  <RadioBtn>
    <input type="radio" className="in" checked={checked} onChange={onChange} />
    {label}
  </RadioBtn>
);

