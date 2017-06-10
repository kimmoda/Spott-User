/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../../../_common/localized';
import { searchResultsSelector } from '../../../../selectors';
import * as actions from '../../../../actions';
import UserListItem from '../../../usersListItem';
import { LOADED } from '../../../../../../data/statusTypes';

const styles = require('../index.scss');

@localized
@connect(searchResultsSelector, (dispatch) => ({
  loadSearchPersons: bindActionCreators(actions.loadSearchPersons, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SearchResultsPeople extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    loadSearchPersons: PropTypes.func.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        q: PropTypes.string
      })
    }),
    persons: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadSearchPersons({ searchString: this.props.location.query.q });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.query.q !== nextProps.location.query.q) {
      this.props.loadSearchPersons({ searchString: nextProps.location.query.q });
    }
  }

  render () {
    const { persons, currentUserId, location, t } = this.props;
    return (
      <div styleName='peoples'>
        {Boolean(persons.get('data') && persons.get('data').size) &&
          <div styleName='peoples-content'>
            {persons.get('data').map((item, index) =>
              <UserListItem
                currentUserId={currentUserId}
                item={item}
                key={`search_user_${index}_${item.get('uuid')}`}
                location={location}/>
            )}
          </div>}
        {Boolean(persons.get('data') && !persons.get('data').size && persons.get('_status') === LOADED) &&
          <div styleName='no-results'>{t('search.people.noResults')}</div>}
      </div>
    );
  }
}
