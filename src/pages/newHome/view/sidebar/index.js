/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconForward, IconStar, IconClose } from '../icons';
import Users from '../users';
import Tiles from '../tiles';
import { formatPrice } from '../../../_common/buildingBlocks';

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
    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);

    this.state = {
      currentImage: null
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.product) {
      this.setState({
        currentImage: nextProps.product.getIn([ 'images', '0', 'url' ])
      });
    }
  }

  onImageClick (url) {
    this.setState({
      currentImage: url
    });
  }

  render () {
    const { product, onBackClick, onProductClick } = this.props;

    return (
      <div styleName='sidebar'>
        <div styleName='sidebar-header'>
          <div styleName='sidebar-title'>{product.get('shortName')}</div>
          <div styleName='sidebar-close' onClick={onBackClick.bind(this, product.get('uuid'))}>
            <i><IconClose/></i>
          </div>
        </div>
        <div styleName='sidebar-image'>
          <img src={`${this.state.currentImage}?width=424&height=424`}/>
        </div>
        <div styleName='sidebar-photos'>
          {product.get('images') && product.get('images').map((item, index) =>
            <div
              className={this.state.currentImage === item.get('url') && styles['sidebar-photo-active']}
              key={`sidebar_photo_${index}`}
              style={{ backgroundImage: `url('${item.get('url')}?width=80&height=80'` }}
              styleName='sidebar-photo'
              onClick={this.onImageClick.bind(this, item.get('url'))}/>
          )}
        </div>
        <div styleName='sidebar-panel'>
          <Link styleName='sidebar-brand' to='#'>{product.getIn([ 'brand', 'name' ])}</Link>
          <div styleName='sidebar-title2'>{product.get('longName')}</div>
          <div styleName='sidebar-cost'>{formatPrice(product.getIn([ 'offerings', '0', 'price' ]))}</div>
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
            <span>{product.get('likeCount')}</span>
          </Link>
          <div styleName='sidebar-users'>
            <Users large maxNum={8} />
          </div>
          <Link styleName='sidebar-moar' to='#'>
            <i><IconForward/></i>
          </Link>
        </div>
        <div styleName='sidebar-panel'>
          <div styleName='sidebar-panel-title'>Description</div>
          <div styleName='sidebar-description'>
            {product.get('description')}
          </div>
        </div>
        <div styleName='sidebar-panel'>
          <div styleName='sidebar-panel-title'>Also seen in</div>
          <div styleName='sidebar-seens'>
            <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={10}>
              {new Array(10).fill(1).map((item, index) =>
                <div
                  key={`seen_${index}`}
                  style={{ backgroundImage: `url(http://lorempixel.com/80/80/abstract/${index})`, minWidth: Math.floor(Math.random() * 120) + 60 }}
                  styleName='sidebar-seen'
                  onClick={onProductClick.bind(this, `Seen ${index}`)}/>
              )}
            </Tiles>
          </div>
        </div>
        {Boolean(product.getIn([ 'similar', 'data' ]) && product.getIn([ 'similar', 'data' ]).size) &&
          <div styleName='sidebar-panel'>
            <div styleName='sidebar-panel-title'>Similar Items</div>
            <div styleName='sidebar-similars'>
              <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={product.getIn([ 'similar', 'data' ]).size}>
                {product.getIn([ 'similar', 'data' ]).map((item, index) =>
                  <div
                    key={`product_${index}`}
                    style={{ backgroundImage: `url('${item.getIn([ 'image', 'url' ])}?width=80&height=80'` }}
                    styleName='sidebar-similar'
                    onClick={onProductClick.bind(this, item.get('uuid'))}/>
                )}
              </Tiles>
            </div>
          </div>}
      </div>
    );
  }
}
