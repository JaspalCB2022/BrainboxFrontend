import styled from "styled-components";
import { InputText, InputTextProps } from 'primereact/inputtext';

interface CustomInputTextProps extends InputTextProps {
  error?: string;
}

export const TextInput = styled(InputText)<CustomInputTextProps>`
  border-radius: 5px;
  border: ${({ error, theme }) => (error ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.formBorder}`)};
  background-color: #fff;
  align-self: stretch;
  display: flex;
  width: 100%;
  padding-left: 10px;
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-top: 11px;
  height: 50px;
  flex-direction: column;
  &:focus {
    outline: none;
    border: ${({ error, theme }) => (error ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.formBorder}`)};
  }
`;
