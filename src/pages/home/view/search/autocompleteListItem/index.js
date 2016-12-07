import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, fontWeights, makeTextStyle, RadiumLink } from '../../../../_common/buildingBlocks';

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
      backgroundColor: colors.white,
      paddingLeft: '30px',
      paddingRight: '30px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      ':hover': {
        backgroundColor: colors.whiteGray
      }
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
      <RadiumLink style={styles.suggestion} title={suggestion.title} to={suggestion.shareUrl}>
        <div style={[
          styles.suggestionImage,
          suggestion.smallImage ? styles.suggestionImageCharacter : styles.suggestionImageMovie,
          { backgroundImage: `url("${suggestion.imageUrl}?height=60&width=40")` } ]}/>
        <div style={styles.suggestionContent}>
          { suggestion.title }
        </div>
      </RadiumLink>
    );
  }
}

export default AutocompleteListItem;
