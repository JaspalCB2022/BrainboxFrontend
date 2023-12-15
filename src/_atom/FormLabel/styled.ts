import styled from "styled-components";

interface FormTextProps {
  error?: boolean | string | undefined;
  theme: {
    colors: {
      error: string;
      text: string;
    };
    fontSizes: {
      medium: string;
    };
    breakpoints: {
      mobile: string;
    };
  };
}

export const FormText = styled.div<FormTextProps>`
  color: ${({ error, theme }) => (error ? theme.colors.error : theme.colors.text)};
  align-self: stretch;
  margin-top: 16px;
  white-space: nowrap;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 600;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 40px;
    white-space: initial;
  }
`;
