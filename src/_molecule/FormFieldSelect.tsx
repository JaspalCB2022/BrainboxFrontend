import React, { useState } from 'react';
import { useField } from 'formik';
import { ErrorMessage } from '../_atom/ErrorMessage';
import FormField from './FormField';
import { FormSelect } from '../_atom/SelectTypes/SelectInputTypes';
import MultiSelectDropdown from './MultiSelectDropdown';
import { RadioButton } from 'primereact/radiobutton';
import { FormLabel } from '../_atom/FormLabel';

  
interface FormFieldSelectProps {
    name: string;
    fieldName: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    onChange: (selectedValues: string[], allOptions: { label: string; value: string }[]) => void; 
    value: string  ;
    required: boolean;
    isMulti: boolean;
    isRadio: boolean;
    // Add any other props if needed
}

const FormFieldSelect: React.FC<FormFieldSelectProps> = ({
    name,
    fieldName,
    placeholder,
    options,
    onChange,
    value,
    required,
    isMulti,
    isRadio,
    ...props
}) => {
    const [field, meta] = useField(name);
     // @ts-ignore
    const [radio, setRadio] = useState(value === true ? 1 : value === false ? 0 : '');

    const errorMessage = meta.error;
    const isTouched = meta.touched;

    const handleChange = (e:any) => {
        setRadio(e.target.value);  
        onChange(isRadio ? e.target.value : [e.target.value], options);
    };
    

    return (
        <div>
            <FormLabel title={fieldName} errorMessage={isTouched && errorMessage} required={required} />
            <div style={{ marginBottom: '11px' }}></div>
            <div className='form-input-wrapper'>
                {isMulti ? (
                    <MultiSelectDropdown options={options} onChange={onChange} value={value} name={name} />
                ) : isRadio ? (
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '10px' }}>
                            <RadioButton inputId="ingredient1" name='yes' value={1} onChange={handleChange} checked={radio === 1} />
                            <label htmlFor="ingredient1" style={{ marginLeft: '10px' }}>
                                YES
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton inputId="ingredient1" name='no' value={0} onChange={handleChange} checked={radio === 0} />
                            <label htmlFor="ingredient1" style={{ marginLeft: '10px' }}>
                                NO
                            </label>
                        </div>
                    </div>
                ) : (
                    <FormSelect
                        placeholder={placeholder}
                        {...field}
                        {...props}
                        options={options}
                        onChange={onChange}
                        value={value}
                        errorMessage={isTouched && errorMessage}
                    />
                )}
            </div>
            {isTouched && errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    );
};

export default FormFieldSelect;


