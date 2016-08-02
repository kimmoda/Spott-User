import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { buttonStyle, colors, dialogStyle, fontWeights, makeTextStyle, pinkButtonStyle } from '../_common/buildingBlocks';
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
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
  }

  componentDidMount () {
    setTimeout(() => {
      ReactDOM.findDOMNode(this._email).focus();
    }, 0);
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
        <input autoFocus disabled={isLoading} name='email' placeholder={t('login.email')} ref={(c) => { this._email = c; }}
          style={styles.textInput} type='text' />
        <input disabled={isLoading} name='password' placeholder={t('login.password')} ref={(c) => { this._password = c; }}
          style={styles.textInput} type='password' />
        {error && <div style={styles.error}>{error}</div>}
        <input disabled={isLoading} style={{ ...buttonStyle, ...pinkButtonStyle, ...styles.button }} type='submit' value={t('login.submitButton')}/>
      </form>
    );
  }
}

@localized
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
      padding: '29px 16px',
      maxWidth: '420px',
      margin: '0 auto'
    },
    title: {
      ...makeTextStyle(fontWeights.light, '30px'),
      color: colors.dark
    },
    subText: {
      ...makeTextStyle(fontWeights.regular, '14px'),
      textAlign: 'center',
      color: colors.coolGray,
      paddingTop: '28px'
    },
    subTextLink: {
      ...makeTextStyle(fontWeights.bold, '14px'),
      color: colors.slateGray,
      textDecoration: 'none'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { currentLocale, t } = this.props;
    if (this.props.location.state && this.props.location.state.modal) {
      return (
        <ReactModal
          isOpen
          style={dialogStyle}
          onRequestClose={this.onClose}>
          <section style={styles.container}>
            <h2 style={styles.title}>{t('login.title')}</h2>
            <FacebookLoginButton onClose={this.onClose} />
            <Form {...this.props} onClose={this.onClose} />
            <p style={styles.subText}>{t('login.newUser')}&nbsp;<Link style={styles.subTextLink} to={{
              pathname: `/${currentLocale}/register`,
              state: { modal: true, returnTo: this.props.location.state.returnTo } }}>{t('login.createAccount')}</Link></p>
          </section>
        </ReactModal>
      );
    }
    return (
      <div>
        <div currentPathname={this.props.location.pathname}>
          <section style={styles.container}>
            <h2 style={styles.title}>{t('login.title')}</h2>
            <FacebookLoginButton onClose={this.onClose} />
            <Form {...this.props} type='button' />
            <p style={styles.subText}>{t('login.newUser')}?&nbsp;<Link style={styles.subTextLink} to={`/${currentLocale}/register`}>{t('login.createAccount')}</Link></p>
          </section>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  error: authenticationErrorSelector(state),
  isLoading: authenticationIsLoadingSelector(state)
}), (dispatch) => ({
  submit: bindActionCreators(actions.doLogin, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))(Login);
