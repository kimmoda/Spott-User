import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { buttonStyle, colors, fontWeights, makeTextStyle, pinkButtonStyle, Modal } from '../_common/buildingBlocks';
import FacebookLoginButton from './facebookLoginButton';
import * as actions from '../app/actions';
import { authenticationErrorSelector, authenticationIsLoadingSelector }
  from '../app/selector';
import { push as routerPush } from 'react-router-redux';
import localized from '../_common/localized';

@localized
class Form extends Component {

  static propTypes = {
    error: PropTypes.any,
    isLoading: PropTypes.bool,
    location: PropTypes.object.isRequired,
    routerPush: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
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

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || '/');
  }

  async onSubmit (e) {
    e.preventDefault();
    const email = this._email.value;
    const password = this._password.value;
    await this.props.submit({ email, password });
    this.props.onClose();
  }

  static styles = {
    button: {
      marginTop: '0.938em',
      width: '100%',
      padding: '1.1em'
    },
    error: {
      color: '#ff0000',
      fontSize: '16px',
      margin: '5px 0'
    },
    line: {
      height: 1,
      width: '100%',
      backgroundColor: '#e9e9e9',
      margin: '1.25em 0'
    },
    textInput: {
      padding: '0.556em 1.111em',
      fontSize: '1.125em',
      width: '100%',
      borderRadius: 2,
      border: '0.056em #d7d7d7 solid',
      boxShadow: 'transparent 0 0 0',
      margin: '0.278em 0'
    }
  }

  render () {
    const styles = this.constructor.styles;
    const { error, isLoading, t } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div style={styles.line}>&nbsp;</div>
        <input
          autoFocus
          disabled={isLoading}
          name='email'
          placeholder={t('login.email')}
          ref={(c) => { this._email = c; }}
          style={styles.textInput} type='email' />
        <input
          disabled={isLoading}
          name='password'
          placeholder={t('login.password')}
          ref={(c) => { this._password = c; }}
          style={styles.textInput} type='password' />
        {error && <div style={styles.error}>{error}</div>}
        <input disabled={isLoading} style={{ ...buttonStyle, ...pinkButtonStyle, ...styles.button }} type='submit' value={t('login.submitButton')}/>
      </form>
    );
  }
}

@localized
@Radium
class Login extends Component {

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
      color: colors.dark
    },
    subText: {
      ...makeTextStyle(fontWeights.regular, '0.875em'),
      textAlign: 'center',
      color: colors.coolGray,
      paddingTop: '1.75em'
    },
    subTextLink: {
      ...makeTextStyle(fontWeights.bold, '0.875em'),
      color: colors.slateGray,
      textDecoration: 'none'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { currentLocale, t } = this.props;

    // Depending on the context (popup/no popup), another link is used.
    const toLinkRegister = this.props.location.state && this.props.location.state.modal
      ? {
        pathname: `/${currentLocale}/register`,
        state: { modal: true, returnTo: this.props.location.state.returnTo }
      } : `/${currentLocale}/register`;
    const toLinkForgotPassword = this.props.location.state && this.props.location.state.modal
      ? {
        pathname: `/${currentLocale}/resetpassword`,
        state: { modal: true, returnTo: this.props.location.state.returnTo }
      } : `/${currentLocale}/resetpassword`;

    const content =
      <section style={styles.container}>
        <h2 style={styles.title}>{t('login.title')}</h2>
        <FacebookLoginButton onClose={this.onClose} />
        <Form {...this.props} onClose={this.onClose} />
        <p style={styles.subText}>
          {t('login.newUser')}&nbsp;
          <Link style={styles.subTextLink} to={toLinkRegister}>
            {t('login.createAccount')}
          </Link>
        </p>
        <p style={[ styles.subText, { paddingTop: '0.5em' } ]}>
          <Link style={styles.subTextLink} to={toLinkForgotPassword}>
            {t('login.forgotPassword')}
          </Link>
        </p>
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

export default connect((state, ownProps) => ({
  error: authenticationErrorSelector(state),
  isLoading: authenticationIsLoadingSelector(state)
}), (dispatch) => ({
  submit: bindActionCreators(actions.doLogin, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))(Login);
