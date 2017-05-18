/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Select from 'react-select';
import localized from '../../../_common/localized';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export class FormInput extends Component {
  static propTypes = {
    autoFocus: PropTypes.any,
    input: PropTypes.any.isRequired,
    meta: PropTypes.any.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    submitFailed: PropTypes.bool.isRequired,
    type: PropTypes.string
  };

  render () {
    const { touched, error } = this.props.meta;
    const { input, autoFocus, placeholder, required, type, submitFailed } = this.props;
    return (
      <div>
        <input
          autoFocus={autoFocus}
          className={submitFailed && touched && error && styles['input-error']}
          placeholder={placeholder}
          required={required}
          styleName='input'
          type={type}
          {...input} />
        {submitFailed && touched && error && error !== 'err' && <div>{error}</div>}
      </div>
    );
  }
}

@localized
@CSSModules(styles, { allowMultiple: true })
export class FormRadio extends Component {
  static propTypes = {
    autoFocus: PropTypes.any,
    input: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.any.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    submitFailed: PropTypes.bool.isRequired,
    value: PropTypes.string
  };

  render () {
    const { touched, error } = this.props.meta;
    const { input, autoFocus, placeholder, required, submitFailed, value, label } = this.props;
    return (
      <div>
        <label>
          <input
            autoFocus={autoFocus}
            className={submitFailed && touched && error && styles['input-error']}
            placeholder={placeholder}
            required={required}
            type='radio'
            value={value}
            {...input} />
          <span>{label}</span>
        </label>
        {submitFailed && touched && error && error !== 'err' && <div>{error}</div>}
      </div>
    );
  }
}

@localized
@CSSModules(styles, { allowMultiple: true })
export class FormSelect extends Component {
  static propTypes = {
    autoFocus: PropTypes.any,
    emptyOption: PropTypes.bool,
    input: PropTypes.any.isRequired,
    meta: PropTypes.any.isRequired,
    multiple: PropTypes.bool,
    options: PropTypes.any.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    submitFailed: PropTypes.bool.isRequired
  };

  render () {
    const { touched, error } = this.props.meta;
    const { input, autoFocus, submitFailed, options, multiple } = this.props;
    return (
      <div>
        <Select
          {...input}
          autoFocus={autoFocus}
          cache={false}
          className={submitFailed && touched && error ? styles['input-error'] : ''}
          clearable={false}
          isLoading={false}
          multi={multiple}
          options={options}
          required
          styleName='select'
          onBlur={() => {
            if (multiple) {
              return input.onBlur([ ...input.value ]);
            }
            return input.onBlur(input.value);
          }}
          onChange={(internalValue) => {
            if (multiple) {
              return input.onChange(internalValue.map((p) => p.value));
            }
            return input.onChange(internalValue.value);
          }}/>
        {submitFailed && touched && error && error !== 'err' && <div>{error}</div>}
      </div>
    );
  }
}

@localized
@CSSModules(styles, { allowMultiple: true })
export class FormCheckbox extends Component {
  static propTypes = {
    autoFocus: PropTypes.any,
    input: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.any.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    submitFailed: PropTypes.bool.isRequired,
    value: PropTypes.string
  };

  render () {
    const { touched, error } = this.props.meta;
    const { input, autoFocus, placeholder, required, submitFailed, label } = this.props;
    return (
      <div>
        <label className={submitFailed && error && styles['checkbox-error']}>
          <input
            autoFocus={autoFocus}
            placeholder={placeholder}
            required={required}
            type='checkbox'
            {...input} />
          <span>{label}</span>
        </label>
        {submitFailed && touched && error && error !== 'err' && <div>{error}</div>}
      </div>
    );
  }
}
