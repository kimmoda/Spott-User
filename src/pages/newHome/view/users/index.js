/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';

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
    return (
      <div styleName='users'>
        {new Array(5).fill(1).map((item, index) =>
          <Link
            key={`user_${index}`}
            style={{
              zIndex: 5 - index,
              backgroundImage: `url(${this.images[Math.floor(Math.random() * this.images.length)]})`
            }}
            styleName={large ? 'user-large' : 'user'} to='#'/>
        )}
      </div>
    );
  }
}
