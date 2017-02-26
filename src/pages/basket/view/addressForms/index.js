import React, { Component, PropTypes } from 'react';
import { Button, pinkButtonStyle, Modal, smallDialogStyle, greyButtonStyle } from '../../../_common/buildingBlocks';
import localized from '../../../_common/localized';
import Radium from 'radium';
import { reduxForm, Field } from 'redux-form/immutable';
import { st } from '../styles';
import { renderSelectField } from '../selectInput';
import { validateAddressFrom } from '../../validateForm';
import { renderField } from '../index';
import { PhoneNumber } from '../formFields';

@reduxForm({
  form: 'basketAddressForm',
  validate: validateAddressFrom
})
@localized
@Radium
export class ModalAddressForm extends Component {
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
    const { handleSubmit, onSubmit, onClose, error, submitting, submitFailed, isEditForm, removeAddress, initialValues, t } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>
            {isEditForm ? t('basket.editAddress') : t('basket.addNewAddress')}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.form}>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>{t('basket.country')}</label>
                <Field
                  component={renderSelectField}
                  disabled={submitting}
                  name='countryId'
                  options={[ { value: 8, label: 'Belgium' } ]}
                  submitFailed={submitFailed} />
              </div>
              <div style={st.modal.formCols}>
                <div style={{ width: '73px' }}>
                  <label style={st.modal.label}>{t('basket.title')}</label>
                  <Field
                    component={renderSelectField}
                    disabled={submitting}
                    name='title'
                    options={[ { value: 'Mr', label: 'Mr' }, { value: 'Ms', label: 'Ms' } ]}
                    submitFailed={submitFailed} />
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>{t('basket.firstName')}</label>
                  <Field
                    component={renderField}
                    name='firstname'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}
                    submitFailed={submitFailed}/>
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>{t('basket.lastName')}</label>
                  <Field
                    component={renderField}
                    name='lastname'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}
                    submitFailed={submitFailed}/>
                </div>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>{t('basket.company')}</label>
                <Field
                  component={renderField}
                  name='company'
                  props={{ required: false, type: 'text' }}
                  style={st.modal.input}
                  submitFailed={submitFailed}/>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>{t('basket.streetAddress')}</label>
                <Field
                  component={renderField}
                  name='line1'
                  props={{ required: true, type: 'text' }}
                  style={st.modal.input}
                  submitFailed={submitFailed}/>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>{t('basket.additionalInfo')}</label>
                <Field
                  component={renderField}
                  name='line2'
                  props={{ type: 'text' }}
                  style={st.modal.input}
                  submitFailed={submitFailed}/>
              </div>
              <div style={st.modal.formCols}>
                <div style={{ width: '229px' }}>
                  <label style={st.modal.label}>{t('basket.city')}</label>
                  <Field
                    component={renderField}
                    name='city'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}
                    submitFailed={submitFailed}/>
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>{t('basket.postalCode')}</label>
                  <Field
                    component={renderField}
                    name='postcode'
                    props={{ required: true, type: 'number' }}
                    style={st.modal.input}
                    submitFailed={submitFailed}/>
                </div>
              </div>
              <div style={st.modal.formCols}>
                <div style={{ width: '84px' }}>
                  <label style={st.modal.label}>{t('basket.countryCode')}</label>
                  <Field
                    component={renderField}
                    name='phoneCountry'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}
                    submitFailed={submitFailed}/>
                </div>
                <div style={{ width: '289px' }}>
                  <label style={st.modal.label}>{t('basket.mobileNumber')}</label>
                  <Field
                    component={PhoneNumber}
                    name='phone'
                    props={{ required: true, type: 'text' }}
                    submitFailed={submitFailed}/>
                </div>
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
                {t('basket.cancel')}
              </button>
              <Button key='sbtn' style={[ pinkButtonStyle, st.modal.btn, st.modal.buttons.btn ]}>
                {t('basket.save')}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

@reduxForm({
  form: 'basketAddressSelectForm'
})
@localized
@Radium
export class ModalAddressSelectForm extends Component {
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
    const { handleSubmit, onSubmit, onClose, error, submitting, addresses, addNewAddress, editAddress, t } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>{t('basket.shippingAddress')}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.items}>
              <div style={st.modal.item}>
                <div style={st.modal.addNewLink} onClick={addNewAddress}>{t('basket.addNewAddress')}</div>
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
                        {address.get('line2') && <div>{address.get('line2')}</div>}
                        {address.get('postcode')} {address.get('city')}, {address.get('country')}<br/>
                        {address.get('phoneCountry')}{address.get('phone')}
                      </div>
                    </div>
                    <div style={st.modal.radioEdit} onClick={editAddress.bind(this, address.get('id'))}>{t('basket.edit')}</div>
                  </label>
                </div>
              )}
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <div style={st.modal.buttons}>
              <Button style={[ pinkButtonStyle, st.modal.btn ]}>
                {t('basket.save')}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
