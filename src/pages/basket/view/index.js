/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Button, pinkButtonStyle, Modal, smallDialogStyle, RadiumLink } from '../../_common/buildingBlocks';
import { bindActionCreators } from 'redux';
import localized from '../../_common/localized';
import Radium from 'radium';
import RecentlyAddedToWishlist from '../../home/view/recentlyAddedToWishlist';
import * as actions from '../actions';
import * as homeActions from '../../home/actions';
import { basketSelector, basketEditAddressDataSelector } from '../selectors';
import { reduxForm, Field } from 'redux-form/immutable';
import { st } from './styles';
import { ModalAddressForm, ModalAddressSelectForm } from './addressForms';
import { ModalPhoneForm, ModalPinForm } from './phoneForms';
import { ModalCardForm, ModalCardSelectForm } from './cardForms';
import { normalizePhoneNumber } from '../normalizeForm';
import './cardsIcons.css';

const iconBasketLarge = require('./iconBasketLarge.svg');

const ModalAddressEditForm = connect(basketEditAddressDataSelector, null)(ModalAddressForm);

export const renderField = Radium((props) => {
  return (
    <input
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      required={props.required}
      style={[ st.modal.input, props.submitFailed && props.meta.touched && props.meta.error && st.modal.input.error ]}
      type={props.type}
      {...props.input} />
  );
});

@reduxForm({
  form: 'basketForm'
})
@localized
@connect(basketSelector, (dispatch) => ({
  addNewAddress: bindActionCreators(actions.addNewAddress, dispatch),
  addNewCard: bindActionCreators(actions.addNewCard, dispatch),
  createUbUser: bindActionCreators(actions.createUbUser, dispatch),
  initUbUser: bindActionCreators(actions.initUbUser, dispatch),
  loadBasketData: bindActionCreators(actions.loadBasketWrapper, dispatch),
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
    isUbAuthenticated: PropTypes.bool.isRequired,
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
    spottProducts: PropTypes.any.isRequired,
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
    if (this.props.isUbAuthenticated) {
      this.props.loadUserData();
    }
    if (this.props.isUbAuthenticated && !this.props.basketData.size) {
      this.props.loadBasketData();
      this.props.loadUbUser();
      this.props.loadUserAddresses();
      this.props.loadUserCards();
    }
  }

  // If authenticated we load the personal data.
  componentWillReceiveProps ({ isUbAuthenticated }) {
    if (isUbAuthenticated && this.props.isUbAuthenticated !== isUbAuthenticated) {
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
    this.setState({ isModalAddressSelectOpen: false, isModalCardOpen: false, isModalAddressOpen: true });
  }

  onAddressChangeClick () {
    this.setState({ isModalAddressSelectOpen: true });
  }

  onAddressEditClick (addressId) {
    const selectedAddress = this.props.userAddresses.find((x) => x.get('id') === addressId);
    const normalizedAddress = selectedAddress.set('phone', normalizePhoneNumber(selectedAddress.get('phone')));
    this.props.loadEditAddressData(normalizedAddress);
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
      data.expiryDate = `${data.expiryMonth}/${data.expiryYear}`;
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
      const { email, phoneCountry, number } = values.toJS();
      const data = { email, number: `+${phoneCountry.replace(/[^\d]/g, '')}${number.replace(/[^\d]/g, '')}` };
      await this.props.initUbUser(data);
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
    const { basketData, ubUser, userAddresses, userCards, handleSubmit, error, spottProducts, location } = this.props;
    const basketItems = basketData.get('transactions');
    const userAddress = userAddresses.filter((x) => x.get('id') === basketData.get('shippingAddressId')).first();
    const userCard = userCards.filter((x) => x.get('id') === basketData.get('cardId')).first();
    const checkoutEnabled = ubUser.get('mobile') && userAddress && userCard;

    return (
      <Container style={st.container}>
        <div style={st.title}>My Basket</div>
        <div>
          {(!basketItems || !basketItems.size || !spottProducts.size) &&
          <div style={[ st.box, st.box.empty ]}>
            <div>
              <img src={iconBasketLarge} width='48'/>
            </div>
            <div style={st.box.empty.fline}>Your basket is currently empty</div>
            <div style={st.box.empty.sline}>Browse some scenes to find popular products</div>
            <Button style={[ pinkButtonStyle, st.box.empty.btn ]}>START SHOPPING</Button>
            <div style={st.box.empty.history}>View Order History</div>
          </div>}
          {(basketItems && Boolean(basketItems.size) && Boolean(spottProducts.size)) &&
          <div style={st.filled}>
            <div style={st.orders}>
              {basketItems.map((item, index) =>
                <div key={`order_box_${index}`} style={st.box}>
                  <div style={st.box.title}>{item.getIn([ 'shop', 'url' ])}</div>
                  <div style={st.box.items}>
                    {item.get('lines').map((line) =>
                      <div key={line.get('id')} style={st.box.item}>
                        <RadiumLink style={[ st.box.item.image, { backgroundImage: `url('${line.getIn([ 'product', 'thumbnailUrl' ])}')` } ]}
                          to={{
                            pathname: spottProducts.getIn([ String(line.getIn([ 'product', 'id' ])), 'data', 'shareUrl' ]),
                            state: { modal: true, returnTo: (location && location.pathname) || '/' }
                          }}/>
                        <div style={st.box.item.content}>
                          <div style={st.box.item.header}>
                            <div style={st.box.item.brand}>{spottProducts.getIn([ String(line.getIn([ 'product', 'id' ])), 'data', 'brand', 'name' ])}</div>
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
                      <ModalPhoneForm
                        initialValues={{
                          email: ubUser.get('email'),
                          phoneCountry: ubUser.getIn([ 'mobileParts', 'countryCode' ]) || '+32',
                          number: normalizePhoneNumber(ubUser.getIn([ 'mobileParts', 'number' ]))
                        }}
                        onClose={this.onModalPhoneClose}
                        onSubmit={this.onPersonalInfoSubmit}/>}
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
                        : ubUser.get('mobile') && <div style={st.box.itemCheckout.add} onClick={this.onAddAddressClick}>Add</div>
                      }
                      {this.state.isModalAddressOpen &&
                      <ModalAddressForm
                        initialValues={{
                          countryId: 8,
                          title: 'Mr',
                          phoneCountry: ubUser.getIn([ 'mobileParts', 'countryCode' ]),
                          phone: normalizePhoneNumber(ubUser.getIn([ 'mobileParts', 'number' ]))
                        }}
                        onClose={this.onModalAddressClose}
                        onSubmit={this.onAddressSubmit}/>}
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
                            <div style={st.paymentCard.name}>
                              <div
                                className={`icon-${userCard.getIn([ 'cardType', 'code' ])}`}
                                style={st.paymentCard.name.icon}/>
                              {userCard.getIn([ 'cardType', 'code' ])}
                            </div>
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
                        : userAddress && <div style={st.box.itemCheckout.add} onClick={this.onAddCardClick}>Add</div>
                      }
                      {this.state.isModalCardOpen &&
                      <ModalCardForm
                        addNewAddress={this.onAddNewAddressClick}
                        addresses={userAddresses}
                        initialValues={{ addressId: basketData.get('shippingAddressId') }}
                        onClose={this.onModalCardClose}
                        onSubmit={this.onCardSubmit}/>}
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
        {this.props.isUbAuthenticated && <RecentlyAddedToWishlist location={this.props.location}/>}
      </Container>
    );
  }
}
