import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { submit as apiSubmit } from '../api';
import { apiBaseUrlSelector } from '../../app/selector';

// Header
// //////

const headerStyles = {
  container: {
    backgroundColor: '#eeeeee',
    paddingLeft: 16,
    paddingRight: 16
  },
  logo: {
    float: 'right',
    height: 84,
    marginLeft: 14, // Should be paddingRight on title, but impossible due to float
    width: 75
  },
  title: {
    color: '#0054a6',
    fontFamily: 'OmnesPro-Semibold',
    fontSize: 20,
    lineHeight: 1.2,
    paddingBottom: 16,
    paddingTop: 20
  }
};
const carrefourLogoImage = require('./carrefourLogo.png');
const Header = () => (
  <header style={headerStyles.container}>
    <img src={carrefourLogoImage} style={headerStyles.logo} />
    <p style={headerStyles.title}>Ontvang je voucher voor een gratis Laptop draagtas</p>
  </header>
);

// laptop section
// //////////////

const laptopStyles = {
  container: {
    backgroundColor: '#60b3dc',
    paddingBottom: 23,
    paddingTop: 33
  },
  image: {
    paddingLeft: 35,
    paddingRight: 23,
    width: '100%'
  },
  oldPrice: {
    container: {
      fontFamily: 'OmnesPro-Light',
      fontSize: '15px',
      paddingRight: 12,
      paddingTop: 6,
      textAlign: 'right'
    },
    line: {
      color: '#d8232a',
      textDecoration: 'line-through'
    },
    text: {
      color: '#000'
    }
  },
  bottom: {
    container: {
      paddingLeft: 15,
      paddingRight: 12,
      paddingTop: 6
    },
    description: {
      fontFamily: 'OmnesPro-Regular',
      fontSize: '15px',
      lineHeight: 1.3
    },
    price: {
      float: 'right',
      fontFamily: 'OmnesPro-Light',
      fontSize: '40px'
    }
  }
};
const laptopImage = require('./laptop.png');
const LaptopSection = () => (
  <section style={laptopStyles.container}>
    <img alt='Draagbare PC Lenovo - IDEAPAD 100-15IBD' src={laptopImage} style={laptopStyles.image} />
    <p style={laptopStyles.oldPrice.container}>
      <span style={laptopStyles.oldPrice.line}><span style={laptopStyles.oldPrice.text}>€ 499,00</span></span>
    </p>
    <div style={laptopStyles.bottom.container}>
      <p style={laptopStyles.bottom.price}>€ 399,00</p>
      <p style={laptopStyles.bottom.description}>Draagbare PC Lenovo IDEAPAD&nbsp;100&#8209;15IBD</p>
      <div style={{ clear: 'both' }}></div>
    </div>
  </section>
);

// Bag section
// ///////////

const bagStyles = {
  container: {
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  image: {
    paddingLeft: 33,
    paddingRight: 32,
    paddingTop: 43,
    width: '100%'
  },
  free: {
    color: '#d8232a',
    fontFamily: 'OmnesPro-Bold',
    fontSize: 30,
    left: 16,
    position: 'absolute',
    textTransform: 'uppercase',
    top: 25
  },
  description: {
    fontFamily: 'OmnesPro-Light',
    fontSize: 15,
    paddingBottom: 26,
    paddingLeft: 50,
    paddingRight: 12,
    paddingTop: 6,
    textAlign: 'right'
  }
};
const laptopBagImage = require('./laptopBag.png');
const BagSection = () => (
  <section style={bagStyles.container}>
    <img alt='Draagtas voor draagbare pc 15,6"' src={laptopBagImage} style={bagStyles.image} />
    <p style={bagStyles.free}>Gratis</p>
    <p style={bagStyles.description}>Draagtas voor draagbare pc <br />15,6"</p>
  </section>
);

// Form section
// ////////////

const formStyles = {
  container: {
    marginTop: 40
  },
  title: {
    color: '#0054a6',
    fontFamily: 'OmnesPro-Medium',
    fontSize: '20px'
  },
  email: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    display: 'block',
    fontFamily: 'OmnesPro-Regular',
    fontSize: '16px',
    marginTop: 18,
    padding: 12,
    width: '100%'
  },
  button: {
    backgroundColor: '#0054a6',
    border: 0,
    borderRadius: 4,
    color: '#fff',
    display: 'block',
    fontFamily: 'OmnesPro-Semibold',
    fontSize: '16px',
    marginTop: 10,
    padding: 12,
    textAlign: 'center',
    width: '100%'
  },
  error: {
    border: '1px solid red'
  },
  errorText: {
    fontFamily: 'OmnesPro-Regular',
    fontSize: '16px',
    paddingTop: 4,
    lineHeight: 1.2,
    color: 'red',
    paddingBottom: 6
  }
};
const FormSection = Radium((props) => (
  <section style={formStyles.container}>
    <p style={formStyles.title}>Stuur mij de voucher via mail</p>
    <input placeholder='Mijn email adres' style={[ formStyles.email, props.error && formStyles.error ]} type='text' value={props.email} onChange={props.onEmailChange}/>
    {props.error && <p style={formStyles.errorText}>{props.error}</p>}
    <button style={formStyles.button} type='submit' onClick={props.onSubmit}>Verstuur</button>
  </section>
));

// Form confirmed section
// //////////////////////

const formConfirmedStyles = {
  container: {
    marginTop: 56,
    textAlign: 'center'
  },
  check: {
    height: 35,
    width: 35
  },
  title: {
    color: '#0054a6',
    fontFamily: 'OmnesPro-Medium',
    fontSize: '20px',
    marginTop: 15
  },
  text: {
    fontFamily: 'OmnesPro-Regular',
    fontSize: '16px',
    lineHeight: 1.5,
    paddingBottom: 17
  }
};
const checkImage = require('./check.svg');
const FormConfirmedSection = (props) => (
  <section style={formConfirmedStyles.container}>
    <img src={checkImage} style={formConfirmedStyles.check} />
    <p style={formConfirmedStyles.title}>Voucher verzonden naar</p>
    <p style={formConfirmedStyles.text}>{props.email}</p>
  </section>
);
FormConfirmedSection.propTypes = {
  email: PropTypes.string.isRequired
};

// Legal section
// /////////////

const legalStyles = {
  container: {
    color: '#777777',
    fontFamily: 'OmnesPro-Regular',
    fontSize: '12px',
    lineHeight: 1.5,
    marginTop: 34
  }
};
const LegalSection = () => (
  <section style={legalStyles.container}>
    <p>Aanbieding enkel geldig in de hypermarkter Carrefour van België van 31/05 t.e.m. 07/06/2016.</p>
  </section>
);

// Footer
// //////

const footerStyles = {
  container: {
    textAlign: 'right'
  },
  slogan: {
    height: 15,
    marginTop: 48,
    marginBottom: 21,
    marginRight: 16
  }
};
const carrefourSloganImage = require('./carrefourSlogan.png');
const Footer = () => (
  <footer style={footerStyles.container}>
    <img src={carrefourSloganImage} style={footerStyles.slogan} />
  </footer>
);

// Page Component
// //////////////

const styles = {
  container: {
    width: '100%'
  },
  main: {
    backgroundColor: '#eeeeee',
    padding: 16
  }
};

export default class Carrefour extends Component {

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        email: PropTypes.string
      })
    }).isRequired
  }

  static contextTypes = {
    store: PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
    // Bind events
    this.onEmailChange = ::this.onEmailChange;
    this.onSubmit = ::this.onSubmit;
    // Prefill email if present
    const { query } = this.props.location;
    this.state = {
      email: (query && query.email) || '',
      confirmed: false
    };
  }

  onEmailChange (e) {
    e.preventDefault();
    this.setState({ email: e.target.value }); // eslint-disable-line react/no-set-state
  }

  async onSubmit (e) {
    e.preventDefault();
    // Validation error?
    if (this.state.email === '') {
      return this.setState({ error: 'Geef een geldig e-mailadres in.' }); // eslint-disable-line react/no-set-state
    }
    try {
      // Perform request
      await apiSubmit(apiBaseUrlSelector(this.context.store.getState()), { email: this.state.email });
      // Done!
      this.setState({ confirmed: true }); // eslint-disable-line react/no-set-state
    } catch (error) {
      // Mail already sent
      if (error.body &&
          error.body.childMessages &&
          error.body.childMessages[0] &&
          error.body.childMessages[0].message === 'mail reeds verstuurd naar het opgegeven adres') {
        return this.setState({ error: 'Er werd reeds een e-mail verstuurd naar het opgegeven e-mailadres.' }); // eslint-disable-line react/no-set-state
      }
      // Unknown error
      this.setState({ error: 'Een onbekende fout trad op. Probeer opnieuw.' }); // eslint-disable-line react/no-set-state
      console.error(error);
    }
  }

  render () {
    const { email, error, confirmed } = this.state;
    return (
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
          <LaptopSection />
          <BagSection />
          {!confirmed &&
            <FormSection email={email} error={error} onEmailChange={this.onEmailChange} onSubmit={this.onSubmit} />}
          {confirmed &&
            <FormConfirmedSection email={email} />}
          <LegalSection />
        </main>
        <Footer />
      </div>
    );
  }

}
