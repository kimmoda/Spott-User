/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import ImageLoader from '../imageLoader/index';
import CardMarkers from '../cardMarkers/index';
import { Link } from 'react-router';
import TwitterShareData from '../_common/twitterShareData';
import FacebookShareData from '../_common/facebookShareData';
import Cards from '../cards/index';
import Topics from '../topics/index';
import { IconHeart } from '../icons';
import Users from '../users/index';
import ProductImpressionSensor from '../productImpressionSensor/index';
import Tiles from '../tiles/index';
import { LOADED } from '../../data/statusTypes';
import { backgroundImageStyle, getDetailsDcFromLinks, slugify } from '../../utils';
import localized from '../_common/localized';
import SEOWidget from '../_common/seoWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { spottDetailsSelector } from '../selectors';
import withLoginDialog from '../_common/withLoginDialog';
import * as actions from '../actions';
import ShareWidget from '../_common/shareWidget/index';
import Breadcrumb from '../_common/breadcrumb';

const styles = require('./index.scss');

@localized
@withLoginDialog
@connect(spottDetailsSelector, (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SpottDetails extends Component {

  static propTypes = {
    containerStyleName: PropTypes.string,
    currentLocale: PropTypes.string,
    currentUserId: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string,
        productRelevance: PropTypes.any,
        dc: PropTypes.any,
        spottDc: PropTypes.any
      })
    }),
    mainImageWidth: PropTypes.number,
    params: PropTypes.shape({
      spottId: PropTypes.string,
      spottTitle: PropTypes.string,
      productId: PropTypes.string,
      productTitle: PropTypes.string
    }).isRequired,
    removeSpottLover: PropTypes.func,
    routerPush: PropTypes.func,
    setSpottLover: PropTypes.func,
    showLoginDialog: PropTypes.func,
    sidebarProducts: PropTypes.any,
    spott: PropTypes.any,
    spottCardStyleName: PropTypes.string,
    t: PropTypes.func,
    onProductClick: PropTypes.func
  };

  static defaultProps = {
    mainImageWidth: 280,
    spottCardStyleName: ''
  };

  constructor (props) {
    super(props);
    this.performLoveAction = ::this.performLoveAction;
    this.onLoveClick = ::this.onLoveClick;
    this.handleResize = ::this.handleResize;
    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);

    this.state = {
      width: this.props.mainImageWidth
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
    this.getWidth();
  }

  componentWillReceiveProps (nextProps) {
    this.getWidth();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize () {
    this.getWidth();
  }

  getWidth () {
    if (this.imageContainer) {
      this.setState({ width: this.imageContainer.clientWidth });
    }
  }

  performLoveAction (spottId, loved) {
    if (loved) {
      this.props.removeSpottLover({ uuid: spottId });
    } else {
      this.props.setSpottLover({ uuid: spottId });
    }
  }

  onLoveClick (spottId, loved) {
    if (this.props.currentUserId) {
      this.performLoveAction(spottId, loved);
    } else {
      this.props.showLoginDialog(() => this.performLoveAction(spottId, loved));
    }
  }

  render () {
    const { spottCardStyleName, spott, currentLocale, sidebarProducts, t, onProductClick } = this.props;
    const width = this.state.width;
    const share = spott.get('share');
    const isReady = spott.get('_status') === LOADED &&
      (!sidebarProducts.get('data').find((item) => item && item.get('_status') !== LOADED)) &&
      spott.getIn([ 'relatedTopics', '_status' ]) === LOADED &&
      spott.getIn([ 'lovers', '_status' ]) === LOADED &&
      spott.getIn([ 'similar', '_status' ]) === LOADED;
    const topicsString = spott.get('topics') ? spott.get('topics').map((topic) => ` | ${topic.get('text').trim()}`).join('') : '';

    return (
      <div styleName='spott-container'>
        <div styleName={`card ${spottCardStyleName}`}>
          <a href='#' ref={(ref) => { ref && ref.focus(); }} style={{ position: 'relative', top: '40px', width: '0', height: '0' }} onClick={(e) => e.preventDefault()}/>
          <div ref={(ref) => { this.imageContainer = ref; }} styleName='image'>
            {spott.get('image') &&
            <ImageLoader
              height={Math.ceil(spott.getIn([ 'image', 'dimension', 'height' ]) * (width / spott.getIn([ 'image', 'dimension', 'width' ])))}
              heightThumb={Math.ceil(spott.getIn([ 'image', 'dimension', 'height' ]) * (280 / spott.getIn([ 'image', 'dimension', 'width' ])))}
              imgOriginal={spott.get('image')}
              imgThumb={spott.get('image')}
              title={spott.get('title')}
              width={width}
              widthThumb={280}/>}
            {spott.get('productMarkers') && <CardMarkers markers={spott.get('productMarkers')} onMarkerClick={onProductClick}/>}
            {spott.get('personMarkers') &&
            <div styleName='persons'>
              {spott.get('personMarkers').map((person) => {
                if (person.get('person', null)) {
                  return <Link
                    key={`person_marker_${person.get('uuid')}`}
                    style={backgroundImageStyle(person.getIn([ 'person', 'avatar', 'url' ]), 90, 90)}
                    styleName='person'
                    title={person.getIn([ 'person', 'name' ])}
                    to={`/${currentLocale}/topic/${person.getIn([ 'person', 'name' ]).replace(/\W+/g, '-')}/PERSON%7C${person.getIn([ 'person', 'uuid' ])}`}/>;
                }
                return <Link
                  key={`person_marker_${person.get('uuid')}`}
                  style={backgroundImageStyle(person.getIn([ 'character', 'avatar', 'url' ]), 90, 90)}
                  styleName='person'
                  title={person.getIn([ 'character', 'name' ])}
                  to={`/${currentLocale}/topic/${person.getIn([ 'character', 'name' ]).replace(/\W+/g, '-')}/CHARACTER%7C${person.getIn([ 'character', 'uuid' ])}`}/>; }
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
                    style={backgroundImageStyle(item.getIn([ 'product', 'image', 'url' ]), 160, 160)}
                    styleName='product'
                    title={item.getIn([ 'product', 'shortName' ])}
                    onClick={() => onProductClick(item)}/>
                </ProductImpressionSensor>
              )}
            </Tiles>}
          </div>
          <div styleName='content'>
            <h1 styleName='title'>{spott.get('title')}</h1>
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
                maxNum={13}
                spottId={spott.get('uuid')}/>}
            </div>
            {share &&
              <ShareWidget
                imageUrl={share.getIn([ 'image', 'url' ])}
                shareUrl={spott.get('shareUrl')}
                title={`Discover ${spott.get('title')} now on Spott`}/>
            }
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
              spotts={spott.get('similar')}/>
          </div>
        </div>}
        {share &&
          <FacebookShareData
            description={`${spott.get('comment') ? spott.get('comment') : ''}${topicsString}`}
            imageHeight={share.getIn([ 'image', 'dimension', 'height' ])}
            imageUrl={share.getIn([ 'image', 'url' ])}
            imageWidth={share.getIn([ 'image', 'dimension', 'width' ])}
            title={share.get('title')}
            url={window.location.href}/>}
        {share &&
          <TwitterShareData
            description={`${spott.get('comment') ? spott.get('comment') : ''}${topicsString}`}
            imageUrl={share.getIn([ 'image', 'url' ])}
            title={share.get('title')}/>}
        {spott.get('title') && <SEOWidget description={spott.get('comment')} title={`${t('seo.title')} - ${spott.get('title')}`}/>}
        {spott.get('title') && <Breadcrumb imgUrl={spott.getIn([ 'image', 'url' ]) ? spott.getIn([ 'image', 'url' ]) : ''} name={spott.get('title')} />}
      </div>
    );
  }
}
