import React, { Component, PropTypes } from 'react';
import { Button, pinkButtonStyle, Modal, smallDialogStyle } from '../../../_common/buildingBlocks';
import localized from '../../../_common/localized';
import Radium from 'radium';
import { reduxForm, Field } from 'redux-form/immutable';
import { st } from '../styles';
import { normalizePhoneNumber } from '../../normalizeForm';

@reduxForm({
  form: 'basketPhoneForm'
})
@localized
@Radium
export class ModalPhoneForm extends Component {
  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, t } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>{t('basket.personalInfo')}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.form}>
              <label style={st.modal.label}>E-Mail</label>
              <Field
                component='input'
                name='email'
                props={{ required: true, type: 'email' }}
                style={st.modal.input}/>
              <label style={st.modal.label}>{t('basket.mobileNumber')}</label>
              <div style={st.modal.formCols}>
                <div style={{ width: '76px' }}>
                  <Field
                    component='input'
                    name='phoneCountry'
                    props={{ required: true }}
                    style={st.modal.input}/>
                </div>
                <div style={{ width: '295px' }}>
                  <Field
                    component='input'
                    name='number'
                    normalize={normalizePhoneNumber}
                    props={{ required: true }}
                    style={st.modal.input}/>
                </div>
              </div>
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
              <div style={st.modal.footer}>
                {t('basket.mobileVerify')}
              </div>
            </div>
            <Button style={[ pinkButtonStyle, st.modal.btn ]}>{t('basket.save')}</Button>
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
export class ModalPinForm extends Component {
  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    number: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, number, t } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>{t('basket.enterPin')}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.form}>
              <div style={st.modal.header}>
                {t('basket.pinSentTo')} {number}.
              </div>
              <label style={st.modal.label}>{t('basket.pinCode')}</label>
              <Field
                component='input'
                name='code'
                props={{ required: true }}
                style={st.modal.input}/>
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <Button style={[ pinkButtonStyle, st.modal.btn ]}>{t('basket.confirm')}</Button>
          </form>
        </div>
      </Modal>
    );
  }
}
