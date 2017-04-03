import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Topics extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.images = [
      'http://lorempixel.com/160/90/people/1',
      'http://lorempixel.com/160/90/abstract/1',
      'http://lorempixel.com/160/90/abstract/2',
      'http://lorempixel.com/160/90/abstract/3',
      'http://lorempixel.com/160/90/abstract/4',
      'http://lorempixel.com/160/90/abstract/5',
      'http://lorempixel.com/160/90/abstract/6',
      'http://lorempixel.com/160/90/abstract/7',
      'http://lorempixel.com/160/90/abstract/8',
      'http://lorempixel.com/160/90/abstract/9',
      'http://lorempixel.com/160/90/abstract/10'
    ];

    this.titles = [
      'Tom Ford',
      'Harvey Specter',
      'Donna Paulsen',
      'Red Carpet',
      'Suits',
      'Series',
      'Whatever',
      'James Bond',
      'Ray Ban',
      'Dr. House',
      'Under the Dome'
    ];
  }

  render () {
    const { currentLocale } = this.props;

    return (
      <Link styleName='topic' to={`/${currentLocale}/new/topic`}>
        <div
          style={{ backgroundImage: `url(${this.images[Math.floor(Math.random() * this.images.length)]})` }}
          styleName='topic-image'/>
        <div styleName='topic-overlay'/>
        <div styleName='topic-title'>{this.titles[Math.floor(Math.random() * this.titles.length)]}</div>
      </Link>
    );
  }
}
