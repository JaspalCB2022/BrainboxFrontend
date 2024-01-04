import React from 'react';
import { Img } from "./styled";
import { ImageComponentProps } from './types';



const ImageComponent: React.FC<ImageComponentProps> = ({ src }) => {
  return (
    <Img
      loading="lazy"
      src={src}
    />
  );
};

export default ImageComponent;
