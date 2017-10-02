import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import localized from '../_common/localized';

@localized
export default class Breadcrumb extends Component {
  static propTypes = {
    imgUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    topicImg: PropTypes.string,
    topicName: PropTypes.string,
    topicUrl: PropTypes.string
  }

  render () {
    const { imgUrl, name, t, topicImg, topicName, topicUrl } = this.props;
    return (
      <Helmet
        script={[ {
          type: 'application/ld+json',
          innerHTML: `{
             "@context": "http://schema.org",
             "@type": "BreadcrumbList",
             "itemListElement": [{
               "@type": "ListItem",
               "position": 1,
               "item": {
                 "@id": "${window.location.origin}",
                 "name": "${t('seo.title')}"
               }
             },
             ${topicName ? `{
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "${topicUrl}",
                  "name": "${topicName}",
                  "image": "${topicImg}"
                }
             }
             ,` : ''} {
               "@type": "ListItem",
               "position": ${topicName ? 3 : 2},
               "item": {
                 "@id": "${window.location}",
                 "name": "${name}",
                 "image": "${imgUrl}"
               }
             }]
           }`
        } ]} />
    );
  }
}
