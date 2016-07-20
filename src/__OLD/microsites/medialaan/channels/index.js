import React, { Component } from 'react';

const medialaanImage = require('./medialaan.png');
const vtmImage = require('./vtm.png');
const the2beImage = require('./2be.png');
const vitayaImage = require('./vitaya.png');

export default class Channels extends Component {
  render () {
    return (
      <section className='channels'>
        {[ medialaanImage, vtmImage, the2beImage, vitayaImage ].map((image, index) =>
          <div className='channels__logo-container' key={index}>
            <img className='channels__logo' src={image}/>
          </div>
        )}
        <div style={{ clear: 'both' }}/>
      </section>
    );
  }
}
