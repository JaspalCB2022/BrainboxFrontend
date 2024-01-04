import React from "react";
import { CircleDiv } from "./styled";
import { CircleProps } from "./types";



function Circle({ text, color, active, content }: CircleProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {active ? <div className="tooltip">{content}</div> : null}
      <CircleDiv color={color}>{text}</CircleDiv>
    </div>
  );
}

export default Circle;
