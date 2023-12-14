import React from 'react';
import { LineDiv } from "./styled";

interface LineProps {
  color?: string;
}

const Line: React.FC<LineProps> = ({ color }) => {
  return (
    <LineDiv color={color} />
  );
};

export default Line;
