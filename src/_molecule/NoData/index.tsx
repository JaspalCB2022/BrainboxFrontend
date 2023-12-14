import React from 'react';
import './index.css';

interface NoDataProps {
    colSpan: number;
    text: string;
}

const NoData: React.FC<NoDataProps> = ({ colSpan, text }) => {
    return (
        // @ts-ignore
        <div colSpan={colSpan} className="nodata-td">
            <div className='nodata-wrapper'>
                <h2 style={{ color: '#878A99' }}>{text}</h2>
            </div>
        </div>
    );
};

export default NoData;
