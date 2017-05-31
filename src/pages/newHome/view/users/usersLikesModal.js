/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import localized from '../../../_common/localized';
import { usersLikesModalSelector } from '../../selectors';
import { IconClose } from '../icons';
import UserListItem from '../usersListItem';
import * as actions from '../../actions';

const styles = require('./index.scss');

@localized
@connect(usersLikesModalSelector, (dispatch) => ({
  loadSpottLovers: bindActionCreators(actions.loadSpottLovers, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class UsersLikesModal extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    loadSpottLovers: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    spottId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    usersList: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount () {
    if (this.props.spottId) {
      this.props.loadSpottLovers({ uuid: this.props.spottId });
    }
    document.body.style.overflow = this._originalOverflow;
  }

  render () {
    const { currentUserId, usersList, t } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.props.onClose}>
        <div styleName='modal-close' onClick={this.props.onClose}><i><IconClose/></i></div>
        <div styleName='content'>
          <div styleName='title'>{t('common.people')}</div>
          <div styleName='modal-users-list'>
            {usersList.map((item, index) =>
              <UserListItem
                currentUserId={currentUserId}
                item={item}
                key={`search_user_${index}_${item.get('uuid')}`}
                location={location}/>
            )}
          </div>
        </div>
      </ReactModal>
    );
  }
}
