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
import FacebookLoginButton from './facebookLoginButton';
import { IconClose } from '../icons';

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
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || `/${this.props.currentLocale}/`);
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
    const { errorSubmit, handleSubmit, t, submitFailed, currentLocale } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onClose}>
        <div styleName='modal-close'><i onClick={this.onClose}><IconClose /></i></div>
        <form className='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div className='form-title'>
            {t('common.logIn')}
          </div>
          <div styleName='facebook-btn-wrapper'>
            <FacebookLoginButton onClose={this.onClose}/>
          </div>
          <div className='form-row'>
            <label className='form-label'>{t('common.email')}</label>
            <Field
              component={FormInput}
              name='email'
              placeholder={t('common.yourEmail')}
              submitFailed={submitFailed}
              type='email'/>
          </div>
          <div className='form-row'>
            <label className='form-label'>{t('common.password')}</label>
            <Field
              component={FormInput}
              name='password'
              placeholder={t('common.yourPassword')}
              submitFailed={submitFailed}
              type='password'/>
          </div>
          <Link
            styleName='forgot-password'
            to={this.props.location.state && this.props.location.state.modal
              ? {
                pathname: `/${currentLocale}/resetpassword`,
                state: { modal: true, returnTo: this.props.location.state.returnTo }
              } : `/${currentLocale}/resetpassword`}>
            {t('login.forgotPassword')}
          </Link>
          {Boolean(errorSubmit && typeof errorSubmit === 'string') && <div className='form-error'>{t(errorSubmit)}</div>}
          <button className='form-submit' type='submit'>{t('common.logIn')}</button>
          <div styleName='new-user'>
            {t('login.newUser')}
            <Link
              styleName='sign-up'
              to={this.props.location.state && this.props.location.state.modal
                ? {
                  pathname: `/${currentLocale}/registration`,
                  state: { modal: true, returnTo: this.props.location.state.returnTo }
                } : `/${currentLocale}/registration`}>
              {t('login.signUpHere')}
            </Link>
          </div>
        </form>
      </ReactModal>
    );
  }
}
