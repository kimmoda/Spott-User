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
  loadSpott: bindActionCreators(actions.loadSpott, dispatch),
  loadSpottLovers: bindActionCreators(actions.loadSpottLovers, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class CardModal extends Component {
  static propTypes = {
    imageThumb: PropTypes.string.isRequired,
    isSidebarOpen: PropTypes.bool,
    loadSpott: PropTypes.func.isRequired,
    loadSpottLovers: PropTypes.func.isRequired,
    relatedTopics: PropTypes.any.isRequired,
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
    this.onProductClick = ::this.onProductClick;
    this.onSidebarClose = ::this.onSidebarClose;
    this.onWrapperClick = ::this.onWrapperClick;

    this.state = {
      sidebarItemIndex: 1,
      sidebarItem: props.isSidebarOpen ? 'Windsor Three Piece Suit 0' : null
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

    this.productTileWidth = parseInt(styles.cssProductTileWidth, 10);
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
    if (this.state.sidebarItem) {
      this.setState({
        sidebarItem: null
      });
    } else {
      this.props.onClose();
    }
  }

  onProductClick () {
    this.setState({
      sidebarItemIndex: this.state.sidebarItemIndex + 1,
      sidebarItem: `Windsor Three Piece Suit ${this.state.sidebarItemIndex}`
    });
  }

  onSidebarClose () {
    this.setState({
      sidebarItem: null
    });
  }

  onWrapperClick (e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClose();
  }

  render () {
    const { imageThumb, relatedTopics, spott, similarSpotts } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onCloseHandler}>
        <div styleName='modal-close' onClick={this.onCloseHandler}>
          <i><IconClose/></i>
        </div>
        <div className={this.state.sidebarItem ? styles['main-sidebar-active'] : styles['main-sidebar-inactive']}
             styleName='main'>
          <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
          <div className={this.state.sidebarItem ? styles['main-sidebar-wrapper-active'] : styles['main-sidebar-wrapper-inactive']}
               styleName='main-sidebar-wrapper'>
            <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
            <div styleName='card'>
              <div styleName='image'>
                {spott.getIn([ 'image', 'url' ]) && <ImageLoader srcOriginal={spott.getIn([ 'image', 'url' ])} srcThumb={imageThumb}/>}
                <CardMarkers/>
                <Link
                  style={{ backgroundImage: `url(${this.users[Math.floor(Math.random() * this.users.length)]})` }}
                  styleName='person' to='#'/>
              </div>
              <div styleName='products'>
                <Tiles tileWidth={this.productTileWidth} tilesCount={10}>
                  {new Array(10).fill(1).map((item, index) =>
                    <div key={`product_${index}`}
                         style={{ backgroundImage: `url(http://lorempixel.com/80/80/abstract/${index})` }}
                         styleName='product'
                         onClick={this.onProductClick}/>
                  )}
                </Tiles>
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
                <Link styleName='likes' to='#'>
                  <i><IconHeart/></i>
                  <span>{spott.get('loverCount')}</span>
                </Link>
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
        <Sidebars item={this.state.sidebarItem} onSidebarClose={this.onSidebarClose}/>
      </ReactModal>
    );
  }
}
