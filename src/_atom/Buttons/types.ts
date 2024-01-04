export interface FilledButtonProps {
    disabled?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    content: React.ReactNode;
    filled?: boolean;
  }