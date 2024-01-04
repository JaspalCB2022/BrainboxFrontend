import React from 'react';
import { LineDiv } from "./styled";
import { LineProps } from './types';


const Line: React.FC<LineProps> = ({ color }) => {
  return (
    <LineDiv color={color} />
  );
};

export default Line;
