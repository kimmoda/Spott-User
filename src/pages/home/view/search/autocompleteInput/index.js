import React, { Component } from 'react';
import Radium from 'radium';

@Radium
class AutocompleteInput extends Component {

  render () {
    return (
      <input {...this.props} />
    );
  }
}

export default AutocompleteInput;
