/* eslint-disable react/no-set-state */
/* eslint-disable react/jsx-indent-props */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconHeart, IconForward, IconClose } from '../icons';
import CardMarkers from '../cardMarkers';
import Topics from '../topics';
import Sidebars from '../sidebars';
import Users from '../users';
import ImageLoader from '../imageLoader';
import Tiles from '../tiles';
import * as actions from '../../actions';
import { spottDetailsSelector } from '../../selectors';
import Cards from '../cards/index';

const styles = require('./index.scss');

@localized
@connect(spottDetailsSelector, (dispatch) => ({
  clearSidebarProducts: bindActionCreators(actions.clearSidebarProducts, dispatch),
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  loadSpott: bindActionCreators(actions.loadSpott, dispatch),
  loadSpottLovers: bindActionCreators(actions.loadSpottLovers, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class CardModal extends Component {
  static propTypes = {
    clearSidebarProducts: PropTypes.func.isRequired,
    imageThumb: PropTypes.string.isRequired,
    isSidebarOpen: PropTypes.bool,
    loadSidebarProduct: PropTypes.func.isRequired,
    loadSpott: PropTypes.func.isRequired,
    loadSpottLovers: PropTypes.func.isRequired,
    relatedTopics: PropTypes.any.isRequired,
    removeSpottLover: PropTypes.func.isRequired,
    setSpottLover: PropTypes.func.isRequired,
    sidebarProducts: PropTypes.any.isRequired,
    similarSpotts: PropTypes.any.isRequired,
    spott: PropTypes.any.isRequired,
    spottId: PropTypes.string.isRequired,
    spottLovers: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseHandler = ::this.onCloseHandler;
    this.onSidebarClose = ::this.onSidebarClose;
    this.onWrapperClick = ::this.onWrapperClick;

    this.state = {
      sidebarProductId: null
    };

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

    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);
  }

  componentWillMount () {
    this.props.loadSpott({ uuid: this.props.spottId });
    this.props.loadSpottLovers({ uuid: this.props.spottId });
  }

  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
  }

  onCloseHandler () {
    if (this.props.sidebarProducts.get('data').size) {
      this.props.clearSidebarProducts();
    } else {
      this.props.onClose();
    }
  }

  onProductClick (productId) {
    this.props.loadSidebarProduct({ uuid: productId });
  }

  onSidebarClose () {
    this.props.clearSidebarProducts();
  }

  onWrapperClick (e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClose();
  }

  onLoveClick (spottId, loved) {
    if (loved) {
      this.props.removeSpottLover({ uuid: spottId });
    } else {
      this.props.setSpottLover({ uuid: spottId });
    }
  }

  render () {
    const { imageThumb, relatedTopics, spott, similarSpotts, sidebarProducts } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onCloseHandler}>
        <div styleName='modal-close' onClick={this.onCloseHandler}>
          <i><IconClose/></i>
        </div>
        <div className={sidebarProducts.get('data').size ? styles['main-sidebar-active'] : styles['main-sidebar-inactive']}
             styleName='main'>
          <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
          <div className={sidebarProducts.get('data').size ? styles['main-sidebar-wrapper-active'] : styles['main-sidebar-wrapper-inactive']}
               styleName='main-sidebar-wrapper'>
            <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
            <div styleName='card'>
              <div styleName='image'>
                <ImageLoader srcOriginal={spott.getIn([ 'image', 'url' ])} srcThumb={imageThumb}/>
                <CardMarkers markers={spott.get('productMarkers')}/>
                <Link
                  style={{ backgroundImage: `url(${this.users[Math.floor(Math.random() * this.users.length)]})` }}
                  styleName='person' to='#'/>
              </div>
              <div styleName='products'>
                {spott.get('productMarkers') && <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={spott.get('productMarkers').size}>
                  {spott.get('productMarkers').map((item, index) =>
                    <div
                      className={item.getIn([ 'product', 'available' ]) ? styles['product-available'] : styles['product-unavailable']}
                      key={`product_${index}`}
                      style={{ backgroundImage: `url('${item.getIn([ 'product', 'image', 'url' ])}?width=80&height=80')` }}
                      styleName='product'
                      onClick={this.onProductClick.bind(this, item.getIn([ 'product', 'uuid' ]))}/>
                  )}
                </Tiles>}
              </div>
              <div styleName='content'>
                <h3 styleName='title'>{spott.get('title')}</h3>
                <div styleName='description'>
                  Taken from Season 2 Episode 5 — Extreme Measures
                </div>
                <div styleName='topic-links'>
                  {spott.get('topics') && spott.get('topics').map((topic, index) =>
                    <Link key={`c_topic_${index}_${topic.get('uuid')}`} styleName='topic-link' to='#'>{topic.get('text')}</Link>
                  )}
                </div>
              </div>
              <div styleName='footer'>
                <div className={spott.get('loved') && styles['likes-liked']} styleName='likes' onClick={this.onLoveClick.bind(this, spott.get('uuid'), spott.get('loved'))}>
                  <i><IconHeart/></i>
                  <span>{spott.get('loverCount')}</span>
                </div>
                <div styleName='users'>
                  <Users large maxNum={16}/>
                </div>
                <Link styleName='moar' to='#'>
                  <i><IconForward/></i>
                </Link>
              </div>
            </div>
            <div styleName='topics'>
              <div styleName='topics-content'>
                <div styleName='topics-title'>Related Topics</div>
                <Topics items={relatedTopics}/>
              </div>
            </div>
            <div styleName='spotts'>
              <div styleName='spotts-title'>Similar Spotts</div>
              <div styleName='spotts-list'>
                <Cards items={similarSpotts}/>
              </div>
            </div>
          </div>
        </div>
        <Sidebars onSidebarClose={this.onSidebarClose}/>
      </ReactModal>
    );
  }
}
