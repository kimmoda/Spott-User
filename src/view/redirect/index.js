import React, { Component } from 'react';
// import Navbar from '../Home/Navbar';

const rippleGifImage = require('./ripple.gif');
const googlePlayImage = require('./googlePlay.svg');
const appStoreImage = require('./appStore.svg');
require('./redirect.scss');

const iosUrl = 'https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8';
const androidUrl = 'https://play.google.com/store/apps/details?id=mobi.appiness.spott';

function isIos () {
  return navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i);
}

function isAndroid () {
  return navigator.userAgent.match(/Android/i);
}

class Redirect extends Component {

  componentDidMount () {
    if (isIos()) {
      setTimeout(() => window.location.replace(iosUrl), 2000);
    } else if (isAndroid()) {
      setTimeout(() => window.location.replace(androidUrl), 2000);
    }
  }

  render () {
    return (
      <div className='container'>
        {/* <Navbar hideRightBar={true} /> */}
        <section className='redirect'>
            <div className='wrapper wrapper--small'>
              <img heigth='150' src={rippleGifImage} width='150'/>
              {(isIos() || isAndroid()) &&
                <p id='para__redirect'>Redirecting...</p>}
            </div>
          {!isIos() && !isAndroid() &&
            <div className='badge_container'>
              <a className='redirect__linktostore' href={androidUrl}><img src={googlePlayImage} /></a>
              <a className='redirect__linktostore' href={iosUrl}><img src={appStoreImage} /></a>
            </div>}
        </section>
      </div>
    );
  }

}

export default Redirect;
