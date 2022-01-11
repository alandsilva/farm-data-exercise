import { useState } from 'react';
const useField = (type) => {
  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
    setHelperText('');
  };

  return {
    type,
    value,
    onChange,
    helperText,
    setHelperText,
    error: helperText !== '',
  };
};

export default useField;
