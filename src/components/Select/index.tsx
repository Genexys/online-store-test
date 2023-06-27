import React from 'react';
import Select from 'react-select';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  selectedOption: string;
  handleSelect: (selectedOption: string) => void;
};

const CustomSelect: React.FC<Props> = ({ options, selectedOption, handleSelect }) => {
  const handleChange = (option: { value: string; label: string } | null) => {
    if (option) {
      handleSelect(option.value);
    }
  };

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === selectedOption)}
      onChange={handleChange}
    />
  );
};

export default CustomSelect;
