export interface Option {
    value: string;
    label: string;
  }
  
  
export  interface NormalSelectProps {
    options: Option[];
    onChange: (selectedOption: Option | null) => void;
    value: Option | null;
    placeholder?: string;
  }

  export interface FormSelectProps {
    options: Option[];
    value: Option |string |boolean |null;
    placeholder?: string;
    onChange: (selectedValues: string[], allOptions: { label: string; value: string }[]) => void;
    errorMessage ?: String | boolean |undefined
  }