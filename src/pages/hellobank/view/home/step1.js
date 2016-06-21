import React, { Component } from 'react';
import { Link } from 'react-router';
import commonStyles from './commonStyles';

const step1styles = {
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: '30px',
    lineHeight: 1.3,
    color: '#cf315b'
  },
  paragraph: {
    fontFamily: 'Roboto-Regular',
    fontSize: '16px',
    lineHeight: 1.5,
    color: '#221f26',
    marginTop: 10
  },
  subtitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: '20px',
    lineHeight: 1.2,
    color: '#333333',
    marginTop: 28
  },
  instructions: {
    marginTop: 13,
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    lineHeight: 1.4,
    color: '#221f26'
  }
};

export default class Step1 extends Component {
  render () {
    return (
      <div>
        <h1 style={step1styles.title}>Wedstrijd: Download Spott en win tot €500</h1>
        <p style={step1styles.paragraph}>Ben je helemaal weg van de outfit die de acteur draagt in je favoriete tv-programma? Of wil je graag weten met welk gerei de bekendste tv-koks kokkerellen?<br />
           Met de Spott-app kan je in één klik deze leuke spullen zélf in huis halen.</p>
        <p style={step1styles.paragraph}>Doe mee aan onze wedstrijd en wie weet, win jij je wishlist tot €500 of één van onze 40 Bol.com-waardebonnen van €100. </p>
        <h2 style={step1styles.subtitle}>Hoe meedoen?</h2>
        <div style={step1styles.instructions}>
          • schrijf je in op de wedstrijdpagina; <br />
          • download de gratis Spott-app, maak een wishlist aan van €500 en maak kans om je wishlist te winnen tot €500 of één van onze 40 Bol.com-waardebonnen van €100;<br />
          • de wedstrijdvraag te beantwoorden. <br /><br />
          Inderdaad: easy! <br />
          Veel succes!
        </div>
        <Link style={commonStyles.linkButton} to='/hellobank/participate'>Naar de wedstrijdpagina</Link>
      </div>
    );
  }
}
