import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageWrapper } from './styled';

const PublicLayout: React.FC = () => (
    <Suspense fallback={'Loading'}>
        <PageWrapper>
            <Outlet />
        </PageWrapper>
    </Suspense>
);

export default PublicLayout;
