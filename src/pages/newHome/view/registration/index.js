/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { List } from 'immutable';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import { reduxForm, Field } from 'redux-form/immutable';
import moment from 'moment';
import localized from '../../../_common/localized';
import * as actions from '../../../register/actions';
import { validateRegistrationForm } from './validateForm';
import { FormInput, FormRadio, FormSelect, FormCheckbox } from '../form';
import FacebookRegisterButton from './facebookRegisterButton';
import { IconClose } from '../icons';
import * as newActions from '../../actions';
import { registrationFormSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(registrationFormSelector, (dispatch) => ({
  loadRegistrationFormDefaults: bindActionCreators(newActions.loadRegistrationFormDefaults, dispatch),
  submit: bindActionCreators(actions.submit, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@reduxForm({
  form: 'registrationForm',
  validate: validateRegistrationForm
})
@CSSModules(styles, { allowMultiple: true })
export default class NewRegistration extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    error: PropTypes.any,
    facebookError: PropTypes.any,
    facebookIsLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loadRegistrationFormDefaults: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    routerPush: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    systemCountries: PropTypes.object.isRequired,
    systemLanguages: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClose = ::this.onClose;
    this.onSubmit = ::this.onSubmit;
  }

  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.props.loadRegistrationFormDefaults();
  }

  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || `/${this.props.currentLocale}/`);
  }

  async onSubmit () {
    try {
      await Reflect.apply(this.props.submit, this, arguments);
      this.onClose();
    } catch (e) {
      throw e;
    }
  }

  render () {
    const { error, handleSubmit, t, submitFailed, currentLocale, facebookIsLoading, facebookError, submitting, systemLanguages } = this.props;
    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onClose}>
        <div styleName='modal-close'><i onClick={this.onClose}><IconClose /></i></div>
        <form className='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div className='form-title'>
            Sign up
          </div>
          <div styleName='facebook-btn-wrapper'>
            <FacebookRegisterButton disabled={facebookIsLoading} onClose={this.onClose} />
          </div>
          {facebookError && typeof facebookError === 'string' && <div className='form-error'>{t(facebookError)}</div>}
          <div className='form-row'>
            <label className='form-label form-label-required'>Name</label>
            <div className='form-join-fields'>
              <Field
                component={FormInput}
                name='firstName'
                placeholder='First name'
                submitFailed={submitFailed}
                type='text'/>
              <Field
                component={FormInput}
                name='lastName'
                placeholder='Last name'
                submitFailed={submitFailed}
                type='text'/>
            </div>
          </div>
          <div className='form-row'>
            <label className='form-label form-label-required'>E-mail</label>
            <Field
              component={FormInput}
              name='email'
              placeholder='Your e-mail address'
              submitFailed={submitFailed}
              type='email'/>
          </div>
          <div className='form-row'>
            <label className='form-label form-label-required'>Password</label>
            <Field
              component={FormInput}
              name='password'
              placeholder='Your password'
              submitFailed={submitFailed}
              type='password'/>
          </div>
          <div className='form-row'>
            <label className='form-label'>Gender</label>
            <div className='form-radios'>
              <Field
                component={FormRadio}
                label='Male'
                name='gender'
                submitFailed={submitFailed}
                type='radio'
                value='MALE'/>
              <Field
                component={FormRadio}
                label='Female'
                name='gender'
                submitFailed={submitFailed}
                type='radio'
                value='FEMALE'/>
              <Field
                component={FormRadio}
                label='Unspecified'
                name='gender'
                submitFailed={submitFailed}
                type='radio'
                value='UNKNOWN'/>
            </div>
          </div>
          <div className='form-row'>
            <label className='form-label'>Date of birth</label>
            <div className='form-join-3-fields'>
              <Field
                component={FormSelect}
                emptyOption
                name='dayOfBirth'
                options={new Array(31).fill(1).map((item, index) => {
                  return { value: index + 1, label: index + 1 };
                })}
                submitFailed={submitFailed}/>
              <Field
                component={FormSelect}
                emptyOption
                name='monthOfBirth'
                options={moment.months().map((item, index) => {
                  return { value: index, label: item };
                })}
                submitFailed={submitFailed}/>
              <Field
                component={FormSelect}
                emptyOption
                name='yearOfBirth'
                options={new Array(moment().format('YYYY') - 1920 + 1).fill(1).map((item, index) => {
                  return { value: 1920 + index, label: 1920 + index };
                })}
                submitFailed={submitFailed}/>
            </div>
          </div>
          {/*
          <div className='form-row'>
            <label className='form-label'>Country</label>
            <Field
              component={FormSelect}
              name='country'
              options={systemCountries.get('data', List()).toJS().map((item) => { return { value: item.uuid, label: item.name }; })}
              submitFailed={submitFailed}/>
          </div>
           */}
          <div className='form-row'>
            <label className='form-label'>Language</label>
            <Field
              component={FormSelect}
              name='language'
              options={systemLanguages.get('data', List()).toJS().map((item) => { return { value: item.uuid, label: item.name }; })}
              submitFailed={submitFailed}/>
          </div>
          <div className='form-row'>
            <div className='form-checkbox-tiny'>
              <Field
                component={FormCheckbox}
                label='I confirm to know, understand and accept the terms and
                conditions and privacy statement of Appiness - Spott and to
                have kept a copy of it. I know that this app shows only
                indicative prices from third parties that do not bind Appiness.'
                name='terms'
                submitFailed={submitFailed}/>
            </div>
          </div>
          {error && <div className='form-error'>{t(error)}</div>}
          <button
            className='form-submit'
            disabled={facebookIsLoading || submitting}
            type='submit'>
            Sign up
          </button>
          <div styleName='new-user'>
            Already have an account?
            <Link
              styleName='sign-up'
              to={this.props.location.state && this.props.location.state.modal
                ? {
                  pathname: `/${currentLocale}/login`,
                  state: { modal: true, returnTo: this.props.location.state.returnTo }
                } : `/${currentLocale}/login`}>
              {t('register.logIn')}
            </Link>
          </div>
        </form>
      </ReactModal>
    );
  }
}
