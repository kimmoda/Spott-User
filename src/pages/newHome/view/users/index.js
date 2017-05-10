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
                backgroundImage: item.getIn([ 'avatar', 'url' ]) ? `url(${item.getIn([ 'avatar', 'url' ])}?width=26&height=26)` : `url(${dummyAvatar})`
              }}
              styleName='user'
              title={`${item.get('firstName')} ${item.get('lastName')}`}
              to={`/${currentLocale}/profile/${item.getIn([ 'user', 'uuid' ])}`}/>
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
