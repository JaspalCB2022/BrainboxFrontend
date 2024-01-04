export interface MultiSelectDropdownProps {
    options: { label: string; value: string }[];
    onChange: (selectedValues: string[], allOptions: { label: string; value: string }[]) => void;
    value: boolean |  string | null ;
    name: string;
    placeholder?: string;
}