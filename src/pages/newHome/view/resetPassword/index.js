/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import ReactModal from 'react-modal';
import { reduxForm, Field } from 'redux-form/immutable';
import localized from '../../../_common/localized';
import { validateResetUserPasswordForm } from './validateForm';
import { FormInput } from '../form';
import { IconClose } from '../icons';
import * as actions from '../../actions';

const styles = require('./index.scss');

@localized
@connect(null, (dispatch) => ({
  submit: bindActionCreators(actions.resetUserPassword, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@reduxForm({
  form: 'resetUserPasswordForm',
  validate: validateResetUserPasswordForm
})
@CSSModules(styles, { allowMultiple: true })
export default class NewResetPassword extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    error: PropTypes.any,
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
    this.onLoginClick = ::this.onLoginClick;
    this.state = {
      resetSuccessful: false,
      isModalOpen: true
    };
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

  onLoginClick () {
    this.setState({ isModalOpen: false });
    this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { modal: true, returnTo: '/' } });
  }

  async onSubmit (values) {
    try {
      await this.props.submit(values.toJS());
      this.setState({ resetSuccessful: true });
    } catch (e) {
      throw e;
    }
  }

  render () {
    const { handleSubmit, submitFailed, error } = this.props;
    const { resetSuccessful, isModalOpen } = this.state;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen={isModalOpen}
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onClose}>
        <div styleName='modal-close' onClick={this.onClose}><i><IconClose /></i></div>
        {resetSuccessful
          ? <div className='form'>
              <div className='form-title'>
                E-mail has been sent!
              </div>
              <div styleName='reset-text'>
                Your password has been successfully reset.<br/>
                Please check your e-mail for further instructions.
              </div>
              <div className='form-submit' onClick={this.onLoginClick}>
                Log in
              </div>
            </div>
          : <form className='form' onSubmit={handleSubmit(this.onSubmit)}>
              <div className='form-title'>
                Forgot password
              </div>
              <div styleName='reset-text'>
                Don’t panic! We’ll send the password reset instructions to your e-mail address.
              </div>
              <div className='form-row'>
                <label className='form-label form-label-required'>Your e-mail</label>
                <Field
                  component={FormInput}
                  name='email'
                  placeholder='Your e-mail address'
                  submitFailed={submitFailed}
                  type='email'/>
              </div>
              {error && <div className='form-error'>{error}</div>}
              <button className='form-submit' type='submit'>Send</button>
            </form>
        }
      </ReactModal>
    );
  }
}
