/* eslint-disable react/no-set-state */
import React, { Component } from 'react';

export default function hoverable (OriginalComponent) {
  return (
    class Hoverable extends Component {

      constructor (props) {
        super(props);
        this.onMouseEnter = ::this.onMouseEnter;
        this.onMouseLeave = ::this.onMouseLeave;
        this.state = { hovered: false };
      }

      onMouseEnter () {
        this.setState({ hovered: true });
      }

      onMouseLeave () {
        this.setState({ hovered: false });
      }

      render () {
        return (
          <span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <OriginalComponent {...this.props} {...this.state} />
          </span>
        );
      }
    }
  );
}
