/* eslint-disable react/no-set-state */
/* eslint-disable react/jsx-indent-props */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import { Link } from 'react-router';
import { push as routerPush } from 'react-router-redux';
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
import { slugify } from '../../../../utils';

const styles = require('./index.scss');

@localized
@connect(spottDetailsSelector, (dispatch) => ({
  clearSidebarProducts: bindActionCreators(actions.clearSidebarProducts, dispatch),
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  loadSpottDetails: bindActionCreators(actions.loadSpottDetails, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  removeSidebarProduct: bindActionCreators(actions.removeSidebarProduct, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch),
  trackImpressionEvent: bindActionCreators(actions.trackImpressionEvent, dispatch),
  trackSpottEvent: bindActionCreators(actions.trackSpottEvent, dispatch),
  trackProductEvent: bindActionCreators(actions.trackProductEvent, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class CardModal extends Component {
  static propTypes = {
    clearSidebarProducts: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    loadSidebarProduct: PropTypes.func.isRequired,
    loadSpottDetails: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string,
        productRelevance: PropTypes.any
      })
    }).isRequired,
    params: PropTypes.shape({
      spottId: PropTypes.string,
      spottTitle: PropTypes.string,
      productId: PropTypes.string,
      productTitle: PropTypes.string
    }).isRequired,
    removeSidebarProduct: PropTypes.func.isRequired,
    removeSpottLover: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    setSpottLover: PropTypes.func.isRequired,
    sidebarProducts: PropTypes.any.isRequired,
    spott: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    trackImpressionEvent: PropTypes.func.isRequired,
    trackProductEvent: PropTypes.func.isRequired,
    trackSpottEvent: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseHandler = ::this.onCloseHandler;
    this.onProductClick = ::this.onProductClick;
    this.onProductLoad = ::this.onProductLoad;
    this.onSidebarClose = ::this.onSidebarClose;
    this.handleResize = ::this.handleResize;
    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);
    this.state = {
      width: 280
    };
  }

  componentDidMount () {
    const { params, loadSidebarProduct, loadSpottDetails, location, trackSpottEvent, trackProductEvent } = this.props;
    loadSpottDetails({ uuid: params.spottId });
    if (params.productId) {
      loadSidebarProduct({ uuid: params.productId, relevance: location.state && location.state.productRelevance });
      trackProductEvent(params.productId);
    }
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('resize', this.handleResize);
    this.getWidth();
    trackSpottEvent(this.props.params.spottId);
  }

  componentWillReceiveProps (nextProps) {
    const { params, loadSidebarProduct, loadSpottDetails, clearSidebarProducts, trackProductEvent, trackSpottEvent, sidebarProducts, removeSidebarProduct } = this.props;
    if (params.spottId !== nextProps.params.spottId || (params.productId && !nextProps.params.productId)) {
      clearSidebarProducts();
      loadSpottDetails({ uuid: nextProps.params.spottId });
      trackSpottEvent(nextProps.params.spottId);
    }
    if ((params.productId && nextProps.params.productId && params.productId !== nextProps.params.productId) || (!params.productId && nextProps.params.productId)) {
      if (nextProps.location.state && nextProps.location.state.productRelevance && nextProps.location.action !== 'POP') {
        loadSidebarProduct({
          uuid: nextProps.params.productId,
          relevance: nextProps.location.state.productRelevance
        });
      }
      if (nextProps.location.action === 'POP') {
        params.spottId !== nextProps.params.spottId && loadSpottDetails({ uuid: nextProps.params.spottId });
        if (sidebarProducts.get('data').find((item) => item.get('uuid') === nextProps.params.productId)) {
          removeSidebarProduct({ uuid: params.productId });
        } else {
          loadSidebarProduct({
            uuid: nextProps.params.productId,
            relevance: nextProps.location.state && nextProps.location.state.productRelevance
          });
          trackProductEvent(nextProps.params.productId);
        }
      }
    }
    this.getWidth();
  }

  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
    window.removeEventListener('resize', this.handleResize);
    this.props.clearSidebarProducts();
  }

  handleResize () {
    this.getWidth();
  }

  getWidth () {
    if (this.imageContainer) {
      this.setState({ width: this.imageContainer.clientWidth });
    }
  }

  shareSpott (event) {
    event.preventDefault();
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.props.spott.get('shareUrl'))}&title=Discover ${this.props.spott.get('title')} now on Spott`, 'name', 'width=600,height=400');
  }

  onCloseHandler () {
    const { currentLocale, location, routerPush: routePush, clearSidebarProducts, sidebarProducts, spott } = this.props;
    const spottPath = `/${currentLocale}/spott/${slugify(spott.get('title', ''))}/${spott.get('uuid')}`;
    if (sidebarProducts.get('data').size) {
      clearSidebarProducts();
      this.props.routerPush({
        pathname: spottPath,
        state: {
          modal: true,
          returnTo: (location.state && location.state.returnTo) || '/'
        }
      });
    } else {
      routePush((location.state && location.state.returnTo) || '/');
    }
  }

  onProductClick (marker) {
    const { currentLocale, location, spott } = this.props;
    this.props.loadSidebarProduct({ uuid: marker.getIn([ 'product', 'uuid' ]), relevance: marker.get('relevance') });
    this.props.routerPush({
      pathname: `/${currentLocale}/spott/${slugify(spott.get('title'))}/${slugify(marker.getIn([ 'product', 'shortName' ]))}/{${spott.get('uuid')}}{${marker.getIn([ 'product', 'uuid' ])}}`,
      state: {
        modal: true,
        returnTo: (location.state && location.state.returnTo) || '/'
      }
    });
  }

  onSidebarClose () {
    const { currentLocale, location, spott, params } = this.props;
    this.props.clearSidebarProducts();
    this.props.routerPush({
      pathname: `/${currentLocale}/spott/${slugify(spott.get('title'))}/${spott.get('uuid')}`,
      state: {
        modal: true,
        returnTo: ((location.state && params.productId ? location.state.returnTo : location.pathname) || '/')
      }
    });
  }

  onLoveClick (spottId, loved) {
    if (this.props.currentUserId) {
      if (loved) {
        this.props.removeSpottLover({ uuid: spottId });
      } else {
        this.props.setSpottLover({ uuid: spottId });
      }
    } else {
      this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { modal: true, returnTo: ((this.props.location && this.props.location.pathname) || '/') } });
    }
  }

  onProductLoad (item) {
    this.props.trackImpressionEvent(item.getIn([ 'product', 'uuid' ]));
  }

  render () {
    const { spott, sidebarProducts, currentLocale, location, params, t } = this.props;
    const { width } = this.state;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onCloseHandler}>
        <div className={sidebarProducts.get('data').size ? styles['main-sidebar-active'] : styles['main-sidebar-inactive']}
             styleName='main'>
          <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
          <div className={sidebarProducts.get('data').size ? styles['main-sidebar-wrapper-active'] : styles['main-sidebar-wrapper-inactive']}
               styleName='main-sidebar-wrapper'>
            <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
            <div styleName='card'>
              <div styleName='modal-close' onClick={this.onCloseHandler}>
                <i><IconClose/></i>
              </div>
              <div ref={(ref) => { this.imageContainer = ref; }} styleName='image'>
                {spott.get('image') && <ImageLoader imgOriginal={spott.get('image')} imgThumb={spott.get('image')} width={width} widthThumb={280}/>}
                {spott.get('productMarkers') && <CardMarkers markers={spott.get('productMarkers')} onMarkerClick={this.onProductClick}/>}
                {spott.get('personMarkers') &&
                  <div styleName='persons'>
                    {spott.get('personMarkers').map((person) => {
                      if (person.get('person', null)) {
                        return <Link
                          key={`person_marker_${person.get('uuid')}`}
                          style={{ backgroundImage: `url(${person.getIn([ 'person', 'avatar', 'url' ])}?width=32&height=32)` }}
                          styleName='person'
                          title={person.getIn([ 'person', 'name' ])}
                          to={`/${currentLocale}/topic/${person.getIn([ 'person', 'name' ]).replace(/\W+/g, '-')}/PERSON%7C${person.getIn([ 'person', 'uuid' ])}`}/>;
                      }
                      return <Link
                        key={`person_marker_${person.get('uuid')}`}
                        style={{ backgroundImage: `url(${person.getIn([ 'character', 'avatar', 'url' ])}?width=32&height=32)` }}
                        styleName='person'
                        title={person.getIn([ 'character', 'name' ])}
                        to={`/${currentLocale}/topic/${person.getIn([ 'character', 'name' ]).replace(/\W+/g, '-')}/CHARACTER%7C${person.getIn([ 'character', 'uuid' ])}`}/>;
                    }
                    )}
                  </div>}
                {spott.get('imageSource') && <div styleName='spott-image-source'>{spott.get('imageSource')}</div>}
              </div>
              <div styleName='products'>
                {spott.get('productMarkers') && <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={spott.get('productMarkers').size}>
                  {spott.get('productMarkers').map((item, index) =>
                    <div
                      className={item.get('relevance') === 'EXACT' ? styles['product-exact'] : styles['product-medium']}
                      key={`product_${index}`}
                      style={{ backgroundImage: `url('${item.getIn([ 'product', 'image', 'url' ])}?width=80&height=80')` }}
                      styleName='product'
                      onClick={this.onProductClick.bind(this, item)} >
                      <img src={`${item.getIn([ 'product', 'image', 'url' ])}?width=80&height=80`} styleName='tracking' onLoad={this.onProductLoad.bind(this, item)}/>
                    </div>
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
                    <Link key={`m_topic_${index}_${topic.get('uuid')}`} styleName='topic-link' to={`/${currentLocale}/topic/${topic.get('text').replace(/\W+/g, '-')}/${topic.get('uuid')}`}>{topic.get('text')}</Link>
                  )}
                </div>
              </div>
              <div styleName='footer'>
                <div className={spott.get('loved') && styles['likes-liked']} styleName='likes' onClick={this.onLoveClick.bind(this, spott.get('uuid'), spott.get('loved'))}>
                  <i><IconHeart/></i>
                  <span>{spott.get('loverCount')}</span>
                </div>
                <div styleName='users'>
                  {spott.getIn([ 'lovers', 'data' ]) &&
                    <Users
                      isSpottLoved={spott.get('loved')}
                      items={spott.getIn([ 'lovers', 'data' ])}
                      large
                      location={location}
                      maxNum={16}
                      spottId={spott.get('uuid')}/>}
                </div>
                <div styleName='moar' onClick={(event) => this.shareSpott(event)}>
                  <i><IconForward/></i>
                </div>
              </div>
            </div>
            {Boolean(spott.getIn([ 'relatedTopics', 'data' ]) && spott.getIn([ 'relatedTopics', 'data' ]).size) &&
              <div styleName='topics responsive-container'>
                <div styleName='topics-content'>
                  <div styleName='topics-title'>{t('topic.relatedTopics')}</div>
                  <Topics items={spott.get('relatedTopics')}/>
                </div>
              </div>}
            {Boolean(spott.getIn([ 'similar', 'data' ]) && spott.getIn([ 'similar', 'data' ]).size) &&
              <div styleName='spotts responsive-container'>
                <div styleName='spotts-title'>{t('spott.similarSpotts')}</div>
                <div styleName='spotts-list'>
                  <Cards
                    location={location}
                    params={params}
                    spotts={spott.get('similar')}/>
                </div>
              </div>}
          </div>
        </div>
        <Sidebars location={location} params={params} onSidebarClose={this.onSidebarClose}/>
      </ReactModal>
    );
  }
}
