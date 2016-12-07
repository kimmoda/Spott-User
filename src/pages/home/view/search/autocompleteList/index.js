import React, { Component, PropTypes } from 'react';

class AutocompleteList extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  constructor () {
    super();

    this.storeComponentReference = this.storeComponentReference.bind(this);
  }

  storeComponentReference (component) {
    if (component !== null) {
      this.component = component;
    }
  }

  render () {
    const { children } = this.props;

    return (
      <div ref={this.storeComponentReference} {...this.props}>
        { children }
      </div>
    );
  }
}

export default AutocompleteList;
