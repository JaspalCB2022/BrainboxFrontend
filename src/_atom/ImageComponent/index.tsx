import React from 'react';
import { Img } from "./styled";

interface ImageComponentProps {
  src: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src }) => {
  return (
    <Img
      loading="lazy"
      src={src}
    />
  );
};

export default ImageComponent;
