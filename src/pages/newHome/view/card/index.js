/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconHeart, IconForward } from '../icons';
import CardModal from '../cardModal';
import CardMarkers from '../cardMarkers';
import Users from '../users/index';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Card extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCardClick = ::this.onCardClick;
    this.onCardModalClose = ::this.onCardModalClose;
    this.state = {
      isCardModalOpen: false
    };
    this.images = [
      'http://lorempixel.com/280/249/people/1',
      'http://lorempixel.com/280/220/abstract/1',
      'http://lorempixel.com/280/350/abstract/2',
      'http://lorempixel.com/280/400/abstract/3',
      'http://lorempixel.com/280/200/abstract/4',
      'http://lorempixel.com/280/190/abstract/5',
      'http://lorempixel.com/280/430/abstract/6',
      'http://lorempixel.com/280/215/abstract/7',
      'http://lorempixel.com/280/390/abstract/8',
      'http://lorempixel.com/280/310/abstract/9',
      'http://lorempixel.com/280/290/abstract/10'
    ];

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

  onCardClick () {
    this.setState({ isCardModalOpen: true });
  }

  onCardModalClose () {
    this.setState({ isCardModalOpen: false });
  }

  render () {
    return (
      <div styleName='card'>
        {this.state.isCardModalOpen && <CardModal onClose={this.onCardModalClose}/>}
        <div styleName='image' onClick={this.onCardClick}>
          <img src={this.images[Math.floor(Math.random() * this.images.length)]}/>
          <CardMarkers/>
          <Link
            style={{ backgroundImage: `url(${this.users[Math.floor(Math.random() * this.users.length)]})` }}
            styleName='person' to='#'/>
        </div>
        <div styleName='content'>
          <div styleName='reason'>
            Because you subscribed to Chicago Med
          </div>
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
            <Users/>
          </div>
          <Link styleName='moar' to='#'>
            <i><IconForward/></i>
          </Link>
        </div>
      </div>
    );
  }
}
