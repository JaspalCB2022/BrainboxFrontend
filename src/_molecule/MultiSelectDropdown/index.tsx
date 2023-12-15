import React, { useEffect, useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import './index.css';

interface MultiSelectDropdownProps {
    options: { label: string; value: string }[];
    onChange: (selectedValues: string[], allOptions: { label: string; value: string }[]) => void;
    value: boolean |  string | null;
    name: string;
    placeholder?: string;
}

export default function MultiSelectDropdown({
    options,
    onChange,
    value,
    name,
    placeholder
}: MultiSelectDropdownProps): JSX.Element {
    const [selectedOptions, setselectedOptions] = useState<string[] | null>(null);

    useEffect(() => {
        if (typeof value === 'boolean') {
            // Convert boolean to string or handle as needed
            setselectedOptions(value ? ['true'] : ['false']);
        } else if (value === "All") {
            let temp = options.map((op) => op.value);
            setselectedOptions(temp);
        } else {
            if (value) {
                setselectedOptions(value.split(','));
            }
        }
    }, [value, options]);

    let handleChange = (e: { value: string[] }) => {
        setselectedOptions(e.value);
        onChange(e.value, options);
    };

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                value={selectedOptions}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
                options={options}
                optionLabel="label"
                maxSelectedLabels={3}
                filter
            />
        </div>
    );
}
