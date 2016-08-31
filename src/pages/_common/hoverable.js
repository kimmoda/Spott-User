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
        if (this.childOnHoverChange) {
          Reflect.apply(this.childOnHoverChange, this, [ true ]);
        }
      }

      onMouseLeave () {
        this.setState({ hovered: false });
        if (this.childOnHoverChange) {
          Reflect.apply(this.childOnHoverChange, this, [ false ]);
        }
      }

      render () {
        return (
          <span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <OriginalComponent ref={(x) => {
              this.childOnHoverChange = x && Reflect.getPrototypeOf(x) && Reflect.getPrototypeOf(x).onHoverChange;
            }} {...this.props} {...this.state} />
          </span>
        );
      }
    }
  );
}
