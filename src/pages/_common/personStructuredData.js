import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import localized from '../_common/localized';

@localized
export default class PersonStructuredData extends Component {
  static propTypes = {
    topic: PropTypes.object.isRequired
  }

  render () {
    const { topic } = this.props;
    return (
      <Helmet
        script={[ {
          type: 'application/ld+json',
          innerHTML: `{
            "@context": "http://schema.org",
            "@type": "Person",
            "image": "${topic.person.avatar.url}",
            "name": "${topic.person.name}"
          }`
        } ]} />
    );
  }
}
