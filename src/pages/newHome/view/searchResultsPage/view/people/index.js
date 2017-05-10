/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import localized from '../../../../../_common/localized';
import { searchResultsSelector } from '../../../../selectors';

const styles = require('../index.scss');

@localized
@connect(searchResultsSelector, (dispatch) => ({}))
@CSSModules(styles, { allowMultiple: true })
export default class SearchResultsPeople extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    persons: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { currentLocale, persons } = this.props;
    return (
      <div styleName='peoples'>
        <div styleName='peoples-content'>
          {Boolean(persons.get('data') && persons.get('data').size) && persons.get('data').map((item, index) =>
            <Link key={`search_user_${index}_${item.get('uuid')}`} styleName='people' to={`/${currentLocale}/profile/${item.get('uuid')}`}>
              {`${item.getIn([ 'profile', 'firstName' ])} ${item.getIn([ 'profile', 'lastName' ])}`}
            </Link>
          )}
        </div>
      </div>
    );
  }
}
