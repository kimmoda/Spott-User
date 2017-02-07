import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, fontWeights, makeTextStyle, mediaQueries } from '../../../../_common/buildingBlocks';
import scroll from 'scroll';

const icon = require('./icon.svg');

/* eslint-disable react/no-set-state */

@Radium
class AutocompleteInput extends Component {

  static propTypes = {
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.onBlur = ::this.onBlur;
    this.onFocus = ::this.onFocus;

    this.state = {
      isInputFocused: false
    };
  }

  onBlur () {
    this.props.onBlur();
    this.setState({ isInputFocused: false });
  }

  onFocus () {
    this.props.onFocus();
    scroll.top(document.body, (this.textInput.offsetParent.offsetTop - 20), { duration: 500 });
    this.setState({ isInputFocused: true });
  }

  static styles = {
    searchField: {
      borderRadius: '4px',
      display: 'block',
      width: '100%',
      height: '55px',
      paddingRight: '0.861em',
      backgroundImage: `url(${icon})`,
      backgroundRepeat: 'no-repeat',
      border: 'solid 1px #f9f9f9',
      color: colors.dark,
      transition: 'all 0.5s ease',
      boxShadow: '0 0.625em 0.75em 0 rgba(0, 0, 0, 0.3)',
      boxSizing: 'border-box',
      backgroundPosition: '83px',
      paddingLeft: '112px',
      ...makeTextStyle(fontWeights.normal, '18px'),
      [mediaQueries.mobile]: {
        backgroundPosition: '10px',
        paddingLeft: '35px',
        ':focus': {
          backgroundPosition: '10px',
          paddingLeft: '35px'
        }
      },
      focused: {
        backgroundPosition: '30px',
        paddingLeft: '64px',
        boxShadow: '0 0.325em 0.55em 0 rgba(0, 0, 0, 0.3)',
        [mediaQueries.mobile]: {
          backgroundPosition: '10px',
          paddingLeft: '35px'
        }
      }
    }
  };

  render () {
    const { styles } = this.constructor;

    return (
      <input
        {...this.props}
        ref={(input) => { this.textInput = input; }}
        style={this.state.isInputFocused
          ? [ styles.searchField, styles.searchField.focused ]
          : [ styles.searchField, this.textInput && this.textInput.value.length ? styles.searchField.focused : null ]}
        onBlur={this.onBlur}
        onFocus={this.onFocus}/>
    );
  }
}

export default AutocompleteInput;
