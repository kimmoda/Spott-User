import React, { Component } from 'react';

require('./logos.scss');

export default class Logos extends Component {

  constructor (props) {
    super(props);
    this.images = [
      require('./rtl.png'),
      require('./vrt.png'),
      require('./medialaan.png'),
      require('./proximus.png')
    ];
  }

  render () {
    return (
      <section className='logos'>
        <h2>Spott has been made possible by:</h2>
        {this.images.map((imageSrc, i) => (
          <div className='logos__logo-container' key={i}>
            <img className='logos__logo' src={imageSrc}/>
          </div>
        ))}
        <div style={{ clear: 'both' }}/>
      </section>
    );
  }

}
