import React, { Component, PropTypes } from 'react';

const appStoreImage = require('./appStore.svg');
const googlePlayImage = require('./googlePlay.svg');

const step3styles = {
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    lineHeight: 1.2,
    color: '#333333'
  },
  paragraph: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 1.5,
    color: '#221f26'
  },
  buttons: {
    marginTop: 50
  },
  button: {
    height: '45px',
    display: 'inline-block',
    marginRight: 12
  }
};

export default class Step3 extends Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        name: PropTypes.string
      })
    }).isRequired
  }

  render () {
    const { query } = this.props.location;
    const name = (query && query.name);
    return (
      <div>
        <h1 style={step3styles.title}>Bedankt voor je deelname{name ? `, ${name}` : ''}!</h1>
        <p style={step3styles.paragraph}>Je hebt zonet onze wedstrijdvraag beantwoord. Check!</p>
        <p style={step3styles.paragraph}>Nu alleen nog simpelweg de gratis Spott-app downloaden via onderstaande links en een wishlist samenstellen van €500 en je maakt kans om je wishlist of één van de 40 Bol.com-waardebonnen van €100 te winnen!</p>
        <div style={step3styles.buttons}>
          <a href='https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8'>
            <img src={appStoreImage} style={step3styles.button} />
          </a>
          <a href='https://play.google.com/store/apps/details?id=mobi.appiness.spott'>
            <img src={googlePlayImage} style={step3styles.button} />
          </a>
        </div>
      </div>
    );
  }
}
