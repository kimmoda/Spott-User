/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import localized from '../../../_common/localized';
import { IconHeart, IconForward } from '../icons';
import CardModal from '../cardModal';
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
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.onCardClick = ::this.onCardClick;
    this.onCardMarkerClick = ::this.onCardMarkerClick;
    this.onCardModalClose = ::this.onCardModalClose;
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

  onCardClick () {
    this.setState({ isCardModalOpen: true });
  }

  onCardMarkerClick (marker) {
    this.setState({
      isCardModalOpen: true,
      sidebarMarker: marker
    });
  }

  onCardModalClose () {
    this.setState({
      isCardModalOpen: false
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
    const { item, currentLocale, spottDetails, location } = this.props;
    const { loved, loverCount } = this.state;

    return (
      <div styleName='card'>
        {this.state.isCardModalOpen && <CardModal imageThumb={item.get('image')} location={location} sidebarMarker={this.state.sidebarMarker} spottId={item.get('uuid')} onClose={this.onCardModalClose}/>}
        <div styleName='image' onClick={this.onCardClick}>
          <ImageLoader imgOriginal={item.get('image')} width={280}/>
          {spottDetails.get('productMarkers') && <CardMarkers markers={spottDetails.get('productMarkers')} onImageClick={this.onCardClick} onMarkerClick={this.onCardMarkerClick}/>}
          {spottDetails.get('personMarkers') &&
            <div styleName='persons'>
              {spottDetails.get('personMarkers').map((person) =>
                <Link
                  key={`person_marker_${person.get('uuid')}`}
                  style={{ backgroundImage: `url(${person.getIn([ 'character', 'avatar', 'url' ])}?width=32&height=32)` }}
                  styleName='person'
                  title={person.getIn([ 'character', 'name' ])}
                  to={`/${currentLocale}/topic/CHARACTER%7C${person.getIn([ 'character', 'uuid' ])}`}/>
              )}
            </div>}
        </div>
        <div styleName='content'>
          <div styleName='click-overlay' onClick={this.onCardClick}/>
          {item.get('promoted') && <div styleName='reason'>Promoted</div>}
          <h3 styleName='title'>{item.get('title')}</h3>
          <div styleName='description'>
            {item.get('comment')}
          </div>
          <div styleName='topic-links'>
            {item.get('topics').map((topic, index) =>
              <Link key={`c_topic_${index}_${topic.get('uuid')}`} styleName='topic-link' to={`/${currentLocale}/topic/${topic.get('uuid')}`}>{topic.get('text')}</Link>
            )}
          </div>
        </div>
        <div styleName='footer'>
          <div styleName='click-overlay' onClick={this.onCardClick}/>
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
          <Link styleName='share' to='#'>
            <i><IconForward/></i>
          </Link>
        </div>
      </div>
    );
  }
}
