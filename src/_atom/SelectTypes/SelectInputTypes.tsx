import React, { useState, ChangeEvent } from 'react';
import Select from "react-select";
import { Dropdown } from "primereact/dropdown";
import './index.css';
import { NormalSelectProps, Option ,FormSelectProps } from './types';



const NoramlSelect: React.FC<NormalSelectProps> = ({
  options,
  onChange,
  value,
  placeholder = "Search using Name",
}) => {
  const inputBox = (value: string) => ({
    fontSize: "12px",
    fontWeight: "400",
    marginTop: '-6px',
    width: "max-content",
  });

  const customStyles = {
    input: (styles: React.CSSProperties, { data }: { data: Option }) => ({
      ...styles,
      ...inputBox(data.label),
    }),
    singleValue: (styles: React.CSSProperties, { data }: { data: Option }) => ({
      ...styles,
      ...inputBox(data.label),
    }),
    option: (styles: React.CSSProperties, { data, isDisabled, isFocused, isSelected }: { data: Option; isDisabled: boolean; isFocused: boolean; isSelected: boolean }) => ({
      ...styles,
      backgroundColor: "#FFFFFF",
      cursor: 'pointer',
      color: isSelected ? "#AFB5B7" : "black",
      textAlign: 'left',
      width: "max-content",
      minWidth: "100%",
    }),
    control: (styles: React.CSSProperties) => ({
      ...styles,
      boxShadow: "none",
      border: " 1px solid #F3F3F3",
      background: "white",
      zIndex: 100,
      cursor: 'pointer',
      height: 28,
      minHeight: 28,
    }),
    menuList: (styles: React.CSSProperties) => ({
      ...styles,
      marginTop: "-12px",
      padding: "0px",
      paddingLeft: "4px",
      paddingRight: "4px",
      fontSize: "12px",
      border: "1px solid #AAAAAA",
      borderTop: "none",
      width: "max-content",
      minWidth: "100%",
      backgroundColor: "white",
      borderRadius: "4px",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (styles: React.CSSProperties) => ({
      ...styles,
      marginTop: '-6px'
    }),
  };

  return (
    <Select
      options={options}
      // styles={customStyles}
      value={value}
      defaultValue={options[0]}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};



const FormSelect: React.FC<FormSelectProps> = ({
  options,
  value,
  placeholder = "Search",
  onChange,
}) => {
  // @ts-ignore
  const [selectedOptions, setselectedOptions] = useState<Option>(value);

  const customStyles = {
    singleValue: (styles: React.CSSProperties, { data }: { data: Option }) => ({
      ...styles,
      width: "max-content",
    }),
    option: (styles: React.CSSProperties, { data, isDisabled, isFocused, isSelected }: { data: Option; isDisabled: boolean; isFocused: boolean; isSelected: boolean }) => ({
      ...styles,
      color: isSelected ? "#AFB5B7" : "black",
      backgroundColor: "#FFFFFF",
      cursor: "pointer",
      width: "max-content",
      minWidth: "100%",
    }),
    menuList: (styles: React.CSSProperties) => ({
      ...styles,
      marginTop: "-7px",
      padding: "0px",
      border: "1px solid #DADADA",
      textAlign: "left",
      cursor: "pointer",
      width: "max-content",
      minWidth: "100%",
    }),
    control: (styles: React.CSSProperties) => ({
      ...styles,
      boxShadow: "none",
      cursor: "pointer",
      whiteSpace: "nowrap",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const handleChange = (e: any) => {
    setselectedOptions(e.value as Option);
    onChange(e.value, options);
  };

  return (
    <Dropdown
      className="edit-general-box-select"
      options={options}
      filter
      // styles={customStyles}
      placeholder={placeholder}
      onChange={handleChange}
      value={selectedOptions}
    />
  );
};

export { NoramlSelect, FormSelect };
