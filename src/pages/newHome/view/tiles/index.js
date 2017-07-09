/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import { IconArrow3 } from '../icons';
import Swipeable from 'react-swipeable';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Tiles extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    tileOffsetWidth: PropTypes.number.isRequired,
    tilesCount: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.onMoveLeft = ::this.onMoveLeft;
    this.onMoveRight = ::this.onMoveRight;
    this.calcTilesInContainer = ::this.calcTilesInContainer;
    this.state = {
      tileIndex: 0,
      translateOffset: 0,
      tilesStyle: {
        transform: 'translateX(0px)'
      }
    };
    this.tilesWidths = [];
    this.elsInContainerCount = 0;
    this.tilesContainerWidth = 0;
  }

  componentDidMount () {
    this.tilesContainerWidth = this.tilesContainer.clientWidth;
    this.calcTilesInContainer();
  }

  componentWillReceiveProps (nextProps) {
    if (this.tilesContainerWidth !== this.tilesContainer.clientWidth) {
      this.tilesContainerWidth = this.tilesContainer.clientWidth;
      this.calcTilesInContainer();
    }
    if (nextProps.children && this.props.children && nextProps.children[0] && this.props.children[0] && nextProps.children[0].key !== this.props.children[0].key) {
      this.setState({
        tileIndex: 0,
        translateOffset: 0,
        tilesStyle: {
          transform: 'translateX(0px)'
        }
      });
      this.calcTilesInContainer();
    }
  }

  calcTilesInContainer () {
    this.tilesWidths = new Array(this.props.tilesCount).fill(1).map((item, index) => {
      return ReactDOM.findDOMNode(this.refs[index]).clientWidth + this.props.tileOffsetWidth;
    });
    let width = this.tilesContainer.clientWidth;
    let elsCount = 0;
    this.tilesWidths.map((elWidth) => {
      width -= elWidth;
      (width / elWidth) >= 0 && elsCount++;
    });
    this.elsInContainerCount = elsCount;
    this.forceUpdate();
  }

  onMoveLeft () {
    if (this.state.tileIndex > 0) {
      const translateOffset = this.state.translateOffset + this.tilesWidths[this.state.tileIndex - 1];
      this.setState({
        translateOffset,
        tilesStyle: {
          transform: `translateX(${translateOffset}px)`
        },
        tileIndex: this.state.tileIndex - 1
      });
    }
  }

  onMoveRight () {
    if (this.elsInContainerCount + this.state.tileIndex < this.props.tilesCount) {
      const translateOffset = this.state.translateOffset - this.tilesWidths[this.state.tileIndex];
      this.setState({
        translateOffset,
        tilesStyle: {
          transform: `translateX(${translateOffset}px)`
        },
        tileIndex: this.state.tileIndex + 1
      });
    }
  }

  render () {
    const { tilesCount, children } = this.props;
    const { tilesStyle, tileIndex } = this.state;

    return (
    <Swipeable
      className={styles['tiles-wrapper']}
      onSwipedLeft={this.onMoveRight}
      onSwipedRight={this.onMoveLeft}>
      <div ref={(ref) => { this.tilesContainer = ref; }} styleName='tiles-wrapper'>
        <div className={tileIndex ? styles['tiles-btn-active'] : styles['tiles-btn-inactive']} styleName='tiles-btn-left' onClick={this.onMoveLeft}>
          <div styleName='tiles-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
        <div style={tilesStyle} styleName='tiles-list'>
          {React.Children.map(children, (element, idx) => {
            return React.cloneElement(element, { ref: idx });
          })}
        </div>
        <div className={this.elsInContainerCount + tileIndex >= tilesCount ? styles['tiles-btn-inactive'] : styles['tiles-btn-active']} styleName='tiles-btn-right' onClick={this.onMoveRight}>
          <div styleName='tiles-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
      </div>
    </Swipeable>
    );
  }
}
