import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { buttonStyle, colors, fontWeights, makeTextStyle, pinkButtonStyle } from '../_common/buildingBlocks';
import localized from '../_common/localized';
import FacebookRegisterButton from './facebookRegisterButton';

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
        <input autoFocus disabled={isLoading} name='firstname' placeholder={t('register.firstname')}
          style={styles.textInput} type='text' />
        <input autoFocus disabled={isLoading} name='lastname' placeholder={t('register.lastname')}
          style={styles.textInput} type='text' />
        <input autoFocus disabled={isLoading} name='email' placeholder={t('register.email')}
          style={styles.textInput} type='text' />
        <input disabled={isLoading} name='password' placeholder={t('register.password')}
          style={styles.textInput} type='password' />
        <input disabled={isLoading} name='password' placeholder={t('register.passwordRepeat')}
          style={styles.textInput} type='password' />
        {error && <div style={styles.error}>{error}</div>}
        <input disabled={isLoading} style={{ ...buttonStyle, ...pinkButtonStyle, ...styles.button }} type='submit' value={t('register.submitButton')}/>
      </form>
    );
  }
}

@localized
class Register extends Component {

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
      padding: '29px 16px',
      maxWidth: '420px',
      margin: '0 auto'
    },
    title: {
      ...makeTextStyle(fontWeights.light, '30px'),
      color: colors.dark
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    if (this.props.location.state && this.props.location.state.modal) {
      console.log('in modal');
      return (
        <ReactModal
          isOpen
          style={dialogStyle}
          onRequestClose={this.onClose}>
          <section style={styles.container}>
            <h2 style={styles.title}>{t('register.title')}</h2>
            <FacebookRegisterButton onClose={this.onClose}/>
            <Form {...this.props} onClose={this.onClose} />
          </section>
        </ReactModal>
      );
    }
    return (
      <div>
        <div currentPathname={this.props.location.pathname}>
          <section style={styles.container}>
            <h2 style={styles.title}>{t('register.title')}</h2>
            <FacebookRegisterButton onClose={this.onClose}/>
            <Form {...this.props} type='button' />
          </section>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
}), (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch)
}))(Register);
