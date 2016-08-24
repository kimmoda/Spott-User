import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class FacebookShareData extends Component {
  static propTypes = {
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  render () {
    const { description, imageUrl, title, url } = this.props;
    const meta = [
      { property: 'og:site_name', content: 'Spott' },
      { property: 'og:title', content: title },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url }
    ];
    description && meta.push({ property: 'og:description', content: description });
    imageUrl && meta.push({ property: 'og:image', content: `${imageUrl}?width=414&height=414` });
    return <Helmet meta={meta} />;
  }
}
