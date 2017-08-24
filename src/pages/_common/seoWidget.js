import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class SEOWidget extends Component {
  static propTypes = {
    description: PropTypes.string,
    title: PropTypes.string.isRequired
  }

  render () {
    const { description, title } = this.props;
    return (
      <Helmet meta={[ { name: 'description', content: description } ]} title={title} />
    );
  }
}
