import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FacebookLoginButton from './facebookLoginButton';
import * as actions from '../../../../actions';
import { authenticationErrorSelector, authenticationIsLoadingSelector, isLoginModalOpenSelector }
  from '../../../../selectors';

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

class Form extends Component {

  static propTypes = {
    error: PropTypes.any,
    isLoading: PropTypes.bool,
    submit: PropTypes.func.isRequired
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

  onSubmit (e) {
    e.preventDefault();
    const email = this._email.value;
    const password = this._password.value;
    this.props.submit({ email, password });
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
    const { error, isLoading } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div style={styles.line}>&nbsp;</div>
        <input autoFocus disabled={isLoading} name='email' placeholder='Your E-mail' ref={(c) => { this._email = c; }}
          style={styles.textInput} type='text' />
        <input disabled={isLoading} name='password' placeholder='Your Password' ref={(c) => { this._password = c; }}
          style={styles.textInput} type='password' />
        <div style={styles.error}>{error}</div>
        <input disabled={isLoading} style={styles.button} type='submit' value='Log In'/>
      </form>
    );
  }
}

class NormalLogin extends Component {

  static propTypes = {
    closeLoginModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    submit: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onRequestClose = ::this.onRequestClose;
  }

  onRequestClose () {
    this.props.closeLoginModal();
  }

  static styles = {
    container: {
      padding: 30
    },
    title: {
      color: '#221f26',
      fontFamily: 'ProximaNova-Light',
      fontSize: '28px',
      marginBottom: 30
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { isOpen } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        style={dialogStyle}
        onRequestClose={this.onRequestClose}>
        <section style={styles.container}>
          <h2 style={styles.title}>Log In</h2>
          <FacebookLoginButton />
          <Form {...this.props} />
        </section>
      </ReactModal>
    );
  }
}

export default connect((state) => ({
  error: authenticationErrorSelector(state),
  isLoading: authenticationIsLoadingSelector(state),
  isOpen: isLoginModalOpenSelector(state)
}), (dispatch) => ({
  closeLoginModal: bindActionCreators(actions.closeLoginModal, dispatch),
  submit: bindActionCreators(actions.doLogin, dispatch)
}))(NormalLogin);
