/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconDots, IconStar, IconClose } from '../icons';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Sidebar extends Component {
  static propTypes = {
    product: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onProductClick: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.users = [
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
    const { product, onBackClick, onProductClick } = this.props;

    return (
      <div styleName='sidebar'>
        <div styleName='sidebar-header'>
          <div styleName='sidebar-title'>{product}</div>
          <div styleName='sidebar-close' onClick={onBackClick.bind(this, product)}>
            <i><IconClose/></i>
          </div>
        </div>
        <div styleName='sidebar-image'>
          <img src='http://lorempixel.com/424/424/abstract/3'/>
        </div>
        <div styleName='sidebar-photos'>
          {new Array(7).fill(1).map((item, index) =>
            <div key={`sidebar_phoro_${index}`} style={{ backgroundImage: `url(http://lorempixel.com/80/80/abstract/${index})` }} styleName='sidebar-photo'/>
          )}
        </div>
        <div styleName='sidebar-panel'>
          <Link styleName='sidebar-brand' to='#'>Tom Ford</Link>
          <div styleName='sidebar-title2'>{product}— Blue</div>
          <div styleName='sidebar-cost'>$5,180</div>
          <div styleName='sidebar-options'>
            <select styleName='sidebar-select'>
              <option value='0'>58R</option>
              <option value='0'>62R</option>
            </select>
            <select styleName='sidebar-select'>
              <option value='0'>Blue</option>
              <option value='0'>Black</option>
            </select>
            <div styleName='sidebar-add'>Add to Basket</div>
          </div>
        </div>
        <div styleName='sidebar-footer'>
          <Link styleName='sidebar-stars' to='#'>
            <i><IconStar/></i>
            <span>28</span>
          </Link>
          <div styleName='sidebar-users'>
            {new Array(5).fill(1).map((item, index) =>
              <Link
                key={`sidebar-user_${index}`}
                style={{
                  zIndex: 5 - index,
                  backgroundImage: `url(${this.users[Math.floor(Math.random() * this.users.length)]})`
                }}
                styleName='sidebar-user' to='#'/>
            )}
          </div>
          <Link styleName='sidebar-moar' to='#'>
            <i><IconDots/></i>
          </Link>
        </div>
        <div styleName='sidebar-panel'>
          <div styleName='sidebar-panel-title'>Description</div>
          <div styleName='sidebar-description'>
            An exceptional example of Tom Ford tailoring,<br/>
            this three-piece suit offers distinguished elegance.
          </div>
        </div>
        <div styleName='sidebar-panel'>
          <div styleName='sidebar-panel-title'>Also seen in</div>
          <div styleName='sidebar-seens'>
            {new Array(7).fill(1).map((item, index) =>
              <div
                key={`seen_${index}`}
                style={{ backgroundImage: `url(http://lorempixel.com/80/80/abstract/${index})` }}
                styleName='sidebar-seen'
                onClick={onProductClick.bind(this, `Seen ${index}`)}/>
            )}
          </div>
        </div>
        <div styleName='sidebar-panel'>
          <div styleName='sidebar-panel-title'>Similar Items</div>
          <div styleName='sidebar-similars'>
            {new Array(7).fill(1).map((item, index) =>
              <div
                key={`product_${index}`}
                style={{ backgroundImage: `url(http://lorempixel.com/80/80/abstract/${index})` }}
                styleName='sidebar-similar'
                onClick={onProductClick.bind(this, `Product ${index}`)}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}
