import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  color: ${(props) => props.theme.colors.primaryLight};
  border-radius: 5px;
  border: ${({ disabled, theme }) => (!disabled ? '1px solid ' + theme.colors.primary : '1px solid ' + theme.colors.formBorder)};
  background-color: ${({ disabled, theme }) => (!disabled ? theme.colors.primary : 'gray')};
  align-self: stretch;
  align-items: center;
  padding: 18px 20px;
  font: 600 ${(props) => props.theme.fontSizes.medium} Plus Jakarta Sans, sans-serif;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
