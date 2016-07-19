import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class FacebookShareData extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  render () {
    const { description, imageUrls, title, url } = this.props;
    return (
      <Helmet
        meta={[
          { property: 'og:description', content: description },
          ...(imageUrls ? imageUrls.map((image) => ({ property: 'og:image', content: `${image}?width=414&height=414` })) : []),
          { property: 'og:site_name', content: 'Spott' },
          { property: 'og:title', content: title },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: url }
        ]} />
    );
  }
}
