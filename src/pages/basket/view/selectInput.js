import React from 'react';
import Select from 'react-select';
import Radium from 'radium';
import '../../register/view/react-select.css';

const WrappedSelect = Radium(Select);

const selectInputStyles = {
  error: {
    border: '0.056em #ff0000 solid'
  },
  base: {
    fontSize: '1.125em',
    width: '100%',
    borderRadius: 2,
    border: '0.056em #d7d7d7 solid',
    boxShadow: 'transparent 0 0 0',
    height: '40px',
    marginBottom: '18px'
  }
};

export const renderSelectField = Radium((props) => {
  return (
    <WrappedSelect
      autoFocus={props.autoFocus}
      cache={false} clearable={false} filterOption={() => true} isLoading={false} multi={false}
      options={props.options}
      placeholder={props.placeholder}
      style={[ selectInputStyles.base, props.submitFailed && props.meta.touched && props.meta.error && selectInputStyles.error ]}
      type={props.type}
      {...props.input}
      required
      onBlur={() => props.input.onBlur(props.input.value)}
      onChange={(internalValue) => props.input.onChange(internalValue.value)} />
  );
});
