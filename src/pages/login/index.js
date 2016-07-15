import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FacebookLoginButton from './facebookLoginButton';
import * as actions from '../app/actions';
import { authenticationErrorSelector, authenticationIsLoadingSelector }
  from '../app/selector';
import { push as routerPush } from 'react-router-redux';
import localized from '../_common/localized';

const dialogStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 1
  },
  content: {
    // Set width and center horizontally
    margin: 'auto',
    maxWidth: 420,
    width: '90%',
    left: 10,
    right: 10,
    // Internal padding
    padding: 0,
    // Fit height to content, centering vertically
    bottom: 'auto',
    top: '50%',
    transform: 'translateY(-50%)'
  }
};

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
      backgroundColor: '#cf315b',
      border: 'none',
      borderRadius: 2,
      color: 'white',
      fontFamily: 'ProximaNova-Light',
      fontSize: '14px',
      marginTop: 5,
      padding: 10,
      textAlign: 'center',
      width: '100%'
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
      margin: '10px 0'
    },
    textInput: {
      padding: '10px 20px',
      fontSize: '18px',
      width: '100%',
      borderRadius: 2,
      border: '1px #d7d7d7 solid',
      boxShadow: 'transparent 0 0 0',
      margin: '5px 0'
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
        <input disabled={isLoading} style={styles.button} type='submit' value={t('login.submitButton')}/>
      </form>
    );
  }
}

@localized
class Login extends Component {

  static propTypes = {
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
      padding: '32px 16px',
      maxWidth: '420px',
      margin: '0 auto'
    },
    title: {
      color: '#cf315b',
      fontFamily: 'ProximaNova-Bold',
      fontSize: '3rem',
      lineHeight: '48px',
      marginBottom: 45,
      textAlign: 'center'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
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
