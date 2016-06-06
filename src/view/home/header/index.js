import React, { Component } from 'react';

const deviceImage = require('./device.png');
const badgeImageios = require('./appStore.svg');
const badgeImageAndroid = require('./googlePlay.svg');
const heroImage = require('./hero.jpg');

require('./header.scss');

class Header extends Component {

  render () {
    return (
      <section className='header' style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
        <div className='overlay__header'></div>
        <div className='wrapper wrapper--small header__container'>
          <div className='header__content cf'>
            <div className='header__headings'>
              <h1>Spott is looking for 50.000 testers!</h1>
              <h2>Spott shows you the products from the series and movies you watch, and allows you to buy what you see on the screen.<br/>
                  Live on your smartphone.<br/><br/>
                  Download Spott now and give <a href='mailto:info@spott.it'>us</a> your feedback.</h2>
              <div className='header__badge'>
                <a href='https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8'>
                  <img src={badgeImageios}/>
                </a>
                <a href='https://play.google.com/store/apps/details?id=mobi.appiness.spott'>
                  <img src={badgeImageAndroid}/>
                </a>
                <p>
                  <span className='badge__text badge__text--big'>*As of today, limited release in Belgium</span>
                  <span className='badge__text'>*Limited release in Belgium</span>
                </p>
              </div>
            </div>
            <img className='device' src={deviceImage}/>
          </div>
        </div>
      </section>
    );
  }

}

export default Header;
