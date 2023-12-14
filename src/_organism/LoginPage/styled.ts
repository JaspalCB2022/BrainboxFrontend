import styled from "styled-components";
import Page from '../../../src/ImagesIcons/page.png';

interface PageWrapperProps {
  $margin?: string;
}

export const LoginPageDiv = styled.div<PageWrapperProps>`
  position: relative;
  margin-bottom: 20px;
  width: 897px;
  max-width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`;

export const LoginWrapper = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

export const LoginColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 74%;
  margin-left: 0px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const LoginBody = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const LoginTitle = styled.div`
  display: flex;
  width: 185px;
  max-width: 100%;
  gap: 14px;
  margin-top: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

export const AppImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 38px;
  fill: ${(props) => props.theme.colors.primary};
  overflow: hidden;
  max-width: 100%;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.colors.primary};
  align-self: center;
  white-space: nowrap;
  margin: auto 0;
  font: 600 ${(props) => props.theme.fontSizes.extraLarge} Plus Jakarta Sans, sans-serif;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    white-space: initial;
  }
`;

export const FormWrapper = styled.div`
  align-self: stretch;
  margin-top: 32px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const FormInner = styled.div`
  gap: 0px;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

export const BubbleWrapper = styled.div`
  position: relative;
  line-height: normal;
  width: 32%;
  margin-left: 0px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const BubbleImage = styled.img`
  aspect-ratio: 1.3;
  object-fit: contain;
  object-position: center;
  width: 90%;
  overflow: hidden;
  margin-top: 80vh;
  margin-left: 120px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 40px;
  }
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  margin-left: 20px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 50%;
  }
`;

export const FormBodyInner = styled.div`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.colors.formBorder};
  backdrop-filter: blur(20px);
  background-color: ${(props) => props.theme.colors.formBackground};
  display: flex;
  flex-direction: column;
  width: 480px;
  margin: 0 auto;
  padding: 26px 47px 32px 48px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

export const FormTitle = styled.div`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  align-self: center;
  white-space: nowrap;
  margin-bottom: 20px;
  font: 600 ${(props) => props.theme.fontSizes.large} Plus Jakarta Sans, sans-serif;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    white-space: initial;
  }
`;

export const BubbleWrapperSecond = styled.div`
  line-height: normal;
  width: 26%;
`;

export const BubbleImageSecond = styled.img`
  aspect-ratio: 1.14;
  object-fit: contain;
  object-position: center;
  width: 100%;
  overflow: hidden;
  margin-left: -60px;
`;
