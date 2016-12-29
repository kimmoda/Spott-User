/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, fontWeights, makeTextStyle, Modal, smallDialogStyle, Button, pinkButtonStyle, darkButtonStyle, checkbox } from '../../../_common/buildingBlocks';
import { updateCurrentWishlist, removeCurrentWishlist } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';
import { reduxForm, Field } from 'redux-form/immutable';
import Radium from 'radium';

const itemStyles = {
  settingsBox: {
    width: '430px',
    backgroundColor: colors.whiteGray,
    borderRadius: '4px',
    padding: '29px 30px 20px 30px'
  },
  formTitle: {
    ...makeTextStyle(fontWeights.light, '30px', 0),
    color: colors.dark
  },
  formInput: {
    width: '100%',
    height: '40px',
    borderRadius: '2px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#d7d7d7',
    marginTop: '28px',
    marginBottom: '20px',
    fontSize: '14px',
    paddingLeft: '13px'
  },
  formButtons: {
    display: 'flex',
    marginTop: '49px'
  },
  formDeleteButton: {
    marginRight: 'auto'
  },
  formCancelButton: {
    marginRight: '10px'
  }
};

@reduxForm({
  form: 'editWishlist'
})
@localized
@Radium
class WishlistForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { t, handleSubmit, onSubmit, onDeleteClick, onCancelClick } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 style={itemStyles.formTitle}>{t('profile.wishlists.editWishlist')}</h2>
        <Field
          component='input'
          name='name'
          props={{ required: true }}
          style={itemStyles.formInput}/>
        <div>
          <Field
            component={checkbox}
            name='private'
            text={t('profile.wishlists.privateList')}/>
        </div>
        <div style={itemStyles.formButtons}>
          <div key='delete_btn' style={[ darkButtonStyle, itemStyles.formDeleteButton ]} onClick={onDeleteClick}>{t('profile.wishlists.delete')}</div>
          <div key='cancel_btn' style={[ darkButtonStyle, itemStyles.formCancelButton ]} onClick={onCancelClick}>{t('profile.wishlists.cancel')}</div>
          <Button style={pinkButtonStyle}>{t('profile.wishlists.save')}</Button>
        </div>
      </form>
    );
  }
}

@localized
@connect(null, (dispatch) => ({
  submit: bindActionCreators(updateCurrentWishlist, dispatch),
  remove: bindActionCreators(removeCurrentWishlist, dispatch)
}))
export default class WishlistSettings extends Component {
  static propTypes = {
    remove: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    wishlist: ImmutablePropTypes.mapContains({
      fixed: PropTypes.bool.isRequired,
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }),
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      publicWishlist: PropTypes.bool.isRequired
    }),
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onDeleteClick = ::this.onDeleteClick;
    this.onModalClose = ::this.onModalClose;
    this.onSubmit = ::this.onSubmit;
  }

  onDeleteClick (e) {
    e.preventDefault();
    this.props.remove(this.props.wishlist.get('id'));
    this.onModalClose();
  }

  onModalClose () {
    this.props.onClose();
  }

  async onSubmit (values) {
    const vals = values.toJS();
    if (vals.name) {
      try {
        this.props.submit({
          name: vals.name,
          public: !vals.private,
          uuid: this.props.wishlist.get('id')
        });
        this.onModalClose();
      } catch (e) {
        console.error('Could not submit wishlist settings form.', e);
        throw e;
      }
    }
  }

  render () {
    const { wishlist } = this.props;
    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={this.onModalClose}>
        <div style={itemStyles.settingsBox}>
          <WishlistForm
            initialValues={{ name: wishlist.get('name'), private: !wishlist.get('publicWishlist') }}
            onCancelClick={this.onModalClose}
            onDeleteClick={this.onDeleteClick}
            onSubmit={this.onSubmit}/>
        </div>
      </Modal>
    );
  }
}
