import styled, { DefaultTheme } from "styled-components";

interface CircleDivProps {
  color?: string;
  theme: DefaultTheme;
}

export const CircleDiv = styled.div<CircleDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  white-space: nowrap;
  background-color: ${({ color, theme }) => (!color ? theme.colors.primary : color)};
  border-radius: 50%;
  align-self: stretch;
  width: 25px;
  height: 25px;
  aspect-ratio: 1.03125;
  font: 600 ${(props) => props.theme.fontSizes.large} Plus Jakarta Sans, -apple-system, Roboto, Helvetica,
    sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
