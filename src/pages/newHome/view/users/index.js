/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconDots, IconAvatar } from '../icons';
import UsersLikesModal from './usersLikesModal';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Users extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
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
      isUsersModalOpen: false
    };
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
    const { large, maxNum, items, currentLocale, spottId } = this.props;
    const { isUsersModalOpen } = this.state;

    return (
      <div styleName={large ? 'users-large' : 'users'}>
        <div styleName='users-wrapper'>
          {items.slice(0, maxNum).map((item, index) =>
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
        </div>
        {items.size >= maxNum &&
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
