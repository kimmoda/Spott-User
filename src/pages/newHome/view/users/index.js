/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconDots } from '../icons';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Users extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    large: PropTypes.bool,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.images = [
      'http://lorempixel.com/26/26/people/1',
      'http://lorempixel.com/26/26/abstract/1',
      'http://lorempixel.com/26/26/abstract/2',
      'http://lorempixel.com/26/26/abstract/3',
      'http://lorempixel.com/26/26/abstract/4',
      'http://lorempixel.com/26/26/abstract/5',
      'http://lorempixel.com/26/26/abstract/6',
      'http://lorempixel.com/26/26/abstract/7',
      'http://lorempixel.com/26/26/abstract/8',
      'http://lorempixel.com/26/26/abstract/9',
      'http://lorempixel.com/26/26/abstract/10'
    ];
  }

  render () {
    const { large } = this.props;
    const rndNum = (Math.floor((Math.random() * 20) + 2));
    const num = rndNum <= 6 ? rndNum : 6;
    const largeNum = rndNum <= 18 ? rndNum : 18;

    return (
      <div styleName={large ? 'users-large' : 'users'}>
        <div styleName='users-wrapper'>
          {new Array(large ? largeNum : num).fill(1).map((item, index) =>
            <Link
              key={`user_${index}`}
              style={{
                zIndex: 100 - index,
                backgroundImage: `url(${this.images[Math.floor(Math.random() * this.images.length)]})`
              }}
              styleName='user' to='#'/>
          )}
        </div>
        {((rndNum >= 6 && !large) || (rndNum >= 18 && large)) &&
        <Link styleName='users-moar' to='#'>
          <i><IconDots/></i>
        </Link>}
      </div>
    );
  }
}
