/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import localized from '../../../../../_common/localized';
import { userProfileDetailsSelector } from '../../../../selectors';
import { IconClose } from '../../../icons';
import UserListItem from '../../../usersListItem';

const styles = require('./index.scss');

@localized
@connect(userProfileDetailsSelector, (dispatch) => ({}))
@CSSModules(styles, { allowMultiple: true })
export default class UsersModal extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    followingListMode: PropTypes.bool,
    loadUsers: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userProfile: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.props.loadUsers({ uuid: this.props.userId });
  }

  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
  }

  render () {
    const { userProfile, currentUserId, userId, followingListMode, t } = this.props;
    const usersList = followingListMode ? userProfile.getIn([ 'following', 'data' ], []) : userProfile.getIn([ 'followers', 'data' ], []);

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.props.onClose}>
        <div styleName='modal-close' onClick={this.props.onClose}><i><IconClose/></i></div>
        <div styleName='content'>
          <div styleName='title'>{followingListMode ? t('common.following') : t('common.followers')}</div>
          <div styleName='followers'>
            {usersList.map((item, index) =>
              <UserListItem
                currentUserId={currentUserId}
                item={item}
                key={`search_user_${index}_${item.get('uuid')}`}
                location={location}
                updateUserProfileOnAction={Boolean(currentUserId && currentUserId === userId)}/>
            )}
          </div>
        </div>
      </ReactModal>
    );
  }
}
