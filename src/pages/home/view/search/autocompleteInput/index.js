import React, { Component } from 'react';
import Radium from 'radium';
import { colors, fontWeights, makeTextStyle, mediaQueries } from '../../../../_common/buildingBlocks';

const icon = require('./icon.svg');

@Radium
class AutocompleteInput extends Component {

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
      ':focus': {
        backgroundPosition: '30px',
        paddingLeft: '64px',
        boxShadow: '0 0.325em 0.55em 0 rgba(0, 0, 0, 0.3)'
      }
    }
  };

  render () {
    const { styles } = this.constructor;

    return (
      <input {...this.props} style={styles.searchField} />
    );
  }
}

export default AutocompleteInput;
