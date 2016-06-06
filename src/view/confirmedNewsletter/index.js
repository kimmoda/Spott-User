import React, { Component } from 'react';
import Navbar from '../_common/navbar/';
import Footer from '../_common/footer/';

const appStoreImage = require('./appStore.svg');
require('./confirm.scss');

class Confirm extends Component {

  render () {
    return (
      <div className='container'>
        <div className='container__wrapper'>
          <Navbar />
          <section className='confirm'>
            <div className='confirm__textwrapper wrapper wrapper--small'>
              <h1>Hurray!</h1>
              <p>Thank you for registering to the Spott newsletter!</p>
              <p>Spott allows you to shop what you see in your favorite show. <a href='https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8' target='_blank'>Click here</a> for getting started, and downloading Spott onto your mobile.<br/><br/></p>
              <p>Enjoy using Spott,</p>
              <p>the Spott team</p>

              <div className='confirm__badge'>
                <a href='https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8' target='_blank'>
                  <img src={appStoreImage} />
                </a>
              </div>
            </div>
          </section>
          <div className='push'></div>
        </div>
        <Footer />
      </div>
    );
  }

}

export default Confirm;
