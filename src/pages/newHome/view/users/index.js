/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import localized from '../../../_common/localized';
import { IconDots, IconAvatar } from '../icons';
import UsersLikesModal from './usersLikesModal';
import { spottUsersSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(spottUsersSelector, (dispatch) => ({}))
@CSSModules(styles, { allowMultiple: true })
export default class Users extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserProfile: PropTypes.any,
    isAuthenticated: PropTypes.string,
    isSpottLoved: PropTypes.bool,
    items: PropTypes.any.isRequired,
    large: PropTypes.bool,
    location: PropTypes.object.isRequired,
    maxNum: PropTypes.number.isRequired,
    spottId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.showUsersModal = ::this.showUsersModal;
    this.closeUsersModal = ::this.closeUsersModal;
    this.state = {
      isUsersModalOpen: false,
      animateUserLoved: this.props.isSpottLoved
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isSpottLoved !== this.props.isSpottLoved && nextProps.isAuthenticated) {
      this.setState({
        animateUserLoved: nextProps.isSpottLoved
      });
    }
  }

  showUsersModal () {
    this.setState({
      isUsersModalOpen: true
    });
  }

  closeUsersModal () {
    this.setState({
      isUsersModalOpen: false
    });
  }

  render () {
    const { large, maxNum, items, currentLocale, spottId, currentUserProfile, isSpottLoved } = this.props;
    const { isUsersModalOpen } = this.state;
    const maxNumRecalc = isSpottLoved ? maxNum - 1 : maxNum;

    return (
      <div styleName={large ? 'users-large' : 'users'}>
        <div styleName='users-wrapper'>
          <ReactCSSTransitionGroup
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName={{
              enter: styles['user-enter'],
              enterActive: styles['user-enter-active'],
              leave: styles['user-leave'],
              leaveActive: styles['user-leave-active']
            }}>
            {isSpottLoved &&
              <Link
                key={`user_${currentUserProfile.get('id')}`}
                style={{
                  zIndex: 101,
                  backgroundImage: currentUserProfile.getIn([ 'avatar', 'url' ]) ? `url(${currentUserProfile.getIn([ 'avatar', 'url' ])}?width=26&height=26)` : null
                }}
                styleName='user'
                title={`${currentUserProfile.get('firstName')} ${currentUserProfile.get('lastName')}`}
                to={`/${currentLocale}/profile/${currentUserProfile.get('id')}`}>
                {!currentUserProfile.getIn([ 'avatar', 'url' ]) && <IconAvatar/>}
            </Link>}
            {items.filter((item) => item.get('uuid') !== currentUserProfile.get('id')).slice(0, maxNumRecalc).map((item, index) =>
              <Link
                key={`user_${item.get('uuid')}`}
                style={{
                  zIndex: 100 - index,
                  backgroundImage: item.getIn([ 'avatar', 'url' ]) ? `url(${item.getIn([ 'avatar', 'url' ])}?width=26&height=26)` : null
                }}
                styleName='user'
                title={`${item.get('firstName')} ${item.get('lastName')}`}
                to={`/${currentLocale}/profile/${item.get('uuid')}`}>
                {!item.getIn([ 'avatar', 'url' ]) && <IconAvatar/>}
              </Link>
            )}
          </ReactCSSTransitionGroup>
        </div>
        {items.size > maxNum &&
          <button styleName='users-moar' onClick={this.showUsersModal}>
            <i><IconDots/></i>
          </button>}
        {isUsersModalOpen &&
          <UsersLikesModal
            location={location}
            spottId={spottId}
            usersList={items}
            onClose={this.closeUsersModal}/>}
      </div>
    );
  }
}
