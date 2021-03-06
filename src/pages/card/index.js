/* eslint-disable react/no-set-state */
import React, { Component, PureComponent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import localized from '../_common/localized';
import { IconHeart, IconCheckmark } from '../icons';
import CardMarkers from '../cardMarkers';
import Users from '../users/index';
import * as actions from '../actions';
import { spottCardDetailsSelector } from '../selectors';
import ImageLoader from '../imageLoader/index';
import { LOADED } from '../../data/statusTypes';
import { slugify, getDetailsDcFromLinks, getPath, backgroundImageStyle } from '../../utils';
import Tiles from '../tiles';
import VisibilitySensor from 'react-visibility-sensor';
import withLoginDialog from '../_common/withLoginDialog';
import ShareWidget from '../_common/shareWidget/index';

const styles = require('./index.scss');

@localized
@withLoginDialog
@connect(spottCardDetailsSelector, (dispatch) => ({
  loadSpottCardDetails: bindActionCreators(actions.loadSpottCardDetails, dispatch),
  loadSpottLovers: bindActionCreators(actions.loadSpottLovers, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch),
  trackSpottImpression: bindActionCreators(actions.trackSpottImpression, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Card extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    item: PropTypes.any.isRequired,
    loadSpottCardDetails: PropTypes.func.isRequired,
    loadSpottLovers: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    removeSpottLover: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    setSpottLover: PropTypes.func.isRequired,
    showLoginDialog: PropTypes.func,
    spottDetails: PropTypes.any.isRequired,
    spottId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    trackSpottImpression: PropTypes.func.isRequired,
    userId: PropTypes.string,
    width: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.onCardMarkerClick = ::this.onCardMarkerClick;
    this.performLoveAction = ::this.performLoveAction;
    this.onCardVisible = ::this.onCardVisible;
    this.state = {
      sidebarProductId: null,
      loved: this.props.spottDetails.get('loved'),
      loverCount: this.props.spottDetails.get('loverCount')
    };
  }

  componentDidMount () {
    const { spottId, item: spott, spottDetails, loadSpottCardDetails } = this.props;
    if (spottDetails.get('_status') !== LOADED) {
      loadSpottCardDetails({ uuid: spottId, dc: getDetailsDcFromLinks(spott.get('links').toJS()) });
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.spottId !== this.props.spottId || nextProps.spottDetails.get('loverCount') !== this.props.spottDetails.get('loverCount')) {
      this.setState({
        loved: nextProps.spottDetails.get('loved'),
        loverCount: nextProps.spottDetails.get('loverCount')
      });
    }
  }

  showSpott (event, shareUrl) {
    event.stopPropagation();
    const { location, currentLocale, item: spott, spottId } = this.props;
    this.props.routerPush({
      pathname: `/${currentLocale}/modal/${getPath(shareUrl)}`,
      state: {
        modal: true,
        returnTo: location.state && spottId ? location.state.returnTo : `${location.pathname}${location.search}`,
        spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
      }
    });
  }

  async performLoveAction (spottId, loved) {
    if (loved) {
      this.setState({
        loved: !this.state.loved,
        loverCount: this.state.loverCount - 1
      });
      await this.props.removeSpottLover({ uuid: spottId });
    } else {
      this.setState({
        loved: !this.state.loved,
        loverCount: this.state.loverCount + 1
      });
      await this.props.setSpottLover({ uuid: spottId });
    }
  }

  onCardMarkerClick (marker, event) {
    event.stopPropagation();
    const { location, currentLocale, item: spott } = this.props;
    this.props.routerPush({
      pathname: `/${currentLocale}/modal/${getPath(marker.getIn([ 'product', 'shareUrl' ]))}`,
      state: {
        modal: true,
        returnTo: location.state && location.state.returnTo ? location.state.returnTo : `${location.pathname}${location.search}`,
        productRelevance: marker.get('relevance'),
        dc: getDetailsDcFromLinks(marker.getIn([ 'product', 'links' ]).toJS()),
        spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
      }
    });
  }

  onPersonClick (url, event) {
    event.stopPropagation();
    this.props.routerPush({
      pathname: url
    });
  }

  async onLoveClick (spottId, loved) {
    if (this.props.userId) {
      this.performLoveAction(spottId, loved);
      // this.props.loadSpottLovers({ uuid: spottId });
    } else {
      this.props.showLoginDialog(() => {
        if (loved) {
          this.props.removeSpottLover({ uuid: spottId });
        } else {
          this.props.setSpottLover({ uuid: spottId });
        }
      });
    }
  }

  onCardVisible (isVisible) {
    const { spottDetails: spott, trackSpottImpression, spottId } = this.props;
    if (isVisible) {
      const spottLinks = spott.getIn([ 'links' ]).toJS();
      trackSpottImpression({ uuid: spottId, dc: getDetailsDcFromLinks(spottLinks) });
    }
  }

  render () {
    const { item, currentLocale, spottDetails, width, location, t } = this.props;
    const { loved, loverCount } = this.state;

    const share = spottDetails.get('share');
    const isReady = spottDetails.getIn([ 'lovers', '_status' ]) === LOADED;

    return (
      <VisibilitySensor active={isReady} delayedCall intervalDelay={1500} onChange={this.onCardVisible}>
        <div styleName='card'>
          <div styleName='image' onClick={(event) => this.showSpott(event, spottDetails.get('shareUrl'))}>
            <ImageLoader
              height={Math.ceil(item.getIn([ 'image', 'dimension', 'height' ]) * (width / item.getIn([ 'image', 'dimension', 'width' ])))}
              imgOriginal={item.get('image')}
              title={item.get('title')}
              width={width}/>
            {spottDetails.get('productMarkers') && <CardMarkers markers={spottDetails.get('productMarkers')} onMarkerClick={this.onCardMarkerClick}/>}
            {spottDetails.get('personMarkers') &&
              <div styleName='persons'>
                {spottDetails.get('personMarkers').map((person) => {
                  if (person.get('person', null)) {
                    return <div
                      key={`person_marker_${person.get('uuid')}`}
                      style={backgroundImageStyle(person.getIn([ 'person', 'avatar', 'url' ]), 90, 90)}
                      styleName='person'
                      title={person.getIn([ 'person', 'name' ])}
                      onClick={this.onPersonClick.bind(this, `/${currentLocale}/topic/${slugify(person.getIn([ 'person', 'name' ], ''))}/PERSON%7C${person.getIn([ 'person', 'uuid' ])}`)}/>;
                  }
                  return <div
                    key={`person_marker_${person.get('uuid')}`}
                    style={backgroundImageStyle(person.getIn([ 'character', 'avatar', 'url' ]), 90, 90)}
                    styleName='person'
                    title={person.getIn([ 'character', 'name' ])}
                    onClick={this.onPersonClick.bind(this, `/${currentLocale}/topic/${slugify(person.getIn([ 'character', 'name' ], ''))}/CHARACTER%7C${person.getIn([ 'character', 'uuid' ])}`)}/>;
                }
                )}
              </div>}
            {item.get('imageSource') && <div styleName='spott-image-source'>{item.get('imageSource')}</div>}
          </div>
          <div styleName='content'>
            <div styleName='click-overlay' onClick={(event) => this.showSpott(event, spottDetails.get('shareUrl'))}/>
            {width >= 280 && <div styleName='products'>
              {Boolean(spottDetails.get('productMarkers') && isReady) &&
                <CardProducts
                  productMarkers={spottDetails.get('productMarkers')}
                  onCardMarkerClick={this.onCardMarkerClick}/>}
            </div>}
            {item.get('promoted') && <div styleName='reason'>{t('common.promoted')}</div>}
            <h3 styleName='title'>{item.get('title')}</h3>
            {width >= 280 && <div styleName='topic-links'>
              {item.get('topics').map((topic, index) =>
                <Link
                  key={`c_topic_${index}_${topic.get('uuid')}`}
                  styleName='topic-link'
                  to={{
                    pathname: `/${currentLocale}/topic/${slugify(topic.get('text', ''))}/${topic.get('uuid')}`,
                    state: { dc: getDetailsDcFromLinks(topic.get('links').toJS()) }
                  }}>
                  {topic.get('subscribed') && <i><IconCheckmark/></i>}
                  <span>{topic.get('text').trim()}</span>
                </Link>
              )}
            </div>}
          </div>
          {width >= 280 && <div styleName='footer'>
            <div styleName='click-overlay' onClick={(event) => this.showSpott(event, spottDetails.get('shareUrl'))}/>
            <div
              className={loved && styles['likes-liked']}
              styleName='likes'
              onClick={this.onLoveClick.bind(this, item.get('uuid'), loved)}>
              <i><IconHeart/></i>
              <span>{loverCount}</span>
            </div>
            <div styleName='users'>
              {spottDetails.getIn([ 'lovers', 'data' ]) &&
                <Users
                  isSpottLoved={loved}
                  items={spottDetails.getIn([ 'lovers', 'data' ])}
                  location={location}
                  maxNum={3}
                  spottId={spottDetails.get('uuid')}/>}
            </div>
            {share &&
              <ShareWidget
                imageUrl={share.getIn([ 'image', 'url' ])}
                shareUrl={spottDetails.get('shareUrl')}
                title={`Discover ${spottDetails.get('title')} now on Spott`}/>}
          </div>}
        </div>
      </VisibilitySensor>
    );
  }
}

@CSSModules(styles, { allowMultiple: true })
class CardProducts extends PureComponent {

  static propTypes = {
    productMarkers: PropTypes.any.isRequired,
    onCardMarkerClick: PropTypes.func.isRequired
  };

  render () {
    const { productMarkers, onCardMarkerClick } = this.props;

    return (
      <Tiles tileOffsetWidth={16} tilesCount={productMarkers.size}>
        {productMarkers.map((product, index) =>
          <div
            className={product.get('relevance') === 'EXACT' ? styles['product-exact'] : styles['product-medium']}
            key={`product_${index}`}
            style={backgroundImageStyle(product.getIn([ 'product', 'image', 'url' ]), 160, 160)}
            styleName='product'
            onClick={onCardMarkerClick.bind(this, product)}/>
        )}
      </Tiles>
    );
  }
}
