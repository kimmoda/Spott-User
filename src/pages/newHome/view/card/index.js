/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';
import { IconHeart, IconForward } from '../icons';
import CardModal from '../cardModal';
import CardMarkers from '../cardMarkers';
import Users from '../users/index';
import * as actions from '../../actions';
import { spottCardDetailsSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(spottCardDetailsSelector, (dispatch) => ({
  loadSpottCardDetails: bindActionCreators(actions.loadSpottCardDetails, dispatch),
  removeSpottLover: bindActionCreators(actions.removeSpottLover, dispatch),
  setSpottLover: bindActionCreators(actions.setSpottLover, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Card extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    item: PropTypes.any.isRequired,
    loadSpottCardDetails: PropTypes.func.isRequired,
    removeSpottLover: PropTypes.func.isRequired,
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

  componentWillMount () {
    this.props.loadSpottCardDetails({ uuid: this.props.spottId });
  }

  onCardClick () {
    this.setState({ isCardModalOpen: true });
  }

  onCardMarkerClick (productId) {
    this.setState({
      isCardModalOpen: true,
      sidebarProductId: productId
    });
  }

  onCardModalClose () {
    this.setState({
      isCardModalOpen: false
    });
  }

  onLoveClick (spottId, loved) {
    if (this.props.userId) {
      if (loved) {
        this.props.removeSpottLover({ uuid: spottId });
        this.setState({
          loved: !this.state.loved,
          loverCount: this.state.loverCount - 1
        });
      } else {
        this.props.setSpottLover({ uuid: spottId });
        this.setState({
          loved: !this.state.loved,
          loverCount: this.state.loverCount + 1
        });
      }
    }
  }

  render () {
    const { item, currentLocale, spottDetails } = this.props;
    const { loved, loverCount } = this.state;

    return (
      <div styleName='card'>
        {this.state.isCardModalOpen && <CardModal imageThumb={`${item.getIn([ 'image', 'url' ])}?width=280&height=280`} sidebarProductId={this.state.sidebarProductId} spottId={item.get('uuid')} onClose={this.onCardModalClose}/>}
        <div styleName='image' onClick={this.onCardClick}>
          <img src={`${item.getIn([ 'image', 'url' ])}?width=280&height=280`}/>
          {spottDetails.get('productMarkers') && <CardMarkers markers={spottDetails.get('productMarkers')} onImageClick={this.onCardClick} onMarkerClick={this.onCardMarkerClick}/>}
          {spottDetails.get('personMarkers') &&
            <div styleName='persons'>
              {spottDetails.get('personMarkers').map((person) =>
                <div
                  key={`person_marker_${person.get('uuid')}`}
                  style={{ backgroundImage: `url(${person.getIn([ 'character', 'avatar', 'url' ])}?width=32&height=32)` }}
                  styleName='person'
                  title={person.getIn([ 'character', 'name' ])}/>
              )}
            </div>}
        </div>
        <div styleName='content'>
          <div styleName='click-overlay' onClick={this.onCardClick}/>
          <div styleName='reason'>
            Because you subscribed to Chicago Med
          </div>
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
