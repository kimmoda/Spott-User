import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { IconSearch, IconArrow3 } from '../../icons';
const styles = require('../index.scss');

@CSSModules(styles, { allowMultiple: true })
class AutocompleteListItem extends Component {

  static propTypes = {
    suggestion: PropTypes.object.isRequired
  };

  render () {
    const { suggestion } = this.props;

    return (
      <div styleName='search-suggestion'>
        <div styleName='search-suggestion-sicon'>
          <i><IconSearch/></i>
        </div>
        <div styleName='search-suggestion-title'>
          { suggestion.text }
        </div>
        <div styleName='search-suggestion-aicon'>
          <i><IconArrow3/></i>
        </div>
      </div>
    );
  }
}

export default AutocompleteListItem;
