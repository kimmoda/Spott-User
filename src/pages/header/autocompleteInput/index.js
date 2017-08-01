/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { IconSearch, IconClose } from '../../icons';

const styles = require('../index.scss');

@CSSModules(styles, { allowMultiple: true })
class AutocompleteInput extends Component {
  static propTypes = {
    placeholder: PropTypes.any,
    value: PropTypes.any,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onSearchClose: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.onBlur = ::this.onBlur;
    this.onFocus = ::this.onFocus;
    this.onClose = ::this.onClose;
  }

  onBlur () {
    this.props.onBlur();
  }

  onFocus () {
    this.props.onFocus();
    this.textInput.focus();
  }

  onClose () {
    this.textInput.blur();
    this.props.onSearchClose();
  }

  render () {
    const { placeholder, value, onChange, onKeyDown } = this.props;
    return (
      <div styleName='search-input-wrapper' tabIndex='0' onBlur={this.onBlur} onFocus={this.onFocus}>
        <i><IconSearch/></i>
        <input
          placeholder={placeholder}
          ref={(input) => { this.textInput = input; }}
          styleName='search-input'
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}/>
        <div styleName='search-input-close' onClick={this.onClose}>
          <i><IconClose/></i>
        </div>
      </div>
    );
  }
}

export default AutocompleteInput;
