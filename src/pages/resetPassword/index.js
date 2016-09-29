import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buttonStyle, colors, fontWeights, makeTextStyle, pinkButtonStyle, Modal } from '../_common/buildingBlocks';
import * as actions from './actions';
import selector from './selector';
import { push as routerPush } from 'react-router-redux';
import localized from '../_common/localized';

@localized
class Form extends Component {

  static propTypes = {
    error: PropTypes.any,
    isLoading: PropTypes.bool,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
  }

  // The autofocus attribute will only work when the page loads initially.
  // When a popup opens we still need to manually focus the field.
  componentDidMount () {
    setTimeout(() => {
      ReactDOM.findDOMNode(this._email).focus();
    }, 0);
  }

  async onSubmit (e) {
    e.preventDefault();
    const email = this._email.value;
    await this.props.submit({ email });
    this.props.onSuccess();
  }

  static styles = {
    button: {
      marginBottom: '0.625em',
      marginTop: '2.5em',
      width: '100%',
      padding: '1.1em'
    },
    error: {
      color: '#ff0000',
      fontSize: '16px',
      margin: '5px 0'
    },
    textInput: {
      padding: '0.556em 1.111em',
      fontSize: '1.125em',
      width: '100%',
      borderRadius: 2,
      border: '0.056em #d7d7d7 solid',
      boxShadow: 'transparent 0 0 0',
      margin: '0.278em 0'
    },
    label: {
      ...makeTextStyle(fontWeights.bold, '0.938em'),
      color: colors.slateGray,
      display: 'block',
      paddingBottom: '0.625em'
    }
  }

  render () {
    const styles = this.constructor.styles;
    const { error, isLoading, t } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor='email' style={styles.label}>{t('resetPassword.emailLabel')}</label>
        <input
          autoFocus
          disabled={isLoading}
          id='email'
          name='email'
          placeholder={t('resetPassword.email')}
          ref={(c) => { this._email = c; }}
          style={styles.textInput} type='email' />
        {typeof error === 'string' && <div style={styles.error}>{t(error)}</div>}
        <input disabled={isLoading} style={{ ...buttonStyle, ...pinkButtonStyle, ...styles.button }} type='submit' value={t('resetPassword.submitButton')}/>
      </form>
    );
  }
}

@connect(selector, (dispatch) => ({
  submit: bindActionCreators(actions.resetPassword, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@localized
export default class ResetPassword extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    routerPush: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onClose = ::this.onClose;
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || '/');
  }

  static styles = {
    container: {
      padding: '1.813em 1.875em',
      maxWidth: '26.25em',
      margin: '0 auto'
    },
    title: {
      ...makeTextStyle(fontWeights.light, '1.875em'),
      color: colors.dark,
      paddingBottom: '0.9333em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { currentLocale, t } = this.props;

    const content =
      <section style={styles.container}>
        <h2 style={styles.title}>{t('resetPassword.title')}</h2>
        <Form {...this.props} onClose={this.onClose} onSuccess={() => {
          this.props.routerPush(this.props.location.state && this.props.location.state.modal
            ? {
              pathname: `/${currentLocale}/resetpassword/success`,
              state: { modal: true, returnTo: this.props.location.state.returnTo }
            } : `/${currentLocale}/resetpassword/success`
          );
        }} />
      </section>;

    if (this.props.location.state && this.props.location.state.modal) {
      return (
        <Modal
          isOpen
          onClose={this.onClose}>
          {content}
        </Modal>
      );
    }
    return content;
  }
}
