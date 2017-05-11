/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconDots, IconAvatar } from '../icons';

const styles = require('./index.scss');

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
  }

  render () {
    const { large, maxNum, items, currentLocale } = this.props;

    return (
      <div styleName={large ? 'users-large' : 'users'}>
        <div styleName='users-wrapper'>
          {items.slice(0, maxNum).map((item, index) =>
            <Link
              key={`user_${item.getIn([ 'user', 'uuid' ])}`}
              style={{
                zIndex: 100 - index,
                backgroundImage: item.getIn([ 'avatar', 'url' ]) ? `url(${item.getIn([ 'avatar', 'url' ])}?width=26&height=26)` : null
              }}
              styleName='user'
              title={`${item.get('firstName')} ${item.get('lastName')}`}
              to={`/${currentLocale}/profile/${item.getIn([ 'user', 'uuid' ])}`}>
              {!item.getIn([ 'avatar', 'url' ]) && <IconAvatar/>}
            </Link>
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
