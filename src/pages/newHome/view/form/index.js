/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
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
