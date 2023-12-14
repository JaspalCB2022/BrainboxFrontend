import styled from "styled-components";

interface LineDivProps {
  color?: string;
  theme: {
    colors: {
      primary: string;
    };
  };
}

export const LineDiv = styled.div<LineDivProps>`
  background-color: ${({ color, theme }) => (!color ? theme.colors.primary : color)};
  display: flex;
  width: 62px;
  height: 2px;
  flex-direction: column;
  margin: auto 0;
`;
