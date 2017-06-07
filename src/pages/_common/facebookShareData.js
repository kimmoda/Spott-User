import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class FacebookShareData extends Component {
  static propTypes = {
    description: PropTypes.string,
    imageHeight: PropTypes.number,
    imageUrl: PropTypes.string,
    imageWidth: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  render () {
    const { description, imageUrl, imageWidth, imageHeight, title, url } = this.props;
    const meta = [
      { property: 'fb:app_id', content: '418487828343937' },
      { property: 'og:site_name', content: 'Spott' },
      { property: 'og:title', content: title },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url }
    ];
    description && meta.push({ property: 'og:description', content: description });
    imageUrl && meta.push({ property: 'og:image', content: `${imageUrl}?width=414&height=414` });
    imageWidth && meta.push({ property: 'og:image:width', content: imageWidth });
    imageHeight && meta.push({ property: 'og:image:height', content: imageHeight });
    return <Helmet meta={meta} />;
  }
}
