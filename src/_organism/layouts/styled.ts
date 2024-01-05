import styled from "styled-components";
import Page from '../../../src/ImagesIcons/page.png';

interface PageWrapperProps {
    $margin?: string;
}

export const PageWrapper = styled.div<PageWrapperProps>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    display: flex;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-image: url(${Page});
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 100% 100%;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 100px 0;
    }
`;

interface MainSectionWrapperProps {
    $margin?: string;
}

export const MainSectionWrapper = styled.div<MainSectionWrapperProps>`
    display: flex;
    flex-direction: column;
    padding-left: ${({ $margin }) => $margin};
    width: 100%;
    transition: 0.5s;
    
    // .main-page-with-nav{
    //     padding-left: 250px;
    // }
    // .main-page{
    //     padding-left: 250px;

    // }
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
