/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import radium from 'radium';
import { registrationErrorSelector, registrationIsLoadingSelector }
  from '../../app/selector';
import { buttonStyle, colors, fontWeights, makeTextStyle, pinkButtonStyle } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import { submit } from '../actions';
import FacebookRegisterButton from './facebookRegisterButton';

const RadiumLink = radium(Link);
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
@radium
class Form extends Component {

  static propTypes = {
    currentLocale: PropTypes.string,
    error: PropTypes.any,
    isLoading: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
    this.onFieldChange = ::this.onFieldChange;
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordRepeat: '',
      terms: true,
      submitted: false
    };
  }

  validate (values) {
    return ({
      firstname: !values.firstname.trim().match(/^.+$/),
      lastname: !values.lastname.trim().match(/^.+$/),
      email: !values.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      password: !values.password.match(/^.{6,}$/),
      passwordRepeat: !(values.passwordRepeat.match(/^.{6,}$/) && values.password === values.passwordRepeat),
      terms: !this.state.terms
    });
  }

  async onSubmit (e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.setState({ submitted: true });
    const { firstname, lastname, email, password } = this.state;
    const { error } = await this.props.onSubmit({ firstname, lastname, email, password });
    if (error) {
      this.setState({ ...this.state, error });
    } else {
      this.props.onClose();
    }
  }

  onFieldChange (field, e) {
    e.preventDefault();
    this.setState({ [field]: e.target.value });
  }

  onCheckedChange (field, e) {
    this.setState({ [field]: !this.state.terms });
  }

  static styles = {
    button: {
      marginTop: '2.588em',
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
      padding: '0.494em 0.642em',
      fontSize: '1.125em',
      width: '100%',
      borderRadius: 2,
      border: '0.056em #d7d7d7 solid',
      boxShadow: 'transparent 0 0 0',
      margin: '0.278em 0'
    },
    textInputError: {
      border: '0.056em #ff0000 solid'
    },
    left: {
      width: '50%',
      float: 'left',
      paddingRight: '0.31275em'
    },
    right: {
      width: '50%',
      float: 'left',
      paddingLeft: '0.31275em'
    },
    terms: {
      wrapper: {
        paddingTop: '0.889em'
      },
      text: {
        ...makeTextStyle(fontWeights.normal, '14px'),
        color: colors.coolGray,
        paddingLeft: '10px'
      },
      link: {
        ...makeTextStyle(fontWeights.normal, '14px'),
        color: colors.coolGray,
        textDecoration: 'underline'
      },
      error: {
        color: '#ff0000'
      }
    }
  }

  render () {
    const styles = this.constructor.styles;
    const { error: serverError, currentLocale, isLoading, t } = this.props;
    const { error, firstname, lastname, email, password, passwordRepeat, terms, submitted } = this.state;
    const errors = this.validate(this.state);
    return (
      <form onSubmit={this.onSubmit}>
        <div style={styles.line}>&nbsp;</div>
        <div style={styles.left}>
          <input
            autoFocus
            disabled={isLoading}
            name='firstname'
            placeholder={t('register.firstname')}
            style={[ styles.textInput, submitted && errors.firstname && styles.textInputError ]}
            type='text'
            value={firstname}
            onChange={this.onFieldChange.bind(this, 'firstname')} />
        </div>
        <div style={styles.right}>
          <input
            autoFocus
            disabled={isLoading}
            name='lastname'
            placeholder={t('register.lastname')}
            style={[ styles.textInput, submitted && errors.lastname && styles.textInputError ]}
            type='text'
            value={lastname}
            onChange={this.onFieldChange.bind(this, 'lastname')} />
        </div>
        <input
          autoFocus
          disabled={isLoading}
          name='email'
          placeholder={t('register.email')}
          style={[ styles.textInput, submitted && errors.email && styles.textInputError ]}
          type='text'
          value={email}
          onChange={this.onFieldChange.bind(this, 'email')} />
        <input
          disabled={isLoading}
          name='password'
          placeholder={t('register.password')}
          style={[ styles.textInput, submitted && errors.password && styles.textInputError ]}
          type='password'
          value={password}
          onChange={this.onFieldChange.bind(this, 'password')} />
        <input
          disabled={isLoading}
          name='passwordRepeat'
          placeholder={t('register.passwordRepeat')}
          style={[ styles.textInput, submitted && errors.passwordRepeat && styles.textInputError ]}
          type='password'
          value={passwordRepeat}
          onChange={this.onFieldChange.bind(this, 'passwordRepeat')} />
        <div style={styles.terms.wrapper}>
          <input
            checked={terms}
            id='termsCheckbox'
            name='terms'
            style={styles.checkboxInput}
            type='checkbox'
            value='terms'
            onChange={this.onCheckedChange.bind(this, 'terms')} />
          <label htmlFor='termsCheckbox' style={[ styles.terms.text, submitted && errors.terms && styles.terms.error ]}>
          {t('register.agree', {}, (contents, key) => (
            <RadiumLink key={key} style={[ styles.terms.link, submitted && errors.terms && styles.terms.error ]} target='_blank' to={`/${currentLocale}/terms`}>{t('register.terms')}</RadiumLink>
          ))}
          </label>
        </div>
        {error && error._error && <div style={styles.error}>{t(error._error)}</div>}
        {serverError && <div style={styles.error}>{t(serverError)}</div>}
        <input disabled={isLoading} style={{ ...buttonStyle, ...pinkButtonStyle, ...styles.button }} type='submit' value={t('register.submitButton')}/>
      </form>
    );
  }
}

@localized
class Register extends Component {

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
    t: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
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
      padding: '29px 16px 40px 16px',
      maxWidth: '420px',
      margin: '0 auto'
    },
    title: {
      ...makeTextStyle(fontWeights.light, '30px'),
      color: colors.dark,
      marginBottom: '0.5em' // TODO: Remove after adding facebook and line
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
            <h2 style={styles.title}>{t('register.title')}</h2>
             <FacebookRegisterButton registerFacebook={this.registerFacebook} onClose={this.onClose}/>
            <Form {...this.props} onClose={this.onClose} />
            <p style={styles.subText}>{t('register.existingUser')}?&nbsp;<Link style={styles.subTextLink} to={{
              pathname: `/${currentLocale}/login`,
              state: { modal: true, returnTo: this.props.location.state.returnTo } }}>{t('register.logIn')}</Link></p>
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
            <Form {...this.props} type='button' onClose={this.onClose} />
            <p style={styles.subText}>{t('register.existingUser')}?&nbsp;<Link style={styles.subTextLink} to={`/${currentLocale}/login`}>{t('register.logIn')}</Link></p>
          </section>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  error: registrationErrorSelector(state),
  isLoading: registrationIsLoadingSelector(state)
}), (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch),
  onSubmit: bindActionCreators(submit, dispatch)
}))(Register);
