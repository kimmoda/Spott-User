/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, fontWeights, makeTextStyle, Container, Button, pinkButtonStyle, mediaQueries, Modal, smallDialogStyle, textInputStyle } from '../../_common/buildingBlocks';
import { bindActionCreators } from 'redux';
import localized from '../../_common/localized';
import Radium from 'radium';
import RecentlyAddedToWishlist from '../../home/view/recentlyAddedToWishlist';
import * as actions from '../actions';
import * as homeActions from '../../home/actions';
import { basketSelector } from '../selectors';
import { reduxForm, Field } from 'redux-form/immutable';

const iconBasketLarge = require('./iconBasketLarge.svg');

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
      cursor: 'default',
      pointerEvents: 'none'
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
      marginBottom: '8px'
    },
    footer: {
      ...makeTextStyle(fontWeights.medium, '13px', 0, '18px'),
      color: colors.slateGray,
      marginTop: '6px'
    },
    error: {
      marginBottom: '10px',
      color: '#ff0000'
    }
  }
};

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
              <div style={st.modal.footer}>
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

@localized
@connect(basketSelector, (dispatch) => ({
  createUbUser: bindActionCreators(actions.createUbUser, dispatch),
  initUbUser: bindActionCreators(actions.initUbUser, dispatch),
  loadBasketData: bindActionCreators(actions.loadBasketData, dispatch),
  loadUbUser: bindActionCreators(actions.loadUbUser, dispatch),
  loadUserData: bindActionCreators(homeActions.loadUserData, dispatch),
  removeFromBasket: bindActionCreators(actions.removeFromBasket, dispatch)
}))
@Radium
export default class Basket extends Component {
  static propTypes = {
    basketData: PropTypes.any.isRequired,
    createUbUser: PropTypes.func.isRequired,
    initUbUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loadBasketData: PropTypes.func.isRequired,
    loadUbUser: PropTypes.func.isRequired,
    loadUserData: PropTypes.func.isRequired,
    location: PropTypes.object,
    personalInfo: PropTypes.any.isRequired,
    removeFromBasket: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    ubUser: PropTypes.any.isRequired,
    userId: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.onAddPersonalInfoClick = ::this.onAddPersonalInfoClick;
    this.onChangeDeliveryClick = ::this.onChangeDeliveryClick;
    this.onModalDeliveryClose = ::this.onModalDeliveryClose;
    this.onModalPhoneClose = ::this.onModalPhoneClose;
    this.onModalPinClose = ::this.onModalPinClose;
    this.onPersonalInfoSubmit = ::this.onPersonalInfoSubmit;
    this.onPinSubmit = ::this.onPinSubmit;
    this.state = {
      isModalDeliveryOpen: false,
      isModalPhoneOpen: false,
      isModalPinOpen: false
    };
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.loadUserData();
    }
    if (this.props.isAuthenticated && !this.props.basketData.size) {
      this.props.loadBasketData();
      this.props.loadUbUser();
    }
  }

  // If authenticated we load the personal data.
  componentWillReceiveProps ({ isAuthenticated }) {
    if (isAuthenticated && this.props.isAuthenticated !== isAuthenticated) {
      this.props.loadUserData();
    }
  }

  onAddPersonalInfoClick () {
    this.setState({ isModalPhoneOpen: true });
  }

  onChangeDeliveryClick () {
    this.setState({ isModalDeliveryOpen: true });
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

  render () {
    const { basketData, ubUser } = this.props;
    const basketItems = basketData.get('transactions');

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
                              <div style={st.box.item.props.prop}>Size: <b style={st.box.item.props.b}>43</b></div>
                              <div style={st.box.item.props.prop}>Colour: <b style={st.box.item.props.b}>Grey/Blue</b></div>
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
                        <Button style={[ pinkButtonStyle, st.modal.btn ]}>Save</Button>
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
                      ? <div style={st.box.itemCheckout.add} onClick={this.onAddPersonalInfoClick}>update</div>
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
                    </div>
                    <div style={st.box.itemCheckout.add}>Add</div>
                  </div>
                  <div style={st.box.itemCheckout}>
                    <div>
                      <div style={st.box.itemCheckout.title}>Payment Method</div>
                    </div>
                    <div style={st.box.itemCheckout.add}>Add</div>
                  </div>
                </div>
                <div style={st.checkoutBtnWrapper}>
                  <button style={st.greenBtn}>PLACE ORDER</button>
                </div>
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
