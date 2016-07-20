import React, { Component } from 'react';
import { Link } from 'react-router';

require('./medialaanNavbar.scss');

const spottImage = require('./spott.png');
const medialaanImage = require('./medialaan.jpg');

export default class MedialaanNavbar extends Component {

  render () {
    return (
      <nav className='medialaan-nav'>
        <div className='wrapper'>
          <div className='navbar__logo__centered centered--2 navbar__left'>
            <Link to='/'>
              <img src={spottImage} />
            </Link>
            <a href='http://www.medialaan.be' target='_blank'>
              <img src={medialaanImage} />
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
