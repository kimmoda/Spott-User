import React, { Component, PropTypes } from 'react';
import Radium, { Style } from 'radium';
import { colors, fontWeights, makeTextStyle } from '../../../../_common/buildingBlocks';

@Radium
class AutocompleteListItem extends Component {

  static propTypes = {
    suggestion: PropTypes.object.isRequired
  };

  static styles = {
    suggestion: {
      cursor: 'pointer',
      height: '75px',
      borderTop: '1px solid',
      borderTopColor: colors.whiteThree,
      paddingLeft: '30px',
      paddingRight: '30px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    },
    suggestionImage: {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '2px',
      boxSizing: 'border-box',
      backgroundColor: colors.whiteThree
    },
    suggestionImageMovie: {
      width: '40px',
      height: '58px'
    },
    suggestionImageCharacter: {
      width: '40px',
      height: '40px'
    },
    suggestionContent: {
      marginLeft: '16px',
      ...makeTextStyle(fontWeights.medium, '13px', '0.4px'),
      color: colors.dark
    }
  };

  render () {
    const { suggestion } = this.props;
    const { styles } = this.constructor;

    return (
      <div style={styles.suggestion}>
        <Style
          rules={{
            div: {
              backgroundColor: colors.white
            }
          }}
          scopeSelector='.react-autosuggest__suggestion'/>
        <Style
          rules={{
            div: {
              backgroundColor: colors.whiteGray
            }
          }}
          scopeSelector='.react-autosuggest__suggestion--focused'/>
        <div style={[
          styles.suggestionImage,
          suggestion.smallImage ? styles.suggestionImageCharacter : styles.suggestionImageMovie,
          { backgroundImage: `url("${suggestion.imageUrl}?height=60&width=40")` } ]}/>
        <div style={styles.suggestionContent}>
          { suggestion.title }
        </div>
      </div>
    );
  }
}

export default AutocompleteListItem;
