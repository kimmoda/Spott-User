/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import Topic from '../topic';
import Tiles from '../tiles';

const { cssTileWidth } = require('../topic/index.scss');

export default class Topics extends Component {

  constructor (props) {
    super(props);
    this.tileWidth = parseInt(cssTileWidth, 10);
  }

  render () {
    return (
      <Tiles tileWidth={this.tileWidth} tilesCount={10}>
        {new Array(10).fill(1).map((item, index) =>
          <Topic key={`topic_${index}`} ref={(ref) => {
            this.tileRef = ref;
          }}/>
        )}
      </Tiles>
    );
  }
}
