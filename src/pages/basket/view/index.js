/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, fontWeights, makeTextStyle, Container, Button, pinkButtonStyle, mediaQueries, Modal, smallDialogStyle, textInputStyle, greyButtonStyle } from '../../_common/buildingBlocks';
import { bindActionCreators } from 'redux';
import localized from '../../_common/localized';
import Radium from 'radium';
import RecentlyAddedToWishlist from '../../home/view/recentlyAddedToWishlist';
import * as actions from '../actions';
import * as homeActions from '../../home/actions';
import { basketSelector, basketEditAddressDataSelector } from '../selectors';
import { reduxForm, Field } from 'redux-form/immutable';
import Select from 'react-select';
import '../../register/view/react-select.css';

const iconBasketLarge = require('./iconBasketLarge.svg');

/*
const randomUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
*/

const st = {
  container: {
    display: 'block',
    paddingTop: '40px',
    paddingBottom: '40px'
  },
  title: {
    ...makeTextStyle(fontWeights.light, '23px', '0.5px'),
    margin: '0 0 20px 0'
  },
  filled: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  orders: {
    flexGrow: 1,
    marginRight: '30px',
    [mediaQueries.medium]: {
      marginRight: 0
    },
    [mediaQueries.large]: {
      marginRight: '30px'
    }
  },
  checkoutDetails: {
    minWidth: '370px',
    [mediaQueries.medium]: {
      flexGrow: 1
    },
    [mediaQueries.large]: {
      flexGrow: 0
    },
    legal: {
      ...makeTextStyle(fontWeights.light, '12px', '-0.1px', '15px'),
      color: colors.coolGray,
      marginTop: '24px',
      maxWidth: '370px'
    }
  },
  box: {
    borderRadius: '4px',
    backgroundColor: colors.white,
    border: `1px solid ${colors.borderGrey}`,
    padding: '16px 23px 19px 23px',
    marginBottom: '12px',
    empty: {
      display: 'flex',
      flexFlow: 'column',
      padding: '58px 23px 58px 23px',
      alignItems: 'center',
      justifyContent: 'center',
      fline: {
        ...makeTextStyle(fontWeights.medium, '18px', '0.2px'),
        marginTop: '24px'
      },
      sline: {
        ...makeTextStyle(fontWeights.medium, '14px', '0', '18px')
      },
      btn: {
        marginTop: '24px'
      },
      history: {
        ...makeTextStyle(fontWeights.medium, '14px', '0', '18px'),
        color: colors.coolGray,
        marginTop: '24px'
      }
    },
    title: {
      ...makeTextStyle(fontWeights.medium, '16px', '0.3px'),
      color: colors.coolGray
    },
    items: {
      marginTop: '17px'
    },
    item: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '13px 0 14px 0',
      display: 'flex',
      alignItems: 'center',
      image: {
        width: '60px',
        height: '60px',
        border: `1px solid ${colors.borderGrey}`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      },
      content: {
        marginLeft: '16px',
        flexGrow: 1
      },
      header: {
        display: 'flex',
        alignItems: 'center'
      },
      brand: {
        ...makeTextStyle(fontWeights.regular, '13px'),
        color: colors.coolGray
      },
      remove: {
        marginLeft: 'auto',
        ...makeTextStyle(fontWeights.regular, '18px'),
        color: colors.coolGray,
        cursor: 'pointer',
        transform: 'scaleY(0.7)'
      },
      name: {
        ...makeTextStyle(fontWeights.medium, '15px', '-0.2px', '24px'),
        color: colors.dark
      },
      footer: {
        display: 'flex',
        alignItems: 'center'
      },
      props: {
        ...makeTextStyle(fontWeights.regular, '13px'),
        color: colors.coolGray,
        display: 'flex',
        alignItems: 'center',
        prop: {
          marginRight: '7px'
        },
        b: {
          color: colors.slateGray
        }
      },
      cost: {
        marginLeft: 'auto',
        ...makeTextStyle(fontWeights.regular, '14px'),
        color: colors.slateGray
      }
    },
    delivery: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '18px 0',
      display: 'flex',
      alignItems: 'center',
      ...makeTextStyle(fontWeights.medium, '16px'),
      type: {
        color: colors.dark
      },
      link: {
        color: colors.darkPink,
        marginLeft: '10px',
        cursor: 'pointer',
        textDecoration: 'underline'
      },
      cost: {
        marginLeft: 'auto',
        color: colors.coolGray,
        textTransform: 'uppercase'
      }
    },
    footer: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '18px 0 0 0',
      display: 'flex',
      alignItems: 'center',
      ...makeTextStyle(fontWeights.regular, '16px'),
      color: colors.dark,
      totalCost: {
        marginLeft: 'auto'
      }
    },
    itemCheckout: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '16px 0 24px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...makeTextStyle(fontWeights.regular, '16px'),
      title: {
        color: colors.black
      },
      text: {
        ...makeTextStyle(fontWeights.regular, '14px', 0, '20px'),
        color: colors.coolGray
      },
      add: {
        color: colors.darkPink,
        cursor: 'pointer',
        alignSelf: 'flex-start',
        textDecoration: 'underline'
      },
      cvc: {
        marginTop: '15px',
        width: '138px'
      },
      cvcInput: {
        ...textInputStyle,
        width: '76px',
        marginTop: '7px'
      }
    }
  },
  greenBtn: {
    ...makeTextStyle(fontWeights.medium, '14px', '0.6px'),
    border: '0',
    borderRadius: '2px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'background-color 0.5s ease',
    backgroundColor: colors.coolGreen,
    padding: '0 34px',
    height: '40px',
    color: colors.white,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    ':hover': {
      opacity: 0.8
    },
    ':focus': {
      opacity: 0.9
    },
    disabled: {
      backgroundColor: colors.coolGray,
      pointerEvents: 'none',
      cursor: 'disabled'
    }
  },
  checkoutBtnWrapper: {
    width: '100%',
    borderTop: `1px solid ${colors.borderGrey}`,
    padding: '24px 0 0 0',
    display: 'flex'
  },
  deliveryModal: {
    dot: {
      width: '20px',
      height: '20px',
      border: `2px solid ${colors.borderGrey}`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      active: {
        border: `2px solid ${colors.darkPink}`
      },
      cir: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: colors.darkPink
      }
    },
    left: {
      marginLeft: '18px'
    },
    type: {
      ...makeTextStyle(fontWeights.regular, '16px'),
      color: colors.dark
    },
    time: {
      ...makeTextStyle(fontWeights.regular, '14px', 0, '20px'),
      color: colors.coolGray
    },
    cost: {
      marginLeft: 'auto',
      ...makeTextStyle(fontWeights.regular, '16px'),
      color: colors.coolGray
    }
  },
  modal: {
    width: '430px',
    backgroundColor: colors.whiteGray,
    borderRadius: '4px',
    padding: '29px 0 26px 0',
    marginBottom: '5em',
    title: {
      ...makeTextStyle(fontWeights.light, '30px'),
      color: colors.dark,
      padding: '0 30px'
    },
    items: {
      borderTop: `1px solid ${colors.borderGrey}`,
      backgroundColor: colors.white,
      marginTop: '28px'
    },
    item: {
      borderBottom: `1px solid ${colors.borderGrey}`,
      padding: '16px 24px 12px 24px',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      ...textInputStyle,
      marginBottom: '18px'
    },
    btn: {
      width: '370px',
      marginTop: '27px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      height: '42px'
    },
    form: {
      borderTop: `1px solid ${colors.borderGrey}`,
      borderBottom: `1px solid ${colors.borderGrey}`,
      padding: '24px',
      backgroundColor: colors.white,
      marginTop: '28px'
    },
    label: {
      ...makeTextStyle(fontWeights.medium, '13px'),
      color: colors.slateGray,
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    footer: {
      ...makeTextStyle(fontWeights.medium, '13px', 0, '18px'),
      color: colors.slateGray,
      marginTop: '6px'
    },
    header: {
      ...makeTextStyle(fontWeights.medium, '13px', 0, '18px'),
      color: colors.slateGray,
      marginBottom: '24px'
    },
    error: {
      marginBottom: '10px',
      color: '#ff0000'
    },
    formCols: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    formRow: {
      position: 'relative'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '27px 31px 0 31px',
      btn: {
        width: '45%',
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '0px'
      },
      remove: {
        color: colors.darkPink,
        textDecoration: 'underline',
        cursor: 'pointer',
        minWidth: '120px',
        marginRight: '30px',
        ...makeTextStyle(fontWeights.regular, '14px')
      }
    },
    radioContent: {
      marginLeft: '18px',
      title: {
        ...makeTextStyle(fontWeights.regular, '14px')
      },
      dscr: {
        ...makeTextStyle(fontWeights.regular, '14px', 0, '20px'),
        color: colors.coolGray
      }
    },
    radioEdit: {
      marginLeft: 'auto',
      alignSelf: 'flex-start',
      color: colors.darkPink,
      textDecoration: 'underline',
      fontSize: '14px',
      cursor: 'pointer'
    },
    addNewLink: {
      margin: '0 auto',
      color: colors.darkPink,
      textDecoration: 'underline',
      fontSize: '14px',
      cursor: 'pointer'
    },
    greet: {
      padding: '29px 24px 0 24px',
      title: {
        ...makeTextStyle(fontWeights.medium, '14px', 0, '18px'),
        marginBottom: '30px'
      },
      dscr: {
        ...makeTextStyle(fontWeights.medium, '13px', 0, '18px'),
        color: colors.slateGray,
        head: {
          ...makeTextStyle(fontWeights.medium, '14px', 0, '18px'),
          marginBottom: '14px'
        }
      }
    }
  },
  paymentCard: {
    width: '138px',
    height: '56px',
    borderRadius: '4px',
    border: `1px solid ${colors.borderGrey}`,
    backgroundColor: colors.whiteGray,
    padding: '10px 13px 7px 13px',
    marginTop: '10px',
    name: {
      ...makeTextStyle(fontWeights.regular, '13px'),
      color: colors.slateGray
    },
    number: {
      ...makeTextStyle(fontWeights.regular, '16px', '1px', '16px'),
      color: colors.coolGray,
      marginTop: '1px',
      height: '20px',
      display: 'flex',
      dot: {
        ...makeTextStyle(fontWeights.bold, '16px')
      }
    }
  }
};

// Select input
const WrappedSelect = Radium(Select);
const selectInputStyles = {
  error: {
    border: '0.056em #ff0000 solid'
  },
  base: {
    fontSize: '1.125em',
    width: '100%',
    borderRadius: 2,
    border: '0.056em #d7d7d7 solid',
    boxShadow: 'transparent 0 0 0',
    height: '40px',
    marginBottom: '18px'
  }
};
const renderSelectField = Radium((props) => {
  return (
    <WrappedSelect
      autoFocus={props.autoFocus}
      cache={false} clearable={false} filterOption={() => true} isLoading={false} multi={false}
      options={props.options}
      placeholder={props.placeholder}
      style={[ selectInputStyles.base, props.submitFailed && props.meta.touched && props.meta.error && selectInputStyles.error ]}
      type={props.type}
      {...props.input}
      required
      onBlur={() => props.input.onBlur(props.input.value)}
      onChange={(internalValue) => props.input.onChange(internalValue.value)} />
  );
});

@reduxForm({
  form: 'basketPhoneForm'
})
@localized
@Radium
class ModalPhoneForm extends Component {
  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error } = this.props;

    return (
    <Modal
      isOpen
      style={smallDialogStyle}
      onClose={onClose}>
      <div style={st.modal}>
        <div style={st.modal.title}>Personal Info</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={st.modal.form}>
            <label style={st.modal.label}>E-Mail</label>
            <Field
              component='input'
              name='email'
              props={{ required: true, type: 'email' }}
              style={st.modal.input}/>
            <label style={st.modal.label}>Mobile Number</label>
            <Field
              component='input'
              name='number'
              props={{ required: true }}
              style={st.modal.input}/>
            {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            <div style={st.modal.footer}>
              Mobile number info text .Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.Suspendisse vitae semper
              ex, et gravida odio. In volutpat, mi eget faucibus gravida,
              sapien massa lacinia augue, vitae feugiat nisi
              justo a felis.
            </div>
          </div>
          <Button style={[ pinkButtonStyle, st.modal.btn ]}>Save</Button>
        </form>
      </div>
    </Modal>
    );
  }
}

@reduxForm({
  form: 'basketPinForm'
})
@localized
@Radium
class ModalPinForm extends Component {
  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    number: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, number } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>Enter Pin</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.form}>
              <div style={st.modal.header}>
                Enter the Pin-Code that has been sent to {number}.
              </div>
              <label style={st.modal.label}>Pin-Code</label>
              <Field
                component='input'
                name='code'
                props={{ required: true, type: 'number' }}
                style={st.modal.input}/>
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <Button style={[ pinkButtonStyle, st.modal.btn ]}>Confirm</Button>
          </form>
        </div>
      </Modal>
    );
  }
}

@reduxForm({
  form: 'basketAddressForm'
})
@localized
@Radium
class ModalAddressForm extends Component {
  static propTypes = {
    addressId: PropTypes.string,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.any,
    isEditForm: PropTypes.bool,
    removeAddress: PropTypes.func,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, submitting, submitFailed, isEditForm, removeAddress, initialValues } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>
            {isEditForm ? 'Edit Address' : 'Add New Address'}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.form}>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Country</label>
                <Field
                  component={renderSelectField}
                  disabled={submitting}
                  name='countryId'
                  options={[ { value: 1, label: 'Belgium' } ]}
                  submitFailed={submitFailed} />
              </div>
              <div style={st.modal.formCols}>
                <div style={{ width: '73px' }}>
                  <label style={st.modal.label}>Title</label>
                  <Field
                    component={renderSelectField}
                    disabled={submitting}
                    name='title'
                    options={[ { value: 'Mr.', label: 'Mr.' }, { value: 'Ms.', label: 'Ms.' } ]}
                    submitFailed={submitFailed} />
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>First name</label>
                  <Field
                    component='input'
                    name='firstname'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>Last name</label>
                  <Field
                    component='input'
                    name='lastname'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Company</label>
                <Field
                  component='input'
                  name='company'
                  props={{ required: false, type: 'text' }}
                  style={st.modal.input}/>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Street Address</label>
                <Field
                  component='input'
                  name='line1'
                  props={{ required: true, type: 'text' }}
                  style={st.modal.input}/>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Additional Info</label>
                <Field
                  component='input'
                  name='note'
                  props={{ type: 'text' }}
                  style={st.modal.input}/>
              </div>
              <div style={st.modal.formCols}>
                <div style={{ width: '229px' }}>
                  <label style={st.modal.label}>City</label>
                  <Field
                    component='input'
                    name='city'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>Postal Code</label>
                  <Field
                    component='input'
                    name='postcode'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Mobile number</label>
                <Field
                  component='input'
                  name='phone'
                  props={{ required: true, type: 'text' }}
                  style={st.modal.input}/>
              </div>
              {isEditForm &&
              <Field
                component='input'
                name='id'
                style={st.modal.input}
                type='hidden'/>}
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <div style={st.modal.buttons}>
              {isEditForm &&
              <div style={st.modal.buttons.remove} onClick={removeAddress.bind(this, initialValues.get('id'))}>
                Remove Address
              </div>}
              <button key='cbtn' style={[ greyButtonStyle, st.modal.btn, st.modal.buttons.btn ]} onClick={onClose}>
                Cancel
              </button>
              <Button key='sbtn' style={[ pinkButtonStyle, st.modal.btn, st.modal.buttons.btn ]}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

const ModalAddressEditForm = connect(basketEditAddressDataSelector, null)(ModalAddressForm);

@reduxForm({
  form: 'basketAddressSelectForm'
})
@localized
@Radium
class ModalAddressSelectForm extends Component {
  static propTypes = {
    addNewAddress: PropTypes.func.isRequired,
    addresses: PropTypes.any,
    editAddress: PropTypes.func.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, submitting, addresses, addNewAddress, editAddress } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>Shipping Address</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.items}>
              <div style={st.modal.item}>
                <div style={st.modal.addNewLink} onClick={addNewAddress}>Add New Address</div>
              </div>
              {addresses.map((address) =>
                <div key={address.get('id')} style={st.modal.item}>
                  <label style={st.modal.label}>
                    <Field
                      component='input'
                      disabled={submitting}
                      name='addressId'
                      type='radio'
                      value={address.get('id')}/>
                    <div style={st.modal.radioContent}>
                      <div style={st.modal.radioContent.title}>
                        {address.get('title')} {address.get('firstname')} {address.get('lastname')}
                      </div>
                      <div style={st.modal.radioContent.dscr}>
                        {address.get('line1')}<br/>
                        {address.get('postcode')} {address.get('city')}, {address.get('country')}<br/>
                        {address.get('phoneCountry')}{address.get('phone')}
                      </div>
                    </div>
                    <div style={st.modal.radioEdit} onClick={editAddress.bind(this, address.get('id'))}>Edit</div>
                  </label>
                </div>
              )}
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <div style={st.modal.buttons}>
              <Button style={[ pinkButtonStyle, st.modal.btn ]}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

@reduxForm({
  form: 'basketCardForm'
})
@localized
@Radium
class ModalCardForm extends Component {
  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>Add New Card</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.form}>
              <div style={st.modal.formCols}>
                <div style={{ width: '194px' }}>
                  <label style={st.modal.label}>Credit Card Number</label>
                  <Field
                    component='input'
                    name='number'
                    props={{ required: true, type: 'number' }}
                    style={st.modal.input}/>
                </div>
                <div style={{ width: '91px' }}>
                  <label style={st.modal.label}>Expiration Date</label>
                  <Field
                    component='input'
                    name='expiryDate'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
                <div style={{ width: '77px' }}>
                  <label style={st.modal.label}>CVC</label>
                  <Field
                    component='input'
                    name='cvv'
                    props={{ required: true, type: 'number' }}
                    style={st.modal.input}/>
                </div>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Name on Card</label>
                <Field
                  component='input'
                  name='name'
                  props={{ required: true, type: 'text' }}
                  style={st.modal.input}/>
              </div>
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <Button style={[ pinkButtonStyle, st.modal.btn ]}>Save</Button>
          </form>
        </div>
      </Modal>
    );
  }
}

@reduxForm({
  form: 'basketCardSelectForm'
})
@localized
@Radium
class ModalCardSelectForm extends Component {
  static propTypes = {
    addNewCard: PropTypes.func.isRequired,
    cards: PropTypes.any,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.any,
    removeCard: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, submitting, cards, addNewCard, removeCard, initialValues } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>Select Payment Method</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.items}>
              <div style={st.modal.item}>
                <div style={st.modal.addNewLink} onClick={addNewCard}>Add New Card</div>
              </div>
              {cards.map((card) =>
                <div key={card.get('id')} style={st.modal.item}>
                  <label style={st.modal.label}>
                    <Field
                      component='input'
                      disabled={submitting}
                      name='cardId'
                      type='radio'
                      value={card.get('id')}/>
                    <div style={st.modal.radioContent}>
                      <div style={st.modal.radioContent.title}>
                        <div style={st.paymentCard.name}>VISA</div>
                        <div style={st.paymentCard.number}>
                          <div style={st.paymentCard.number.dots}>··· ··· ···&nbsp;</div>
                          {card.get('maskedNumber').slice(-4)}
                        </div>
                      </div>
                      <div style={st.modal.radioContent.dscr}>
                        {card.get('name')}
                      </div>
                    </div>
                    {initialValues.get('cardId') !== card.get('id') &&
                    <div style={st.modal.radioEdit} onClick={removeCard.bind(this, card.get('id'))}>Remove</div>}
                    </label>
                </div>
              )}
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <div style={st.modal.buttons}>
              <Button style={[ pinkButtonStyle, st.modal.btn ]}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

@reduxForm({
  form: 'basketForm'
})
@localized
@connect(basketSelector, (dispatch) => ({
  addNewAddress: bindActionCreators(actions.addNewAddress, dispatch),
  addNewCard: bindActionCreators(actions.addNewCard, dispatch),
  createUbUser: bindActionCreators(actions.createUbUser, dispatch),
  initUbUser: bindActionCreators(actions.initUbUser, dispatch),
  loadBasketData: bindActionCreators(actions.loadBasketData, dispatch),
  loadEditAddressData: bindActionCreators(actions.loadEditAddressData, dispatch),
  loadUbUser: bindActionCreators(actions.loadUbUser, dispatch),
  loadUserAddresses: bindActionCreators(actions.loadUserAddresses, dispatch),
  loadUserCards: bindActionCreators(actions.loadCards, dispatch),
  loadUserData: bindActionCreators(homeActions.loadUserData, dispatch),
  placeOrder: bindActionCreators(actions.placeOrder, dispatch),
  removeFromBasket: bindActionCreators(actions.removeFromBasket, dispatch),
  removeUserAddress: bindActionCreators(actions.removeUserAddress, dispatch),
  removeUserCard: bindActionCreators(actions.removeUserCard, dispatch),
  selectAddress: bindActionCreators(actions.selectAddress, dispatch),
  selectCard: bindActionCreators(actions.selectCard, dispatch),
  updateUserAddress: bindActionCreators(actions.updateUserAddress, dispatch)
}))
@Radium
export default class Basket extends Component {
  static propTypes = {
    addNewAddress: PropTypes.func.isRequired,
    addNewCard: PropTypes.func.isRequired,
    basketData: PropTypes.any.isRequired,
    createUbUser: PropTypes.func.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initUbUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loadBasketData: PropTypes.func.isRequired,
    loadEditAddressData: PropTypes.func.isRequired,
    loadUbUser: PropTypes.func.isRequired,
    loadUserAddresses: PropTypes.func.isRequired,
    loadUserCards: PropTypes.func.isRequired,
    loadUserData: PropTypes.func.isRequired,
    location: PropTypes.object,
    personalInfo: PropTypes.any.isRequired,
    placeOrder: PropTypes.func.isRequired,
    removeFromBasket: PropTypes.func.isRequired,
    removeUserAddress: PropTypes.func.isRequired,
    removeUserCard: PropTypes.func.isRequired,
    selectAddress: PropTypes.func.isRequired,
    selectCard: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    ubUser: PropTypes.any.isRequired,
    updateUserAddress: PropTypes.func.isRequired,
    userAddresses: PropTypes.any.isRequired,
    userCards: PropTypes.any.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.onAddAddressClick = ::this.onAddAddressClick;
    this.onAddressChangeClick = ::this.onAddressChangeClick;
    this.onAddCardClick = ::this.onAddCardClick;
    this.onAddNewCardClick = ::this.onAddNewCardClick;
    this.onCardSelectClick = ::this.onCardSelectClick;
    this.onAddPersonalInfoClick = ::this.onAddPersonalInfoClick;
    this.onCardSubmit = ::this.onCardSubmit;
    this.onChangeDeliveryClick = ::this.onChangeDeliveryClick;
    this.onModalDeliveryClose = ::this.onModalDeliveryClose;
    this.onModalAddressClose = ::this.onModalAddressClose;
    this.onModalAddressEditClose = ::this.onModalAddressEditClose;
    this.onModalCardClose = ::this.onModalCardClose;
    this.onModalCardSelectClose = ::this.onModalCardSelectClose;
    this.onModalPhoneClose = ::this.onModalPhoneClose;
    this.onModalPinClose = ::this.onModalPinClose;
    this.onModalAddressSelectClose = ::this.onModalAddressSelectClose;
    this.onModalCheckoutSuccessClose = ::this.onModalCheckoutSuccessClose;
    this.onAddressSubmit = ::this.onAddressSubmit;
    this.onAddressEditSubmit = ::this.onAddressEditSubmit;
    this.onPersonalInfoSubmit = ::this.onPersonalInfoSubmit;
    this.onPinSubmit = ::this.onPinSubmit;
    this.onOrderSubmit = ::this.onOrderSubmit;
    this.onAddNewAddressClick = ::this.onAddNewAddressClick;
    this.onAddressSelectSubmit = ::this.onAddressSelectSubmit;
    this.onAddressEditClick = ::this.onAddressEditClick;
    this.onAddressRemoveClick = ::this.onAddressRemoveClick;
    this.onCardRemoveClick = ::this.onCardRemoveClick;
    this.onCardSelectSubmit = ::this.onCardSelectSubmit;
    this.state = {
      isModalAddressOpen: false,
      isModalAddressEditOpen: false,
      isModalAddressSelectOpen: false,
      isModalCardOpen: false,
      isModalCardSelectOpen: false,
      isModalCheckoutSuccessOpen: false,
      isModalDeliveryOpen: false,
      isModalPhoneOpen: false,
      isModalPinOpen: false,
      addressEditId: null
    };
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.loadUserData();
    }
    if (this.props.isAuthenticated && !this.props.basketData.size) {
      this.props.loadBasketData();
      this.props.loadUbUser();
      this.props.loadUserAddresses();
      this.props.loadUserCards();
    }
  }

  // If authenticated we load the personal data.
  componentWillReceiveProps ({ isAuthenticated }) {
    if (isAuthenticated && this.props.isAuthenticated !== isAuthenticated) {
      this.props.loadUserData();
      if (!this.props.basketData.size) {
        this.props.loadBasketData();
        this.props.loadUbUser();
        this.props.loadUserAddresses();
        this.props.loadUserCards();
      }
    }
  }

  onAddAddressClick () {
    this.setState({ isModalAddressOpen: true });
  }

  onAddNewAddressClick () {
    this.setState({ isModalAddressSelectOpen: false, isModalAddressOpen: true });
  }

  onAddressChangeClick () {
    this.setState({ isModalAddressSelectOpen: true });
  }

  onAddressEditClick (addressId) {
    const selectedAddress = this.props.userAddresses.find((x) => x.get('id') === addressId);
    this.props.loadEditAddressData(selectedAddress);
    this.setState({
      isModalAddressSelectOpen: false,
      isModalAddressEditOpen: true
    });
  }

  async onAddressRemoveClick (addressId) {
    await this.props.removeUserAddress({ id: addressId });
    this.setState({
      isModalAddressEditOpen: false
    });
    this.props.loadUserAddresses();
  }

  async onAddressSubmit (values) {
    try {
      const data = values.toJS();
      const addressData = await this.props.addNewAddress(data);
      if (!this.props.basketData.get('shippingAddressId')) {
        await this.props.selectAddress({ shippingAddressId: addressData.address.id });
      }
      this.setState({ isModalAddressOpen: false });
      this.props.loadUserAddresses();
    } catch (e) {
      throw e;
    }
  }

  async onAddressEditSubmit (values) {
    try {
      const data = values.toJS();
      const addressData = await this.props.updateUserAddress(data);
      if (!this.props.basketData.get('shippingAddressId')) {
        await this.props.selectAddress({ shippingAddressId: addressData.address.id });
      }
      this.setState({ isModalAddressEditOpen: false });
      this.props.loadUserAddresses();
    } catch (e) {
      throw e;
    }
  }

  async onCardSubmit (values) {
    try {
      const data = values.toJS();
      const userAddress = this.props.userAddresses.first();
      data.number = String(data.number);
      data.addressId = userAddress.get('id');
      data.secret = 'secret';
      const cardData = await this.props.addNewCard(data);
      if (!this.props.basketData.get('cardId')) {
        await this.props.selectCard({ cardId: cardData.card.id });
      }
      this.setState({ isModalCardOpen: false });
      this.props.loadUserCards();
    } catch (e) {
      throw e;
    }
  }

  async onOrderSubmit (values) {
    try {
      const { cvv } = values.toJS();
      await this.props.placeOrder({ cvv });
      this.setState({ isModalCheckoutSuccessOpen: true });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  onAddCardClick () {
    this.setState({ isModalCardOpen: true });
  }

  onCardSelectClick () {
    this.setState({ isModalCardSelectOpen: true });
  }

  async onCardRemoveClick (cardId) {
    await this.props.removeUserCard({ id: cardId });
    this.setState({
      isModalCardSelectOpen: false
    });
    this.props.loadUserCards();
  }

  async onCardSelectSubmit (values) {
    try {
      const { cardId } = values.toJS();
      await this.props.selectCard({ cardId });
      this.setState({ isModalCardSelectOpen: false });
    } catch (e) {
      throw e;
    }
  }

  onAddNewCardClick () {
    this.setState({ isModalCardSelectOpen: false, isModalCardOpen: true });
  }

  onAddPersonalInfoClick () {
    this.setState({ isModalPhoneOpen: true });
  }

  onChangeDeliveryClick () {
    this.setState({ isModalDeliveryOpen: true });
  }

  onModalAddressClose (e) {
    e && e.preventDefault();
    this.setState({ isModalAddressOpen: false });
  }

  onModalAddressEditClose (e) {
    e && e.preventDefault();
    this.setState({ isModalAddressEditOpen: false });
  }

  onModalCardClose () {
    this.setState({ isModalCardOpen: false });
  }

  onModalDeliveryClose () {
    this.setState({ isModalDeliveryOpen: false });
  }

  onModalPinClose () {
    this.setState({ isModalPinOpen: false });
  }

  onModalPhoneClose () {
    this.setState({ isModalPhoneOpen: false });
  }

  onModalAddressSelectClose () {
    this.setState({ isModalAddressSelectOpen: false });
  }

  onModalCardSelectClose () {
    this.setState({ isModalCardSelectOpen: false });
  }

  onRemoveProductClick (lineId) {
    this.props.removeFromBasket({ lineId });
  }

  async onPersonalInfoSubmit (values) {
    try {
      await this.props.initUbUser(values);
      this.setState({ isModalPhoneOpen: false, isModalPinOpen: true });
    } catch (e) {
      throw e;
    }
  }

  async onPinSubmit (values) {
    try {
      await this.props.createUbUser(values, this.props.userId, this.props.personalInfo);
      this.setState({ isModalPinOpen: false });
    } catch (e) {
      throw e;
    }
  }

  async onAddressSelectSubmit (values) {
    try {
      const { addressId } = values.toJS();
      await this.props.selectAddress({ shippingAddressId: addressId });
      this.setState({ isModalAddressSelectOpen: false });
    } catch (e) {
      throw e;
    }
  }

  async onModalCheckoutSuccessClose () {
    await this.props.loadBasketData();
    this.setState({ isModalCheckoutSuccessOpen: false });
  }

  render () {
    const { basketData, ubUser, userAddresses, userCards, handleSubmit, error } = this.props;
    const basketItems = basketData.get('transactions');
    const userAddress = userAddresses.filter((x) => x.get('id') === basketData.get('shippingAddressId')).first();
    const userCard = userCards.filter((x) => x.get('id') === basketData.get('cardId')).first();
    const checkoutEnabled = ubUser.get('mobile') && userAddress && userCard;

    return (
      <Container style={st.container}>
        <div style={st.title}>My Basket</div>
        <div>
          {(!basketItems || !basketItems.size) &&
          <div style={[ st.box, st.box.empty ]}>
            <div>
              <img src={iconBasketLarge} width='48'/>
            </div>
            <div style={st.box.empty.fline}>Your basket is currently empty</div>
            <div style={st.box.empty.sline}>Browse some scenes to find popular products</div>
            <Button style={[ pinkButtonStyle, st.box.empty.btn ]}>START SHOPPING</Button>
            <div style={st.box.empty.history}>View Order History</div>
          </div>}
          {(basketItems && Boolean(basketItems.size)) &&
          <div style={st.filled}>
            <div style={st.orders}>
              {basketItems.map((item, index) =>
                <div key={`order_box_${index}`} style={st.box}>
                  <div style={st.box.title}>{item.getIn([ 'shop', 'url' ])}</div>
                  <div style={st.box.items}>
                    {item.get('lines').map((line) =>
                      <div key={line.get('id')} style={st.box.item}>
                        <div style={[ st.box.item.image, { backgroundImage: `url('${line.getIn([ 'product', 'thumbnailUrl' ])}')` } ]}/>
                        <div style={st.box.item.content}>
                          <div style={st.box.item.header}>
                            <div style={st.box.item.brand}>New Balance</div>
                            <div style={st.box.item.remove} onClick={this.onRemoveProductClick.bind(this, line.get('id'))}>X</div>
                          </div>
                          <div style={st.box.item.name}>
                            {line.getIn([ 'product', 'title' ])}
                          </div>
                          <div style={st.box.item.footer}>
                            <div style={st.box.item.props}>
                              {line.get('selectedAttributes').map((attr) =>
                                <div key={attr.get('name')} style={st.box.item.props.prop}>
                                  {attr.get('name')}: <b style={st.box.item.props.b}>{line.getIn([ 'attributes', attr.get('name'), 'text' ])}</b>
                                </div>
                              )}
                            </div>
                            <div style={st.box.item.cost}>{line.getIn([ 'product', 'price', 'text' ])}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={st.box.delivery}>
                    <div style={st.box.delivery.type}>{item.getIn([ 'selectedShippingOption', 'text' ])}</div>
                    <div style={st.box.delivery.link} onClick={this.onChangeDeliveryClick}>change</div>
                    <div style={st.box.delivery.cost}>
                      {item.getIn([ 'selectedShippingOption', 'price', 'value' ])
                        ? item.getIn([ 'selectedShippingOption', 'price', 'text' ])
                        : 'FREE'}
                      </div>
                    {this.state.isModalDeliveryOpen &&
                    <Modal
                      isOpen
                      style={smallDialogStyle}
                      onClose={this.onModalDeliveryClose}>
                      <div style={st.modal}>
                        <div style={st.modal.title}>Delivery Method</div>
                        <div style={st.modal.items}>
                          {item.getIn([ 'shop', 'shippingOptions' ]).map((option) =>
                            <div key={`ship_option_${option.get('id')}`} style={st.modal.item}>
                              <div style={[ st.deliveryModal.dot, st.deliveryModal.dot.active ]}>
                                <div style={st.deliveryModal.dot.cir}/>
                              </div>
                              <div style={st.deliveryModal.left}>
                                <div style={st.deliveryModal.type}>{option.get('text')}</div>
                                <div style={st.deliveryModal.time}>3-6 Business Days</div>
                              </div>
                              <div style={st.deliveryModal.cost}>
                                {option.get([ 'price', 'value' ])
                                  ? item.getIn([ 'price', 'text' ])
                                  : 'FREE'}
                              </div>
                            </div>
                          )}
                        </div>
                        <Button style={[ pinkButtonStyle, st.modal.btn ]} onClick={this.onModalDeliveryClose}>Save</Button>
                      </div>
                    </Modal>}
                  </div>
                  <div style={st.box.footer}>
                    <div>Total</div>
                    <div style={st.box.footer.totalCost}>{item.getIn([ 'total', 'text' ])}</div>
                  </div>
                </div>
              )}
            </div>
            <div style={st.checkoutDetails}>
              <div style={st.box}>
                <form onSubmit={handleSubmit(this.onOrderSubmit)}>
                  <div style={st.box.title}>Checkout Details</div>
                  <div style={st.box.items}>
                    <div style={st.box.itemCheckout}>
                      <div>
                        <div style={st.box.itemCheckout.title}>Personal Info</div>
                        <div style={st.box.itemCheckout.text}>
                          {ubUser.get('email') && <div>{ubUser.get('email')}</div>}
                          {ubUser.get('mobile') && <div>{ubUser.get('mobile')}</div>}
                        </div>
                      </div>
                      {ubUser.get('mobile')
                        ? <div style={st.box.itemCheckout.add} onClick={this.onAddPersonalInfoClick}>change</div>
                        : <div style={st.box.itemCheckout.add} onClick={this.onAddPersonalInfoClick}>Add</div>
                      }
                      {this.state.isModalPhoneOpen &&
                      <ModalPhoneForm onClose={this.onModalPhoneClose} onSubmit={this.onPersonalInfoSubmit}/>}
                      {this.state.isModalPinOpen &&
                      <ModalPinForm number={this.props.personalInfo.get('number')} onClose={this.onModalPinClose} onSubmit={this.onPinSubmit}/>}
                    </div>
                    <div style={st.box.itemCheckout}>
                      <div>
                        <div style={st.box.itemCheckout.title}>Delivery Address</div>
                        {userAddress &&
                        <div style={st.box.itemCheckout.text}>
                          <div>
                            {userAddress.get('title')} {userAddress.get('firstname')} {userAddress.get('lastname')}
                          </div>
                          <div>{userAddress.get('line1')}</div>
                          <div>{userAddress.get('postcode')} {userAddress.get('city')}</div>
                        </div>}
                      </div>
                      {userAddress
                        ? <div style={st.box.itemCheckout.add} onClick={this.onAddressChangeClick}>change</div>
                        : <div style={st.box.itemCheckout.add} onClick={this.onAddAddressClick}>Add</div>
                      }
                      {this.state.isModalAddressOpen &&
                      <ModalAddressForm onClose={this.onModalAddressClose} onSubmit={this.onAddressSubmit}/>}
                      {this.state.isModalAddressSelectOpen &&
                      <ModalAddressSelectForm
                        addNewAddress={this.onAddNewAddressClick}
                        addresses={userAddresses}
                        editAddress={this.onAddressEditClick}
                        initialValues={{ addressId: basketData.get('shippingAddressId') }}
                        onClose={this.onModalAddressSelectClose}
                        onSubmit={this.onAddressSelectSubmit}/>}
                      {this.state.isModalAddressEditOpen &&
                      <ModalAddressEditForm
                        isEditForm
                        removeAddress={this.onAddressRemoveClick}
                        onClose={this.onModalAddressEditClose}
                        onSubmit={this.onAddressEditSubmit}/>}
                    </div>
                    <div style={st.box.itemCheckout}>
                      <div>
                        <div style={st.box.itemCheckout.title}>Payment Method</div>
                        {userCard &&
                        <div style={st.box.itemCheckout.text}>
                          <div style={st.paymentCard}>
                            <div style={st.paymentCard.name}>VISA</div>
                            <div style={st.paymentCard.number}>
                              <div style={st.paymentCard.number.dots}>··· ··· ···&nbsp;</div>
                              {userCard.get('maskedNumber').slice(-4)}
                            </div>
                          </div>
                          <div style={st.box.itemCheckout.cvc}>
                            <label style={st.modal.label}>Enter 3-digit CVC Code</label>
                            <Field
                              component='input'
                              name='cvv'
                              props={{ required: true, type: 'number' }}
                              style={st.box.itemCheckout.cvcInput}/>
                          </div>
                        </div>}
                        {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
                      </div>
                      {userCards.size
                        ? <div style={st.box.itemCheckout.add} onClick={this.onCardSelectClick}>change</div>
                        : <div style={st.box.itemCheckout.add} onClick={this.onAddCardClick}>Add</div>
                      }
                      {this.state.isModalCardOpen &&
                      <ModalCardForm onClose={this.onModalCardClose} onSubmit={this.onCardSubmit}/>}
                      {this.state.isModalCardSelectOpen &&
                      <ModalCardSelectForm
                        addNewCard={this.onAddNewCardClick}
                        cards={userCards}
                        initialValues={{ cardId: basketData.get('cardId') }}
                        removeCard={this.onCardRemoveClick}
                        onClose={this.onModalCardSelectClose}
                        onSubmit={this.onCardSelectSubmit}/>}
                    </div>
                  </div>
                  <div style={st.checkoutBtnWrapper}>
                    <button disabled={!checkoutEnabled} style={[ st.greenBtn, !checkoutEnabled && st.greenBtn.disabled ]}>
                      PLACE ORDER
                    </button>
                    {this.state.isModalCheckoutSuccessOpen &&
                    <Modal
                      isOpen
                      style={smallDialogStyle}
                      onClose={this.onModalCheckoutSuccessClose}>
                      <div style={st.modal}>
                        <div style={st.modal.title}>Thank You!</div>
                        <div style={st.modal.greet}>
                          <div style={st.modal.greet.title}>
                            Your order is being placed with the retailer
                          </div>
                          <div style={st.modal.greet.dscr}>
                            <div style={st.modal.greet.dscr.head}>What’s next:</div>
                            1.	When your order has been processed, you will receive a confirmation email from the retailer.
                            <br/><br/>
                            2.	Your bank may require payment verification and requiest your 3D-Secure passcode. In this case we’ll send you an SMS shortly.
                          </div>
                        </div>
                        <Button style={[ pinkButtonStyle, st.modal.btn ]} onClick={this.onModalCheckoutSuccessClose}>Continue</Button>
                      </div>
                    </Modal>}
                  </div>
                </form>
              </div>
              <div style={st.checkoutDetails.legal}>
                Lorem ipsum dolor sit amet and accept the terms and conditions and privacy statement suspendisse
                faucibus condimentum orci sit amet luctus. Nam accumsan orci vel magna imperdiet bibendum.
              </div>
            </div>
          </div>
          }
        </div>
        {this.props.isAuthenticated && <RecentlyAddedToWishlist location={this.props.location}/>}
      </Container>
    );
  }
}
