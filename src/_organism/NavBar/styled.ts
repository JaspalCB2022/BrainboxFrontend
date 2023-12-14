import styled from "styled-components";

interface NavWrapperProps {
  width: string;
}

export const NavWrapper = styled.div<NavWrapperProps>`
  position: fixed;
  width: ${(props) => props.width};
  bottom: 0;
  top: 0;
  left: 0;
  border: 0px 1px 0px 0px;
  opacity: 0.07999999821186066px;
  z-index: 99;
  border-right: 1px solid #E7E7E7;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  overflow-x: hidden;

  .subnav {
    display: none;
  }

  .subnav-box {
    display: block;
  }
`;
