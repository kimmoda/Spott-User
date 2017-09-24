import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class TwitterShareData extends Component {
  static propTypes = {
    description: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  render () {
    const { description, imageUrl, title } = this.props;
    const meta = [
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@SpottBE_nl' },
      { property: 'twitter:title', content: title },
      { property: 'twitter:image', content: `${imageUrl}?width=500&height=1000` }
    ];
    description && meta.push({ property: 'twitter:description', content: description });
    return <Helmet meta={meta} />;
  }
}
