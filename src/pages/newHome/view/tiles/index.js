/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Topic from '../topic';
import { IconArrow3 } from '../icons';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Tiles extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    tileWidth: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.onMoveLeft = ::this.onMoveLeft;
    this.onMoveRight = ::this.onMoveRight;
    this.state = {
      tileIndex: 0,
      tilesCount: 10,
      tilesStyle: {
        transform: 'translateX(0px)'
      }
    };
    this.tileWidth = parseInt(this.props.tileWidth, 10);
  }

  onMoveLeft () {
    if (this.state.tileIndex > 0) {
      this.setState({
        tilesStyle: {
          transform: `translateX(-${this.tileWidth * (this.state.tileIndex - 1)}px)`
        },
        tileIndex: this.state.tileIndex - 1
      });
    }
  }

  onMoveRight () {
    if (Math.round(this.tilesContainer.clientWidth / this.tileWidth) + this.state.tileIndex < this.state.tilesCount) {
      this.setState({
        tilesStyle: {
          transform: `translateX(-${this.tileWidth * (this.state.tileIndex + 1)}px)`
        },
        tileIndex: this.state.tileIndex + 1
      });
    }
  }

  render () {
    return (
      <div ref={(ref) => { this.tilesContainer = ref; }} styleName='tiles-wrapper'>
        <div styleName='topics-left' onClick={this.onMoveLeft}>
          <div styleName='topics-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
        <div style={this.state.tilesStyle} styleName='tiles-list'>
          {new Array(10).fill(1).map((item, index) =>
            <Topic key={`topic_${index}`} ref={(ref) => { this.tileRef = ref; }}/>
          )}
        </div>
        <div styleName='topics-right' onClick={this.onMoveRight}>
          <div styleName='topics-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
      </div>
    );
  }
}
