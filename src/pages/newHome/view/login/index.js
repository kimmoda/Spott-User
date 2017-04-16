/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import { reduxForm, Field } from 'redux-form/immutable';
import localized from '../../../_common/localized';
import * as actions from '../../../app/actions';
import { validateLoginForm } from './validateForm';
import { FormInput } from '../form';
import { authenticationErrorSelector, authenticationIsLoadingSelector } from '../../../app/selector';
import FacebookLoginButton from '../../../login/facebookLoginButton';

const styles = require('./index.scss');

@localized
@connect((state, ownProps) => ({
  errorSubmit: authenticationErrorSelector(state),
  isLoading: authenticationIsLoadingSelector(state)
}),
(dispatch) => ({
  submit: bindActionCreators(actions.doLogin, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@reduxForm({
  form: 'loginForm',
  validate: validateLoginForm
})
@CSSModules(styles, { allowMultiple: true })
export default class NewLogin extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    error: PropTypes.any,
    errorSubmit: PropTypes.any,
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

  async onSubmit (values) {
    try {
      await this.props.submit(values.toJS());
      this.onClose();
    } catch (e) {
      throw e;
    }
  }

  render () {
    const { errorSubmit, handleSubmit, t, submitFailed } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onClose}>
        <form className='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div className='form-title'>
            Log in
          </div>
          <FacebookLoginButton onClose={this.onClose}/>
          <div className='form-row'>
            <label className='form-label'>E-mail</label>
            <Field
              component={FormInput}
              name='email'
              placeholder='Your e-mail address'
              submitFailed={submitFailed}
              type='email'/>
          </div>
          <div className='form-row'>
            <label className='form-label'>Password</label>
            <Field
              component={FormInput}
              name='password'
              placeholder='Your password'
              submitFailed={submitFailed}
              type='password'/>
          </div>
          <div styleName='forgot-password'>Forgot your password?</div>
          {errorSubmit && <div className='form-error'>{t(errorSubmit)}</div>}
          <button className='form-submit' type='submit'>Log in</button>
          <div styleName='new-user'>New User? <Link styleName='sign-up' to='#'>Sign up here!</Link></div>
        </form>
      </ReactModal>
    );
  }
}
