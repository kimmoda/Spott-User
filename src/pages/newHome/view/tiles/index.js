/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import { IconArrow3 } from '../icons';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Tiles extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    tileWidth: PropTypes.number.isRequired,
    tilesCount: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.onMoveLeft = ::this.onMoveLeft;
    this.onMoveRight = ::this.onMoveRight;
    this.state = {
      tileIndex: 0,
      tilesStyle: {
        transform: 'translateX(0px)'
      }
    };
  }

  onMoveLeft () {
    if (this.state.tileIndex > 0) {
      this.setState({
        tilesStyle: {
          transform: `translateX(-${this.props.tileWidth * (this.state.tileIndex - 1)}px)`
        },
        tileIndex: this.state.tileIndex - 1
      });
    }
  }

  onMoveRight () {
    if (Math.round(this.tilesContainer.clientWidth / this.props.tileWidth) + this.state.tileIndex < this.props.tilesCount) {
      this.setState({
        tilesStyle: {
          transform: `translateX(-${this.props.tileWidth * (this.state.tileIndex + 1)}px)`
        },
        tileIndex: this.state.tileIndex + 1
      });
    }
  }

  render () {
    const { tilesCount, tileWidth, children } = this.props;
    const { tilesStyle, tileIndex } = this.state;
    const clientWidth = this.tilesContainer ? this.tilesContainer.clientWidth : 0;
    const tilesEnd = Math.round(clientWidth / tileWidth) + tileIndex;

    return (
      <div ref={(ref) => { this.tilesContainer = ref; }} styleName='tiles-wrapper'>
        <div className={tileIndex ? styles['tiles-btn-active'] : styles['tiles-btn-inactive']} styleName='tiles-btn-left' onClick={this.onMoveLeft}>
          <div styleName='tiles-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
        <div style={tilesStyle} styleName='tiles-list'>
          {children}
        </div>
        <div className={tilesEnd >= tilesCount ? styles['tiles-btn-inactive'] : styles['tiles-btn-active']} styleName='tiles-btn-right' onClick={this.onMoveRight}>
          <div styleName='tiles-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
      </div>
    );
  }
}
