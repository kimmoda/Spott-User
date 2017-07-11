/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { searchResultsSelector } from '../../../selectors';
import * as actions from '../../../actions';
import UserListItem from '../../../usersListItem';
import { LOADED } from '../../../../data/statusTypes';
import { IconAvatar } from '../../../icons';
import { slugify } from '../../../../utils';

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
    const { persons, currentUserId, location, t, currentLocale } = this.props;
    return (
      <div styleName='peoples'>
        {Boolean(persons.get('size')) &&
          <div styleName='peoples-content'>
            {persons.get('actors').map((item, index) =>
              <Link
                key={`search_actor_${index}_${item.get('uuid')}`}
                styleName='people'
                to={`/${currentLocale}/topic/${slugify(item.get('name'))}/PERSON%7C${item.get('uuid')}`}>
                <div
                  style={{ backgroundImage: item.getIn([ 'avatar', 'url' ]) ? `url(${item.getIn([ 'avatar', 'url' ])}?height=32&width=32)` : null }}
                  styleName='people-avatar'>
                  {!item.getIn([ 'avatar', 'url' ]) && <IconAvatar/>}
                </div>
                <div styleName='people-name'>
                  {item.get('name')}
                </div>
              </Link>
            )}
            {persons.get('characters').map((item, index) =>
              <Link
                key={`search_character_${index}_${item.get('uuid')}`}
                styleName='people'
                to={`/${currentLocale}/topic/${slugify(item.get('name'))}/CHARACTER%7C${item.get('uuid')}`}>
                <div
                  style={{ backgroundImage: item.getIn([ 'avatar', 'url' ]) ? `url(${item.getIn([ 'avatar', 'url' ])}?height=32&width=32)` : null }}
                  styleName='people-avatar'>
                  {!item.getIn([ 'avatar', 'url' ]) && <IconAvatar/>}
                </div>
                <div styleName='people-name'>
                  {item.get('name')}
                </div>
              </Link>
            )}
            {persons.get('users').map((item, index) =>
              <UserListItem
                currentUserId={currentUserId}
                item={item}
                key={`search_user_${index}_${item.get('uuid')}`}
                location={location}/>
            )}
          </div>}
        {Boolean(!persons.get('size') && persons.get('_status') === LOADED) &&
          <div styleName='no-results'>{t('search.people.noResults')}</div>}
      </div>
    );
  }
}
