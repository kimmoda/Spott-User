import React, { Component } from 'react';
import Navbar from '../_common/navbar';
import Footer from '../_common/footer/';

require('./error404.scss');

export default class Error404 extends Component {
  render () {
    return (
      <div className='container'>
        <div className='container__wrapper'>
          <Navbar />
          <section className='error404'>
            <div className='error404__textwrapper'>
              <h1>Whoops!</h1>
              <p>
                Something went wrong!<br/>
                {"The page you requested doesn't exist."}<br/>
              </p>
              <a href='/'>Return to Spott.it</a>
            </div>
          </section>
          <div className='push'></div>
        </div>
        <Footer />
      </div>
    );
  }
}
