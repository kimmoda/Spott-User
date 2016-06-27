import React, { Component } from 'react';
import Hero from './hero';
import Products from './products';

export default class Series extends Component {
  render () {
    return (
      <div>
        <Hero />
        <Products />
      </div>
    );
  }
}
