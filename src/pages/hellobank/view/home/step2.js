import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router';
import * as actions from '../../actions';
import commonStyles from './commonStyles';
import { authenticationTokenSelector } from '../../../app/selector';
const step2styles = {
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: '30px',
    lineHeight: '1.3',
    color: '#333333'
  },
  question: {
    marginTop: 10,
    fontFamily: 'Roboto-Bold',
    fontSize: '20px',
    lineHeight: 1.2,
    color: '#333333'
  },
  questionColored: {
    color: '#cf315b'
  },
  subtitle: {
    marginTop: 30,
    fontFamily: 'Roboto-Bold',
    fontSize: '20px',
    lineHeight: '1.2',
    color: '#333333'
  },
  firstFieldContainer: {
    float: 'left',
    width: '50%',
    paddingRight: 5
  },
  secondFieldContainer: {
    float: 'left',
    width: '50%',
    paddingLeft: 5
  },
  login: {
    marginTop: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#221f26'
  },
  field: {
    marginTop: 10,
    padding: '9px 12px',
    border: 'solid 1px #d7d7d7',
    backgroundColor: 'white',
    borderRadius: '2px'
  },
  fieldHalf: {
    width: '50%'
  },
  fieldFull: {
    width: '100%'
  },
  link: {
    color: '#221f26'
  },
  rules: {
    opacity: 0.5,
    marginTop: '15px',
    fontFamily: 'Roboto-Regular',
    fontSize: '13px',
    color: '#221f26',
    display: 'block'
  },
  error: {
    color: '#ff0000',
    fontSize: '14px',
    marginTop: 5
  },
  mainError: {
    color: '#ff0000',
    fontSize: '16px',
    fontFamily: 'Roboto-Bold',
    marginTop: 5
  },
  fieldError: {
    border: 'solid 1px red'
  }
};

function parseDate (dateString) {
  const m = dateString.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19\d{2}|20\d{2})$/);
  return m && new Date(`${m[3]}-${m[2]}-${m[1]}`);
}

function isValidBirthdate (dateString) {
  if (dateString) {
    const date = parseDate(dateString);
    return date && date.toString() !== 'Invalid Date';
  }
}

function isValidEmail (email) {
  return email && email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function isValidPositiveNumber (numberString) {
  return numberString && numberString.match(/^[0-9]+$/);
}

function isValidString (string) {
  return string && string.trim().match(/^.+$/);
}

function isValidPassword (password) {
  return password && password.match(/^.{6,}$/);
}

class Step2 extends Component {
  static propTypes = {
    error: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    submitHellobank: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
    this.state = { acceptTerms: false, errors: {}, showError: false };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      this.setState({ // eslint-disable-line react/no-set-state
        errors: {},
        showError: false // Act as if the form wasn't submitted yet.
      });
    }
  }

  validate () {
    const { isAuthenticated } = this.props;
    const errors = {};

    if (!this.state.acceptTerms) {
      errors.acceptTerms = 'Je dient akkoord te gaan met de algemene voorwaarden en het wedstrijd reglement om deel te nemen aan deze wedstrijd.';
    }
    const validBirthdate = isValidBirthdate(this.state.birthdate);
    if (!validBirthdate) {
      errors.birthdate = 'Geef een geldige geboortedatum in bv. 29/01/1991. Je dient 18 jaar oud te zijn om deel te nemen aan deze wedstrijd.';
    }
    const validProductCount = isValidPositiveNumber(this.state.productCount);
    if (!validProductCount) {
      errors.productCount = 'Geef een geldig getal in.';
    }
    if (!isAuthenticated) {
      const validEmail = isValidEmail(this.state.email);
      if (!validEmail) {
        errors.email = 'Geef een geldig e-mailadres in.';
      }
      const validFirstname = isValidString(this.state.firstname);
      if (!validFirstname) {
        errors.firstname = 'Geef een geldige voornaam in.';
      }
      const validLastname = isValidString(this.state.lastname);
      if (!validLastname) {
        errors.lastname = 'Geef een geldige naam in.';
      }
      const validPassword = isValidPassword(this.state.password);
      if (!validPassword) {
        errors.password = 'Geef een wachtwoord in van minstens 6 karakters.';
      }
    }
    this.setState({ // eslint-disable-line react/no-set-state
      ...this.state,
      errors
    });
    // isValid?
    return Object.keys(errors).length === 0;
  }

  onChange (field, e) {
    const errors = { ...this.state.errors };
    Reflect.deleteProperty(errors, field);
    this.setState({ // eslint-disable-line react/no-set-state
      ...this.state,
      errors,
      [field]: field === 'acceptTerms' ? !this.state.acceptTerms : e.target.value
    });
  }

  async onSubmit (e) {
    try {
      const { birthdate, productCount } = this.state;
      e.preventDefault();
      // Validate
      if (!this.validate()) {
        return;
      }
      // Set submitted state
      this.setState({ showError: true }); // eslint-disable-line react/no-set-state
      // Perform submit
      const { name } = await this.props.submitHellobank({
        ...this.state,
        birthdate: parseDate(birthdate),
        productCount: parseInt(productCount, 10)
      });
      // Navigate to confirmed page.
      this.props.router.push(`/hellobank/confirmed?name=${encodeURIComponent(name)}`);
    } catch (error) { console.error(error); }
  }

  render () {
    const { error, isAuthenticated } = this.props;
    console.info(this.props);
    const { errors, showError } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1 style={step2styles.title}>Wedstrijdpagina</h1>
        <p style={step2styles.question}>
          Schiftingsvraag: <span style={step2styles.questionColored}>Hoeveel producten zitten er in de Spott Database op 1 juli 2016 ?</span>
        </p>
        <input
          placeholder='Jouw antwoord in cijfers'
          style={[ step2styles.field, step2styles.fieldFull, errors.productCount && step2styles.fieldError ]}
          type='text'
          onChange={this.onChange.bind(this, 'productCount')}/>
        {errors.productCount && <div style={step2styles.error}>{errors.productCount}</div>}
        <h2 style={step2styles.subtitle}>Jouw gegevens</h2>
        {!isAuthenticated &&
          <div>
            <p style={step2styles.login}>
              Meld je aan voor een Spott account, indien u reeds een Spott-gebruiker bent <Link style={step2styles.link} to={{
                pathname: '/login',
                state: { modal: true, returnTo: this.props.location.pathname }
              }}>
                klik hier
              </Link>
            </p>
            <div style={step2styles.firstFieldContainer}>
              <input
                placeholder='Je voornaam'
                style={[ step2styles.field, step2styles.fieldFull, errors.firstname && step2styles.fieldError ]}
                type='text'
                onChange={this.onChange.bind(this, 'firstname')} />
            </div>
            <div style={step2styles.secondFieldContainer}>
              <input
                placeholder='Je naam'
                style={[ step2styles.field, step2styles.fieldFull, errors.lastname && step2styles.fieldError ]}
                type='text'
                onChange={this.onChange.bind(this, 'lastname')} />
            </div>
            <div style={{ clear: 'both' }}></div>
            {errors.firstname && <div style={step2styles.error}>{errors.firstname}</div>}
            {errors.lastname && <div style={step2styles.error}>{errors.lastname}</div>}
            <input
              placeholder='Je e-mailadres'
              style={[ step2styles.field, step2styles.fieldFull, errors.email && step2styles.fieldError ]}
              type='text'
              onChange={this.onChange.bind(this, 'email')} />
            {errors.email && <div style={step2styles.error}>{errors.email}</div>}
          </div>}

        <input
          placeholder='Je geboortedatum'
          style={[ step2styles.field, step2styles.fieldFull, errors.birthdate && step2styles.fieldError ]}
          type='text'
          onChange={this.onChange.bind(this, 'birthdate')} />
        {errors.birthdate && <div style={step2styles.error}>{errors.birthdate}</div>}
        {!isAuthenticated &&
          <input
            placeholder='Kies een wachtwoord'
            style={[ step2styles.field, step2styles.fieldFull, errors.password && step2styles.fieldError ]}
            type='password'
            onChange={this.onChange.bind(this, 'password')} />}
        {!isAuthenticated && errors.password &&
          <div style={step2styles.error}>{errors.password}</div>}

        <label style={step2styles.rules}>
          <input type='checkbox' onChange={this.onChange.bind(this, 'acceptTerms')}/>&nbsp;
            Ik ga akkoord met de <Link style={step2styles.link} target='_blank' to='/terms'>algemene voorwaarden</Link> en
            het <Link style={step2styles.link} target='_blank' to='/hellobank-reglement'>wedstrijd reglement</Link>.
        </label>
        {errors.acceptTerms && <div style={step2styles.error}>{errors.acceptTerms}</div>}

        {showError && error && <div style={step2styles.mainError}>{error}</div>}

        <button style={commonStyles.button} type='submit'>Voltooien</button>
      </form>
    );
  }
}

export default withRouter(
  connect((state) => {
    console.log(state);
    return {
      error: state.getIn([ 'hellobank', 'hellobankError' ]),
      isAuthenticated: authenticationTokenSelector(state)
    };
  }, (dispatch) => ({
    submitHellobank: bindActionCreators(actions.submitHellobank, dispatch)
  }))(Radium(Step2))
);
