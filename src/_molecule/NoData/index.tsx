import React from 'react';
import './index.css';
import { NoDataProps } from './types';



const NoData: React.FC<NoDataProps> = ({ colSpan, text }) => {
    return (

        <div 
        // colSpan={colSpan} 
        className="nodata-td">
            <div className='nodata-wrapper'>
                <h2 style={{ color: '#878A99' }}>{text}</h2>
            </div>
        </div>
    );
};

export default NoData;
