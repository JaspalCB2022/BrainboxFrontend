import styled from "styled-components";

interface ErrorProps {
  theme: {
    colors: {
      error: string;
    };
  };
}

export const Error = styled.div<ErrorProps>`
  color: ${(props) => props.theme.colors.error};
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
`;
