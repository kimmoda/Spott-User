/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconDots } from '../icons';

const styles = require('./index.scss');
const dummyAvatar = require('./dummyAvatar.svg');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Users extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    items: PropTypes.any.isRequired,
    large: PropTypes.bool,
    maxNum: PropTypes.number.isRequired,
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
    const { large, maxNum, items } = this.props;

    return (
      <div styleName={large ? 'users-large' : 'users'}>
        <div styleName='users-wrapper'>
          {items.slice(0, maxNum).map((item, index) =>
            <Link
              key={`user_${item.getIn([ 'user', 'uuid' ])}`}
              style={{
                zIndex: 100 - index,
                backgroundImage: item.getIn([ 'avatar', 'url' ]) ? `url(${item.getIn([ 'avatar', 'url' ])}?width=26&height=26)` : `url(${dummyAvatar})`
              }}
              styleName='user'
              title={`${item.get('firstName')} ${item.get('lastName')}`}
              to='#'/>
          )}
        </div>
        {items.size >= maxNum &&
        <Link styleName='users-moar' to='#'>
          <i><IconDots/></i>
        </Link>}
      </div>
    );
  }
}
