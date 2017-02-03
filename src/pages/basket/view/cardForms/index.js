import React, { Component, PropTypes } from 'react';
import { Button, pinkButtonStyle, Modal, smallDialogStyle } from '../../../_common/buildingBlocks';
import localized from '../../../_common/localized';
import Radium from 'radium';
import { reduxForm, Field } from 'redux-form/immutable';
import { st } from '../styles';

@reduxForm({
  form: 'basketCardForm'
})
@localized
@Radium
export class ModalCardForm extends Component {
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
