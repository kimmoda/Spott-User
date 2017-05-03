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
  loadSpottDetails: bindActionCreators(actions.loadSpottDetails, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class CardModal extends Component {
  static propTypes = {
    clearSidebarProducts: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    imageThumb: PropTypes.string.isRequired,
    loadSidebarProduct: PropTypes.func.isRequired,
    loadSpottDetails: PropTypes.func.isRequired,
    removeSpottLover: PropTypes.func.isRequired,
    setSpottLover: PropTypes.func.isRequired,
    sidebarMarker: PropTypes.any,
    sidebarProducts: PropTypes.any.isRequired,
    spott: PropTypes.any.isRequired,
    spottId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseHandler = ::this.onCloseHandler;
    this.onProductClick = ::this.onProductClick;
    this.onSidebarClose = ::this.onSidebarClose;
    this.onWrapperClick = ::this.onWrapperClick;

    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);
  }

  componentWillMount () {
    this.props.loadSpottDetails({ uuid: this.props.spottId });
    if (this.props.sidebarMarker) {
      this.props.loadSidebarProduct({ uuid: this.props.sidebarMarker.getIn([ 'product', 'uuid' ]), relevance: this.props.sidebarMarker.get('relevance') });
    }
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

  onProductClick (marker) {
    this.props.loadSidebarProduct({ uuid: marker.getIn([ 'product', 'uuid' ]), relevance: marker.get('relevance') });
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
    const { imageThumb, spott, sidebarProducts, currentLocale } = this.props;

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
                {spott.get('productMarkers') && <CardMarkers markers={spott.get('productMarkers')} onMarkerClick={this.onProductClick}/>}
                {spott.get('personMarkers') &&
                  <div styleName='persons'>
                    {spott.get('personMarkers').map((person) =>
                      <Link
                        key={`person_marker_${person.get('uuid')}`}
                        style={{ backgroundImage: `url(${person.getIn([ 'character', 'avatar', 'url' ])}?width=32&height=32)` }}
                        styleName='person'
                        title={person.getIn([ 'character', 'name' ])}
                        to={`/${currentLocale}/topic/CHARACTER%7C${person.getIn([ 'character', 'uuid' ])}`}/>
                    )}
                  </div>}
              </div>
              <div styleName='products'>
                {spott.get('productMarkers') && <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={spott.get('productMarkers').size}>
                  {spott.get('productMarkers').map((item, index) =>
                    <div
                      className={item.get('relevance') === 'EXACT' ? styles['product-exact'] : styles['product-medium']}
                      key={`product_${index}`}
                      style={{ backgroundImage: `url('${item.getIn([ 'product', 'image', 'url' ])}?width=80&height=80')` }}
                      styleName='product'
                      onClick={this.onProductClick.bind(this, item)}/>
                  )}
                </Tiles>}
              </div>
              <div styleName='content'>
                <h3 styleName='title'>{spott.get('title')}</h3>
                <div styleName='description'>
                  {spott.get('comment')}
                </div>
                <div styleName='topic-links'>
                  {spott.get('topics') && spott.get('topics').map((topic, index) =>
                    <Link key={`m_topic_${index}_${topic.get('uuid')}`} styleName='topic-link' to={`/${currentLocale}/topic/${topic.get('uuid')}`}>{topic.get('text')}</Link>
                  )}
                </div>
              </div>
              <div styleName='footer'>
                <div className={spott.get('loved') && styles['likes-liked']} styleName='likes' onClick={this.onLoveClick.bind(this, spott.get('uuid'), spott.get('loved'))}>
                  <i><IconHeart/></i>
                  <span>{spott.get('loverCount')}</span>
                </div>
                <div styleName='users'>
                  {spott.getIn([ 'lovers', 'data' ]) && <Users items={spott.getIn([ 'lovers', 'data' ])} large maxNum={16}/>}
                </div>
                <Link styleName='moar' to='#'>
                  <i><IconForward/></i>
                </Link>
              </div>
            </div>
            {Boolean(spott.get('relatedTopics') && spott.get('relatedTopics').size) &&
              <div styleName='topics'>
                <div styleName='topics-content'>
                  <div styleName='topics-title'>Related Topics</div>
                  <Topics items={spott.get('relatedTopics')}/>
                </div>
              </div>}
            {spott.get('similar') &&
              <div styleName='spotts'>
                <div styleName='spotts-title'>Similar Spotts</div>
                <div styleName='spotts-list'>
                  <Cards items={spott.get('similar')}/>
                </div>
              </div>}
          </div>
        </div>
        <Sidebars onSidebarClose={this.onSidebarClose}/>
      </ReactModal>
    );
  }
}
