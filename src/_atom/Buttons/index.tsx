import { Button } from "./styled";
import { FilledButtonProps } from "./types";



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
