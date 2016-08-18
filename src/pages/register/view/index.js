/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import radium from 'radium';
import { reduxForm, Field } from 'redux-form/immutable';
import { buttonStyle, colors, fontWeights, makeTextStyle, pinkButtonStyle, Modal } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import { submit } from '../actions';
import FacebookRegisterButton from './facebookRegisterButton';
import { registrationFacebookErrorSelector, registrationFacebookIsLoadingSelector }
  from '../../app/selector';
import Select from 'react-select';
import './react-select.css';
import moment from 'moment';

const RadiumLink = radium(Link);

const GENDERS = [ 'MALE', 'FEMALE' ];

// Checkbox Input

const checkboxStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '0.278em 0'
  },
  input: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none'
  },
  marker: {
    backgroundColor: colors.cool,
    border: `1px solid ${colors.cool}`,
    borderRadius: 3,
    cursor: 'pointer',
    display: 'flex',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerText: {
    display: 'block',
    color: colors.whiteGray,
    fontSize: '16px',
    height: '18px',
    transform: 'scaleX(1.3)',
    pointerEvents: 'none'
  },
  label: {
    base: {
      cursor: 'pointer',
      fontWeight: 'normal',
      paddingLeft: '10px',
      paddingBottom: 0,
      position: 'relative',
      alignItems: 'center'
    },
    error: {
      color: '#ff0000'
    }
  }
};
const renderCheckbox = radium((props) => {
  function onClick (e) {
    // Cancel if disabled
    if (props.disabled) {
      return;
    }
    // Trigger change
    const newValue = !props.input.value;
    props.input.onChange(newValue);
  }

  return (
    <div style={checkboxStyles.container}>
      <input
        checked={props.input.value}
        id={props.input.name}
        style={checkboxStyles.input}
        type='checkbox'
        {...props.input} />
      <span style={checkboxStyles.marker} onClick={onClick}>
        {props.input.value && <span style={checkboxStyles.markerText}>✓</span>}
      </span>
      <label
        htmlFor={props.input.name}
        style={[ checkboxStyles.label.base, props.submitFailed && props.meta.touched && props.meta.error && checkboxStyles.label.error ]}>
        {props.text}
      </label>
    </div>
  );
});

// Text box input

const textBoxStyle = {
  error: {
    color: '#ff0000',
    fontSize: '16px',
    margin: '5px 0'
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
  }
};
const renderField = (props) => {
  return (
    <input
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      style={{ ...textBoxStyle.textInput, ...(props.submitFailed && props.meta.touched && props.meta.error && textBoxStyle.textInputError || {}) }}
      type={props.type}
      {...props.input} />
  );
};

// Date input

const renderDateField = (props) => {
  // Determine value
  let value;
  console.log('HAS', props.input.value, props.input.value instanceof Date);
  if (props.input.value instanceof Date) {
    value = moment(props.input.value).format('DD/MM/YYYY');
  } else {
    value = props.input.value;
  }
  // Patch onChange
  function onChange (e) {
    const newValue = e.target.value;
    if (newValue.length === 10 && moment(newValue, 'DD/MM/YYYY').isValid()) {
      return props.input.onChange(moment(newValue, 'DD/MM/YYYY').toDate());
    }
    return props.input.onChange(newValue);
  }
  // Render
  return renderField({
    ...props,
    input: {
      ...props.input,
      value,
      onChange,
      onBlur: onChange
    }
  });
};

// Select input

const WrappedSelect = radium(Select);
const selectInputStyles = {
  error: {
    border: '0.056em #ff0000 solid'
  },
  base: {
  //  padding: '0.494em 0.642em',
    fontSize: '1.125em',
    width: '100%',
    borderRadius: 2,
    border: '0.056em #d7d7d7 solid',
    boxShadow: 'transparent 0 0 0',
    margin: '0.278em 0'
  }
};
const renderSelectField = radium((props) => {
  console.log(props.input.value);
  return (
    <WrappedSelect
      autoFocus={props.autoFocus}
      cache={false} clearable={false} filterOption={() => true} isLoading={false} multi={false}
      options={props.options}
      placeholder={props.placeholder}
      style={[ selectInputStyles.base, props.submitFailed && props.meta.touched && props.meta.error && selectInputStyles.error ]}
      type={props.type}
      {...props.input}
      onBlur={() => props.input.onBlur(props.input.value)}
      onChange={(internalValue) => props.input.onChange(internalValue.value)} />
  );
});

// ----------

function validate (values) {
  const validationErrors = {};
  // Validate
  const firstnameError = !values.get('firstname').trim().match(/^.+$/);
  if (firstnameError) { validationErrors.firstname = 'invalid'; }
  const lastnameError = !values.get('lastname').trim().match(/^.+$/);
  if (lastnameError) { validationErrors.lastname = 'invalid'; }
  const emailError = !values.get('email').match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (emailError) { validationErrors.email = 'invalid'; }
  const genderError = GENDERS.indexOf(values.get('gender')) === -1;
  if (genderError) { validationErrors.gender = 'invalid'; }
  const dateOfBirthError = !(values.get('dateOfBirth') instanceof Date) || !moment(values.get('dateOfBirth')).isBetween('1900-01-01', moment(), 'day', '[)');
  if (dateOfBirthError) { validationErrors.dateOfBirth = 'invalid'; }
  const passwordError = !values.get('password').match(/^.{6,}$/);
  if (passwordError) { validationErrors.password = 'invalid'; }
  const passwordRepeatError = !(values.get('passwordRepeat').match(/^.{6,}$/) && values.get('password') === values.get('passwordRepeat'));
  if (passwordRepeatError) { validationErrors.passwordRepeat = 'invalid'; }
  const termsError = !values.get('terms');
  if (termsError) { validationErrors.terms = 'invalid'; }
  // Done
  return validationErrors;
}

@reduxForm({
  form: 'register',
  validate
})
@localized
@radium
class Form extends Component {

  static propTypes = {
    currentLocale: PropTypes.string,
    error: PropTypes.any,
    facebookError: PropTypes.any,
    facebookIsLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  // The autofocus attribute will only work when the page loads initially.
  // When a popup opens we still need to manually focus the field.
  componentDidMount () {
    setTimeout(() => {
      ReactDOM.findDOMNode(this._firstname).focus();
    }, 0);
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
      paddingTop: '0.889em'
    },
    line: {
      height: 1,
      width: '100%',
      backgroundColor: '#e9e9e9',
      margin: '1.25em 0'
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
      text: {
        ...makeTextStyle(fontWeights.normal, '14px'),
        color: 'inherit'
      },
      link: {
        color: 'inherit',
        textDecoration: 'underline'
      }
    }
  }

  render () {
    const styles = this.constructor.styles;
    const { currentLocale, error, facebookIsLoading, handleSubmit, submitFailed, submitting, t } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div style={styles.line}>&nbsp;</div>
        <div style={styles.left}>
          <Field
            autoFocus
            component={renderField}
            disabled={submitting}
            name='firstname'
            placeholder={t('register.firstname')}
            ref={(c) => { this._firstname = c; }}
            submitFailed={submitFailed} />
        </div>
        <div style={styles.right}>
          <Field
            component={renderField}
            disabled={submitting}
            name='lastname'
            placeholder={t('register.lastname')}
            submitFailed={submitFailed} />
        </div>
        <div style={styles.left}>
          <Field
            component={renderSelectField}
            disabled={submitting}
            name='gender'
            options={GENDERS.map((gender) => ({ value: gender, label: t('register.gender')[gender] }))}
            placeholder={t('register.gender.label')}
            submitFailed={submitFailed} />
        </div>
        <div style={styles.right}>
          <Field
            component={renderDateField}
            disabled={submitting}
            name='dateOfBirth'
            placeholder={t('register.dateOfBirth')}
            submitFailed={submitFailed} />
        </div>
        <Field
          component={renderField}
          disabled={submitting}
          name='email'
          placeholder={t('register.email')}
          submitFailed={submitFailed}
          type='email' />
        <Field
          component={renderField}
          disabled={submitting}
          name='password'
          placeholder={t('register.password')}
          submitFailed={submitFailed}
          type='password' />
        <Field
          component={renderField}
          disabled={submitting}
          name='passwordRepeat'
          placeholder={t('register.passwordRepeat')}
          submitFailed={submitFailed}
          type='password' />
        <Field
          component={renderCheckbox}
          disabled={submitting}
          name='terms'
          submitFailed={submitFailed}
          text={t('register.agree', {}, (contents, key) => (
            <RadiumLink key={key} style={styles.terms.link} target='_blank' to={`/${currentLocale}/terms`}>{t('register.terms')}</RadiumLink>
          ))} />
        {error && typeof error === 'string' && <div style={styles.error}>{t(error)}</div>}
        <input
          disabled={facebookIsLoading || submitting}
          style={{ ...buttonStyle, ...pinkButtonStyle, ...styles.button }}
          type='submit'
          value={t('register.submitButton')}/>
      </form>
    );
  }

}

@localized
class Register extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    facebookError: PropTypes.any,
    facebookIsLoading: PropTypes.bool.isRequired,
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
    this.onFacebookProcessStart = ::this.onFacebookProcessStart;
    this.onSubmit = ::this.onSubmit;
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || '/');
  }

  onFacebookProcessStart () {
    this.form.reset();
  }

  async onSubmit () {
    try {
      await Reflect.apply(this.props.onSubmit, this, arguments);
      this.onClose();
    } catch (e) {
      console.error('Could not submit registration form.', e);
      throw e;
    }
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
    },
    facebookError: {
      color: '#ff0000',
      fontSize: '16px',
      paddingTop: '0.889em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { currentLocale, facebookError, facebookIsLoading, t } = this.props;

    const content =
      <section style={styles.container}>
        <h2 style={styles.title}>{t('register.title')}</h2>
        <FacebookRegisterButton disabled={facebookIsLoading} registerFacebook={this.registerFacebook} onClose={this.onClose} onProcessStart={this.onFacebookProcessStart} />
        {facebookError && typeof facebookError === 'string' && <div style={styles.facebookError}>{t(facebookError)}</div>}
        <Form {...this.props}
          facebookIsLoading={facebookIsLoading}
          initialValues={{
            dateOfBirth: '',
            firstname: '',
            gender: null,
            lastname: '',
            email: '',
            password: '',
            passwordRepeat: '',
            terms: false
          }}
          ref={(x) => { this.form = x; }}
          onSubmit={this.onSubmit} />
        <p style={styles.subText}>{t('register.existingUser')}?&nbsp;
          <Link style={styles.subTextLink} to={this.props.location.state && this.props.location.state.modal
            ? {
              pathname: `/${currentLocale}/login`,
              state: { modal: true, returnTo: this.props.location.state.returnTo }
            } : `/${currentLocale}/login`}>{t('register.logIn')}</Link>
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

export default connect((state) => ({
  facebookError: registrationFacebookErrorSelector(state),
  facebookIsLoading: registrationFacebookIsLoadingSelector(state)
}), (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch),
  onSubmit: bindActionCreators(submit, dispatch)
}))(Register);
