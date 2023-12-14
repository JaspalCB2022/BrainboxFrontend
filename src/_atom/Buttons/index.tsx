import { Button } from "./styled";

interface FilledButtonProps {
    disabled?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    content: React.ReactNode;
    filled?: boolean;
  }

export const FilledButton: React.FC<FilledButtonProps> = ({
    disabled,
    style,
    onClick,
    type,
    content
}) => {
    return (
        <Button
            disabled={disabled}
            style={style}
            onClick={onClick}
            type={type}
        >
            {content}
        </Button>
    );
};
