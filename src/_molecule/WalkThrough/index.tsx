import React from 'react';
import Circle from '../../_atom/Circle';
import Line from '../../_atom/Line';
import { WalkContainer } from './styled';
import './index.css';

interface WalkThroughProps {
    currentIndex: number;
    numbers: number;
    content: React.ReactNode; // Adjust the type of content accordingly
}

const WalkThrough: React.FC<WalkThroughProps> = ({
    currentIndex,
    numbers,
    content,
}) => {
    return (
        <WalkContainer>
            {/* {[...Array(numbers).keys()]?.map((n, id) => {
                if (id + 1 < currentIndex) {
                    return (
                        <React.Fragment key={id}>
                            <Circle text={id + 1} />
                            <Line />
                        </React.Fragment>
                    );
                } else if (id + 1 === currentIndex) {
                    return (
                        <React.Fragment key={id}>
                            <Circle active={true} text={id + 1} content={content} />
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment key={id}>
                            <Line color="#000" />
                            <Circle text={id + 1} color="#000" />
                        </React.Fragment>
                    );
                }
            })} */}
        </WalkContainer>
    );
};

export default WalkThrough;
