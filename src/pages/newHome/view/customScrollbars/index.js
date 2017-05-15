/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Scrollbars } from 'react-custom-scrollbars';

const styles = require('./index.scss');

@CSSModules(styles, { allowMultiple: true })
export default class CustomScrollbars extends Component {

  static propTypes = {};

  constructor (props) {
    super(props);

    this.handleMouseEnter = ::this.handleMouseEnter;
    this.handleMouseLeave = ::this.handleMouseLeave;
    this.renderTrackHorizontal = ::this.renderTrackHorizontal;
    this.renderTrackVertical = ::this.renderTrackVertical;
    this.state = {
      hover: false
    };
  }

  handleMouseEnter () {
    this.setState({ hover: true });
  }

  handleMouseLeave () {
    this.setState({ hover: false });
  }

  renderTrackHorizontal ({ style, ...props }) {
    const { hover } = this.state;
    return <div style={{ ...style, opacity: hover ? 1 : 0 }} {...props}/>;
  }

  renderTrackVertical ({ style, ...props }) {
    const { hover } = this.state;
    return <div className={styles['scroll-vertical']} style={{ ...style, opacity: hover ? 1 : 0 }} {...props}/>;
  }

  render () {
    return (
      <Scrollbars
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        styleName='custom-scrollbar'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...this.props}/>
    );
  }
}
