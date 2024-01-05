import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import { MainSectionWrapper } from './styled';
import TopBar from '../TopBar';

const WithSidebarLayout: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [name, setName] = useState<string>(" ");
    const [visible, setVisible] = useState<boolean>(false);
    // const margin = 

    return (
        <>
            <NavBar visible={visible} setVisible={setVisible} openDrawer={openDrawer} setName={setName} name={name} setOpenDrawer={setOpenDrawer} />
            <MainSectionWrapper $margin={visible ? "250px" :'60px'}>
                <TopBar visible={visible} setVisible={setVisible} setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} name={name} />
                <div 
                className={` ${visible ? 'main-page-with-nav' : 'main-page'}`}
         
                 >
                    <Suspense fallback={'Loading'}>
                        <Outlet />
                    </Suspense>
                </div>
            </MainSectionWrapper>
        </>
    );
};

export default WithSidebarLayout;
