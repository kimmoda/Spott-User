import { colors } from './buildingBlocks';
import React, { Component } from 'react';
import Radium from 'radium';

const spinnerKeyframes = Radium.keyframes({
  '0%': {
    transform: 'scale(0)',
    opacity: 0.5
  },
  '100%': {
    transform: 'scale(1.0)',
    opacity: 0
  }
}, 'spinner');

const styles = {
  container: {
    width: '40px',
    height: '40px',
    margin: '40px auto',
    backgroundColor: colors.coolGray,
    borderRadius: '100%',
    animation: 'x 1s ease-in-out infinite',
    animationName: spinnerKeyframes
  }
}

@Radium
export default class Spinner extends Component {
  render () {
    return (
      <div style={styles.container}></div>
    );
  }
}
