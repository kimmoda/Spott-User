/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Topic from '../topic';
import Tiles from '../tiles';
import { LOADED } from '../../../../data/statusTypes';

const { cssTileOffsetWidth } = require('../topic/index.scss');

export default class Topics extends Component {
  static propTypes = {
    items: PropTypes.any,
    itemsRelated: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.tileOffsetWidth = parseInt(cssTileOffsetWidth, 10);
  }

  render () {
    const { items, itemsRelated } = this.props;

    return (
      <div>
        {Boolean(items && items.get('_status') === LOADED) &&
        <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={items.get('data').size}>
          {items.get('data').map((item, index) =>
            <Topic item={item} key={`topic_${index}`}/>
          )}
        </Tiles>}

        {Boolean(itemsRelated && itemsRelated.size) &&
        <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={itemsRelated.size}>
          {itemsRelated.map((item, index) =>
            <Topic item={item} key={`topic_${index}`}/>
          )}
        </Tiles>}
      </div>
    );
  }
}
