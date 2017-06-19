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
import ProductImpressionSensor from '../productImpressionSensor';
import { slugify, getDetailsDcFromLinks } from '../../../../utils';
import FacebookShareData from '../../../_common/facebookShareData';
import { LOADED } from '../../../../data/statusTypes';

const styles = require('./index.scss');

@localized
@connect(spottDetailsSelector, (dispatch) => ({
  clearSidebarProducts: bindActionCreators(actions.clearSidebarProducts, dispatch),
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  loadSpottAndSidebarProduct: bindActionCreators(actions.loadSpottAndSidebarProduct, dispatch),
  loadSpottDetails: bindActionCreators(actions.loadSpottDetails, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  removeSidebarProduct: bindActionCreators(actions.removeSidebarProduct, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch),
  trackSpottView: bindActionCreators(actions.trackSpottView, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class CardModal extends Component {
  static propTypes = {
    clearSidebarProducts: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    loadSidebarProduct: PropTypes.func.isRequired,
    loadSpottAndSidebarProduct: PropTypes.func.isRequired,
    loadSpottDetails: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string,
        productRelevance: PropTypes.any,
        dc: PropTypes.any,
        spottDc: PropTypes.any
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
    trackSpottView: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseHandler = ::this.onCloseHandler;
    this.onProductClick = ::this.onProductClick;
    this.onSidebarClose = ::this.onSidebarClose;
    this.handleResize = ::this.handleResize;
    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);
    this.state = {
      width: 280
    };
  }

  componentDidMount () {
    const { params, loadSpottDetails, loadSpottAndSidebarProduct, location, trackSpottView } = this.props;
    const spottDc = location.state && location.state.spottDc || '';
    if (params.productId) {
      loadSpottAndSidebarProduct({ spottId: params.spottId, productId: params.productId, spottDc });
    } else {
      loadSpottDetails({ uuid: params.spottId, dc: spottDc });
    }
    trackSpottView({ uuid: params.spottId, dc: spottDc });
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('resize', this.handleResize);
    this.getWidth();
  }

  componentWillReceiveProps (nextProps) {
    const { params, loadSidebarProduct, loadSpottDetails, clearSidebarProducts, sidebarProducts, removeSidebarProduct, loadSpottAndSidebarProduct, trackSpottView } = this.props;
    const spottDc = nextProps.location.state && nextProps.location.state.spottDc || '';
    if (params.spottId !== nextProps.params.spottId) {
      clearSidebarProducts();
      if (nextProps.params.productId) {
        loadSpottAndSidebarProduct({
          spottId: nextProps.params.spottId,
          productId: nextProps.params.productId,
          spottDc
        });
      } else {
        loadSpottDetails({
          uuid: nextProps.params.spottId,
          dc: spottDc
        });
      }
      trackSpottView({ uuid: nextProps.params.spottId, dc: spottDc });
    } else if (params.productId !== nextProps.params.productId) {
      if (!nextProps.params.productId) {
        clearSidebarProducts();
      } else if (sidebarProducts.getIn([ 'data', -2, 'uuid' ], null) === nextProps.params.productId && params.productId) {
        removeSidebarProduct({ uuid: params.productId });
      } else {
        loadSidebarProduct({
          uuid: nextProps.params.productId,
          relevance: nextProps.location.state && nextProps.location.state.productRelevance,
          dc: nextProps.location.state && nextProps.location.state.dc
        });
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
    const { currentLocale, location, routerPush: routePush, sidebarProducts, spott } = this.props;
    if (sidebarProducts.get('data').size) {
      this.props.routerPush({
        pathname: `/${currentLocale}/spott/${slugify(spott.get('title', ''))}/${spott.get('uuid')}`,
        state: {
          modal: true,
          returnTo: (location.state && location.state.returnTo) || '/',
          spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
        }
      });
    } else {
      routePush((location.state && location.state.returnTo) || '/');
    }
  }

  onProductClick (marker) {
    const { currentLocale, location, spott } = this.props;
    this.props.routerPush({
      pathname: `/${currentLocale}/spott/${slugify(spott.get('title'))}/${slugify(marker.getIn([ 'product', 'shortName' ]))}/{${spott.get('uuid')}}{${marker.getIn([ 'product', 'uuid' ])}}`,
      state: {
        modal: true,
        returnTo: (location.state && location.state.returnTo) || '/',
        productRelevance: marker.get('relevance'),
        dc: getDetailsDcFromLinks(marker.getIn([ 'product', 'links' ]).toJS()),
        spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
      }
    });
  }

  onSidebarClose () {
    const { currentLocale, location, spott, params } = this.props;
    this.props.routerPush({
      pathname: `/${currentLocale}/spott/${slugify(spott.get('title'))}/${spott.get('uuid')}`,
      state: {
        modal: true,
        returnTo: ((location.state && params.productId ? location.state.returnTo : location.pathname) || '/'),
        spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
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

  render () {
    const { spott, sidebarProducts, currentLocale, location, params, t } = this.props;
    const { width } = this.state;
    const share = spott.get('share');
    const isReady = spott.get('_status') === LOADED &&
      (!sidebarProducts.get('data').find((item) => item && item.get('_status') !== LOADED)) &&
      spott.getIn([ 'relatedTopics', '_status' ]) === LOADED &&
      spott.getIn([ 'lovers', '_status' ]) === LOADED &&
      spott.getIn([ 'similar', '_status' ]) === LOADED;

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
                {spott.get('image') &&
                  <ImageLoader
                    height={Math.ceil(spott.getIn([ 'image', 'dimension', 'height' ]) * (width / spott.getIn([ 'image', 'dimension', 'width' ])))}
                    heightThumb={Math.ceil(spott.getIn([ 'image', 'dimension', 'height' ]) * (280 / spott.getIn([ 'image', 'dimension', 'width' ])))}
                    imgOriginal={spott.get('image')}
                    imgThumb={spott.get('image')}
                    width={width}
                    widthThumb={280}/>}
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
                    <ProductImpressionSensor active={isReady} delay={2000} key={`product_${index}`} productId={item.getIn([ 'product', 'uuid' ])} productLinks={item.getIn([ 'product', 'links' ])}>
                      <div
                        className={item.get('relevance') === 'EXACT' ? styles['product-exact'] : styles['product-medium']}
                        key={`product_${index}`}
                        style={{ backgroundImage: `url('${item.getIn([ 'product', 'image', 'url' ])}?width=80&height=80')` }}
                        styleName='product'
                        onClick={this.onProductClick.bind(this, item)}/>
                    </ProductImpressionSensor>
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
                    <Link
                      key={`m_topic_${index}_${topic.get('uuid')}`}
                      styleName='topic-link'
                      to={{
                        pathname: `/${currentLocale}/topic/${slugify(topic.get('text', ''))}/${topic.get('uuid')}`,
                        state: { dc: getDetailsDcFromLinks(topic.get('links').toJS()) }
                      }}>
                      {topic.get('text').trim()}
                    </Link>
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
        {share &&
          <FacebookShareData
            description={share.get('description')}
            imageHeight={share.getIn([ 'image', 'dimension', 'height' ])}
            imageUrl={share.getIn([ 'image', 'url' ])}
            imageWidth={share.getIn([ 'image', 'dimension', 'width' ])}
            title={share.get('title')}
            url={window.location.href}/>}
        <Sidebars location={location} params={params} onSidebarClose={this.onSidebarClose}/>
      </ReactModal>
    );
  }
}
