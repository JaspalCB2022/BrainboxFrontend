import { CSSProperties, ReactNode } from "react";

export interface FlyoutProps {
    onHide: () => void;
    title: ReactNode;
    style?: CSSProperties;
    children?: ReactNode;
  }