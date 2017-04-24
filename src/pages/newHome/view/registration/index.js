/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import { reduxForm, Field } from 'redux-form/immutable';
import moment from 'moment';
import localized from '../../../_common/localized';
import * as actions from '../../../register/actions';
import { validateRegistrationForm } from './validateForm';
import { FormInput, FormRadio, FormSelect, FormCheckbox } from '../form';
import { registrationFacebookErrorSelector, registrationFacebookIsLoadingSelector } from '../../../app/selector';
import FacebookRegisterButton from '../../../register/view/facebookRegisterButton';

const styles = require('./index.scss');

@localized
@connect((state, ownProps) => ({
  facebookError: registrationFacebookErrorSelector(state),
  facebookIsLoading: registrationFacebookIsLoadingSelector(state)
}),
(dispatch) => ({
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
  }

  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || `/${this.props.currentLocale}/new/home`);
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
    const { error, handleSubmit, t, submitFailed, currentLocale, facebookIsLoading, facebookError, submitting } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onClose}>
        <form className='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div className='form-title'>
            Sign up
          </div>
          <FacebookRegisterButton disabled={facebookIsLoading} onClose={this.onClose} />
          {facebookError && typeof facebookError === 'string' && <div className='form-error'>{t(facebookError)}</div>}
          <div className='form-row'>
            <label className='form-label form-label-required'>Name</label>
            <div className='form-join-fields'>
              <Field
                component={FormInput}
                name='firstname'
                placeholder='First name'
                submitFailed={submitFailed}
                type='text'/>
              <Field
                component={FormInput}
                name='lastname'
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
                value='0'/>
              <Field
                component={FormRadio}
                label='Female'
                name='gender'
                submitFailed={submitFailed}
                value='1'/>
              <Field
                component={FormRadio}
                label='Unspecified'
                name='gender'
                submitFailed={submitFailed}
                value='2'/>
            </div>
          </div>
          <div className='form-row'>
            <label className='form-label'>Date of birth</label>
            <div className='form-join-3-fields'>
              <Field
                component={FormSelect}
                emptyOption
                name='day'
                options={new Array(31).fill(1).map((item, index) => { return { value: index + 1, label: index + 1 }; })}
                submitFailed={submitFailed}/>
              <Field
                component={FormSelect}
                emptyOption
                name='month'
                options={moment.months().map((item, index) => { return { value: index + 1, label: item }; })}
                submitFailed={submitFailed}/>
              <Field
                component={FormSelect}
                emptyOption
                name='year'
                options={new Array(moment().format('YYYY') - 1920 + 1).fill(1).map((item, index) => { return { value: 1920 + index, label: 1920 + index }; })}
                submitFailed={submitFailed}/>
            </div>
          </div>
          <div className='form-row'>
            <label className='form-label'>Country</label>
            <Field
              component={FormSelect}
              name='country'
              options={[ { value: 'Belgium', label: 'Belgium' } ]}
              submitFailed={submitFailed}/>
          </div>
          <div className='form-row'>
            <label className='form-label'>Language</label>
            <Field
              component={FormSelect}
              name='country'
              options={[ { value: 'nl', label: 'Dutch' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'French' } ]}
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
                  pathname: `/${currentLocale}/new/login`,
                  state: { modal: true, returnTo: this.props.location.state.returnTo }
                } : `/${currentLocale}/new/login`}>
              {t('register.logIn')}
            </Link>
          </div>
        </form>
      </ReactModal>
    );
  }
}
