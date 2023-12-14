import React from 'react';
import { useField, FieldAttributes } from 'formik';
import { FormLabel } from '../../_atom/FormLabel';
import { FormInput } from '../../_atom/FormInput';
import { ErrorMessage } from '../../_atom/ErrorMessage';

interface FormFieldProps {
  name: string;
  fieldName: string;
  placeholder?: string;
  required?: boolean;
  removeBorder?: boolean;
}

const FormField: React.FC<FormFieldProps & FieldAttributes<any>> = ({
  name,
  fieldName,
  placeholder,
  required,
  ...props
}) => {
  const [field, meta] = useField(name);

  const errorMessage = meta.error;
  const isTouched = meta.touched;

  return (
    <div>
      <FormLabel title={fieldName} errorMessage={isTouched && errorMessage} required={required} />
      <div>
        {props.removeBorder ? (
          <div>{field.value}</div>
        ) : (
          <FormInput placeholder={placeholder} {...field} {...props} errorMessage={isTouched && errorMessage} />
        )}
      </div>
      {isTouched && errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default FormField;
