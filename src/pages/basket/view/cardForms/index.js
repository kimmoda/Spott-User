/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { Button, pinkButtonStyle, Modal, smallDialogStyle, greyButtonStyle } from '../../../_common/buildingBlocks';
import localized from '../../../_common/localized';
import Radium from 'radium';
import { reduxForm, Field } from 'redux-form/immutable';
import { st } from '../styles';
import { normalizeCardNumber } from '../../normalizeForm';
import { validateCardFrom } from '../../validateForm';
import { renderField } from '../index';
import creditcardutils from 'creditcardutils';
import '../cardsIcons.css';

@Radium
class CardNumber extends Component {
  static propTypes = {
    input: PropTypes.any.isRequired,
    meta: PropTypes.any.isRequired,
    submitFailed: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props);
    this.inputChange = ::this.inputChange;
    this.state = {
      cardType: null
    };
  }

  inputChange (e) {
    const { input: { onChange } } = this.props;
    const val = e.target.value;
    this.setState({ cardType: creditcardutils.parseCardType(val) });
    onChange(e.target.value);
  }

  render () {
    const { cardType } = this.state;
    const { submitFailed } = this.props;
    const { touched, error } = this.props.meta;
    return (
      <div>
        <div style={st.ccNumInput}>
          <input
            required
            style={[ st.ccNumInput.field, submitFailed && touched && error && st.modal.input.error ]}
            type='text'
            {...this.props.input}
            onChange={this.inputChange}/>
          <div
            className={cardType ? `icon-${cardType}` : 'icon-placeholder'}
            style={st.ccNumInput.icon}/>
        </div>
        {submitFailed && touched && error && error !== 'err' && <div style={st.modal.error}>{error}</div>}
      </div>
    );
  }
}

@reduxForm({
  form: 'basketCardForm',
  validate: validateCardFrom
})
@localized
@Radium
export class ModalCardForm extends Component {
  static propTypes = {
    addNewAddress: PropTypes.func.isRequired,
    addresses: PropTypes.any,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onClose, error, addresses, addNewAddress, submitting, submitFailed } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>Add New Card</div>
          <form onSubmit={handleSubmit}>
            <div style={st.modal.form}>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Credit Card Number</label>
                <Field
                  component={CardNumber}
                  name='number'
                  normalize={normalizeCardNumber}
                  props={{ required: true, type: 'text' }}
                  submitFailed={submitFailed}/>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '160px' }}>
                  <label style={st.modal.label}>Expiration Date</label>
                  <div style={{ display: 'flex' }}>
                    <Field
                      component={renderField}
                      name='expiryMonth'
                      props={{ required: true, placeholder: 'MM' }}
                      style={st.modal.input}
                      submitFailed={submitFailed}/>
                    <Field
                      component={renderField}
                      name='expiryYear'
                      props={{ required: true, placeholder: 'YY' }}
                      style={st.modal.input}
                      submitFailed={submitFailed}/>
                  </div>
                </div>
                <div style={{ width: '100px', marginLeft: '10px' }}>
                  <label style={st.modal.label}>CVC</label>
                  <Field
                    component={renderField}
                    name='cvv'
                    props={{ required: true, type: 'number' }}
                    style={st.modal.input}
                    submitFailed={submitFailed}/>
                </div>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Name on Card</label>
                <Field
                  component={renderField}
                  name='name'
                  props={{ required: true, type: 'text' }}
                  style={st.modal.input}
                  submitFailed={submitFailed}/>
              </div>
            </div>
            <div style={[ st.modal.items, { marginTop: '-20px', borderTop: 0 } ]}>
              <div style={[ st.modal.item, { borderBottom: 0 } ]}>
                <label style={st.modal.label}>Billing Address</label>
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
                  </label>
                </div>
              )}
              <div style={st.modal.item}>
                <div style={st.modal.addNewLink} onClick={addNewAddress}>Add New Address</div>
              </div>
            </div>
            {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            <div style={st.modal.buttons}>
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

@reduxForm({
  form: 'basketCardSelectForm'
})
@localized
@Radium
export class ModalCardSelectForm extends Component {
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
                        <div style={st.paymentCard.select}>
                          <div
                            className={`icon-${card.getIn([ 'cardType', 'code' ])}`}
                            style={st.paymentCard.select.icon}/>
                          <div style={st.paymentCard.select.right}>
                            <div style={st.paymentCard.select.number}>
                              <div style={st.paymentCard.select.number.dots}>XXX XXX XXX&nbsp;</div>
                              {card.get('maskedNumber').slice(-4)}
                            </div>
                            <div style={st.paymentCard.select.name}>
                              {card.getIn([ 'cardType', 'code' ])}
                            </div>
                          </div>
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
