/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { Link } from 'react-router';
import localized from '../../../../../_common/localized';
import { searchResultsSelector } from '../../../../selectors';
import { IconAvatar } from '../../../icons';
import * as actions from '../../../../actions';

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
    persons: PropTypes.any.isRequired
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
    const { persons, currentUserId, location } = this.props;
    return (
      <div styleName='peoples'>
        <div styleName='peoples-content'>
          {Boolean(persons.get('data') && persons.get('data').size) && persons.get('data').map((item, index) =>
            <SearchResultsUser
              currentUserId={currentUserId}
              item={item}
              key={`search_user_${index}_${item.get('uuid')}`}
              location={location}/>
          )}
        </div>
      </div>
    );
  }
}

@localized
@connect(null, (dispatch) => ({
  removeUserFollowing: bindActionCreators(actions.removeUserFollowing, dispatch),
  setUserFollowing: bindActionCreators(actions.setUserFollowing, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
class SearchResultsUser extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    item: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    removeUserFollowing: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    setUserFollowing: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      following: this.props.item.getIn([ 'profile', 'followingUser' ])
    };
  }

  componentWillReceiveProps (nextProps) {
    this.state = {
      following: nextProps.item.getIn([ 'profile', 'followingUser' ])
    };
  }

  async onFollowClick (following) {
    const currentUserId = this.props.currentUserId;
    if (currentUserId) {
      const userId = this.props.item.get('uuid');
      this.setState({
        following: !this.state.following
      });
      try {
        if (following) {
          await this.props.removeUserFollowing({ uuid: currentUserId, data: { uuid: userId } });
        } else {
          await this.props.setUserFollowing({ uuid: currentUserId, data: { uuid: userId } });
        }
      } catch (error) {
        this.setState({
          following: !this.state.following
        });
        throw error;
      }
    } else {
      this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { modal: true, returnTo: ((this.props.location && `${this.props.location.pathname}${this.props.location.search}`) || '/') } });
    }
  }

  render () {
    const { currentLocale, item } = this.props;
    const { following } = this.state;
    return (
      <div styleName='people'>
        <Link styleName='people-left' to={`/${currentLocale}/profile/${item.get('uuid')}`}>
          <div
            style={{ backgroundImage: item.getIn([ 'profile', 'avatar', 'url' ]) ? `url(${item.getIn([ 'profile', 'avatar', 'url' ])}?height=32&width=32)` : null }}
            styleName='people-avatar'>
            {!item.getIn([ 'profile', 'avatar', 'url' ]) && <IconAvatar/>}
          </div>
          <div styleName='people-name'>
            {`${item.getIn([ 'profile', 'firstName' ])} ${item.getIn([ 'profile', 'lastName' ])}`}
          </div>
        </Link>
        <div
          className={following && styles['people-follow-active']}
          styleName='people-follow'
          onClick={this.onFollowClick.bind(this, following)}>
          {following ? 'Following' : 'Follow'}
        </div>
      </div>
    );
  }
}
