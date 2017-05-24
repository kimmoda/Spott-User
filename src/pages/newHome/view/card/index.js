/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import localized from '../../../_common/localized';
import { IconHeart, IconForward } from '../icons';
import CardMarkers from '../cardMarkers';
import Users from '../users/index';
import * as actions from '../../actions';
import { spottCardDetailsSelector } from '../../selectors';
import ImageLoader from '../imageLoader/index';
import { LOADED } from '../../../../data/statusTypes';

const styles = require('./index.scss');

@localized
@connect(spottCardDetailsSelector, (dispatch) => ({
  loadSpottCardDetails: bindActionCreators(actions.loadSpottCardDetails, dispatch),
  loadSpottLovers: bindActionCreators(actions.loadSpottLovers, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch),
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
    spottDetails: PropTypes.any.isRequired,
    spottId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string,
    width: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.onCardMarkerClick = ::this.onCardMarkerClick;
    this.state = {
      isCardModalOpen: false,
      sidebarProductId: null,
      loved: this.props.item.get('loved'),
      loverCount: this.props.item.get('loverCount')
    };
  }

  componentDidMount () {
    if (this.props.spottDetails.get('_status') !== LOADED) {
      this.props.loadSpottCardDetails({ uuid: this.props.spottId });
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.spottId !== this.props.spottId) {
      this.setState({
        loved: nextProps.item.get('loved'),
        loverCount: nextProps.item.get('loverCount')
      });
    }
  }

  showSpott (event) {
    this.props.routerPush({
      pathname: `/${this.props.currentLocale}/spott/${this.props.item.get('title').replace(/\W+/g, '-')}/${this.props.item.get('uuid')}`,
      state: {
        modal: true,
        returnTo: ((this.props.location && this.props.location.pathname.match(new RegExp(/\/spott\/[\w\-\&]+\/[\w\-\/]+/gi)) ? this.props.location.state.returnTo : this.props.location.pathname) || '/')
      }
    });
  }

  shareSpott (event) {
    event.preventDefault();
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.props.spottDetails.get('shareUrl'))}&title=Discover ${this.props.spottDetails.get('title')} now on Spott`, 'name', 'width=600,height=400');
  }

  onCardMarkerClick (marker, event) {
    event.stopPropagation();

    this.props.routerPush({
      pathname: `/${this.props.currentLocale}/spott/${this.props.item.get('title').replace(/\W+/g, '-')}/${marker.getIn([ 'product', 'shortName' ]).replace(/\W+/g, '-')}/{${this.props.item.get('uuid')}}{${marker.getIn([ 'product', 'uuid' ])}}`,
      state: {
        modal: true,
        returnTo: ((this.props.location && this.props.location.pathname.match(new RegExp(/\/spott\/[\w\-\&]+\/[\w\-\/]+\/[\w\-\/]+/gi)) ? this.props.location.state.returnTo : this.props.location.pathname) || '/'),
        sidebarMarker: marker
      }
    });
  }

  async onLoveClick (spottId, loved) {
    if (this.props.userId) {
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
      this.props.loadSpottLovers({ uuid: spottId });
    } else {
      this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { modal: true, returnTo: ((this.props.location && `${this.props.location.pathname}${this.props.location.search}`) || '/') } });
    }
  }

  render () {
    const { item, currentLocale, spottDetails, width } = this.props;
    const { loved, loverCount } = this.state;

    return (
      <div styleName='card'>
        <div styleName='image' onClick={(event) => this.showSpott(event)}>
          <ImageLoader imgOriginal={item.get('image')} width={width}/>
          {spottDetails.get('productMarkers') && <CardMarkers markers={spottDetails.get('productMarkers')} onImageClick={(event) => this.showSpott(event)} onMarkerClick={this.onCardMarkerClick}/>}
          {spottDetails.get('personMarkers') &&
            <div styleName='persons'>
              {spottDetails.get('personMarkers').map((person) => {
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
          {item.get('imageSource') && <div styleName='spott-image-source'>{item.get('imageSource')}</div>}
        </div>
        <div styleName='content'>
          <div styleName='click-overlay' onClick={(event) => this.showSpott(event)}/>
          {item.get('promoted') && <div styleName='reason'>Promoted</div>}
          <h3 styleName='title'>{item.get('title')}</h3>
          <div styleName='description'>
            {item.get('comment')}
          </div>
          {width >= 280 && <div styleName='topic-links'>
            {item.get('topics').map((topic, index) =>
              <Link key={`c_topic_${index}_${topic.get('uuid')}`} styleName='topic-link' to={`/${currentLocale}/topic/${topic.get('text').replace(/\W+/g, '-')}/${topic.get('uuid')}`}>{topic.get('text')}</Link>
            )}
          </div>}
        </div>
        {width >= 280 && <div styleName='footer'>
          <div styleName='click-overlay' onClick={(event) => this.showSpott(event)}/>
          <div
            className={loved && styles['likes-liked']}
            styleName='likes'
            onClick={this.onLoveClick.bind(this, item.get('uuid'), loved)}>
            <i><IconHeart/></i>
            <span>{loverCount}</span>
          </div>
          <div styleName='users'>
            {spottDetails.getIn([ 'lovers', 'data' ]) && <Users items={spottDetails.getIn([ 'lovers', 'data' ])} maxNum={5}/>}
          </div>
          <div styleName='share' onClick={(event) => this.shareSpott(event)}>
            <i><IconForward/></i>
          </div>
        </div>}
      </div>
    );
  }
}
