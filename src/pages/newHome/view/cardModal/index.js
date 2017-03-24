/* eslint-disable react/no-set-state */
/* eslint-disable react/jsx-indent-props */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import ReactModal from 'react-modal';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconHeart, IconForward, IconClose } from '../icons';
import CardMarkers from '../cardMarkers';
import Card from '../card';
import Topics from '../topics';
import Sidebars from '../sidebars/index';
import Users from '../users/index';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class CardModal extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onProductClick = ::this.onProductClick;
    this.onSidebarClose = ::this.onSidebarClose;

    this.state = {
      sidebarItemIndex: 1,
      sidebarItem: null
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
  }

  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
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

  render () {
    const { onClose } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={onClose}>
        <div styleName='wrapper'>
          <div styleName='modal-close' onClick={onClose}>
            <i><IconClose/></i>
          </div>
          <div className={this.state.sidebarItem ? styles['main-sidebar-active'] : styles['main-sidebar-inactive']} styleName='main'>
            <div styleName='card'>
              <div styleName='image'>
                <img src='http://lorempixel.com/592/830/abstract/7'/>
                <CardMarkers/>
              </div>
              <div styleName='products'>
                {new Array(7).fill(1).map((item, index) =>
                  <div key={`product_${index}`}
                       style={{ backgroundImage: `url(http://lorempixel.com/80/80/abstract/${index})` }}
                       styleName='product'
                       onClick={this.onProductClick}/>
                )}
              </div>
              <div styleName='content'>
                <h3 styleName='title'>Erin Lindsay in Chicago Med</h3>
                <div styleName='description'>
                  Taken from Season 2 Episode 5 — Extreme Measures
                </div>
                <div styleName='topic-links'>
                  <Link styleName='topic-link' to='#'>Gabriel Macht</Link>
                  <Link styleName='topic-link' to='#'>Harvey Specter</Link>
                  <Link styleName='topic-link' to='#'>Red Carpet</Link>
                  <Link styleName='topic-link' to='#'>Tom Ford</Link>
                  <Link styleName='topic-link' to='#'>Suits</Link>
                  <Link styleName='topic-link' to='#'>Series</Link>
                  <Link styleName='topic-link' to='#'>Suit</Link>
                </div>
              </div>
              <div styleName='footer'>
                <Link styleName='likes' to='#'>
                  <i><IconHeart/></i>
                  <span>24</span>
                </Link>
                <div styleName='users'>
                  <Users large />
                </div>
                <Link styleName='moar' to='#'>
                  <i><IconForward/></i>
                </Link>
              </div>
            </div>
            <div styleName='topics'>
              <div styleName='topics-content'>
                <div styleName='topics-title'>Related Topics</div>
                <Topics/>
              </div>
            </div>
            <div styleName='spotts'>
              <div styleName='spotts-title'>Similar Spotts</div>
              <div styleName='spotts-list'>
                {new Array(9).fill(1).map((item, index) =>
                  <Card key={`modal_card_${index}`} />
                )}
              </div>
            </div>
          </div>
          <Sidebars item={this.state.sidebarItem} onSidebarClose={this.onSidebarClose} />
        </div>
      </ReactModal>
    );
  }
}
