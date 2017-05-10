/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import localized from '../../../../../_common/localized';
import Cards from '../../../cards';
import { searchResultsSelector } from '../../../../selectors';

const styles = require('../index.scss');

@localized
@connect(searchResultsSelector, (dispatch) => ({}))
@CSSModules(styles, { allowMultiple: true })
export default class SearchResultsPosts extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    posts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { posts } = this.props;

    return (
      <div styleName='cards'>
        <Cards items={posts}/>
      </div>
    );
  }
}
