import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout: React.FC = () => (
    <Suspense fallback={'Loading'}>
        <Outlet />
    </Suspense>
);

export default BlankLayout;
