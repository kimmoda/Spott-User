import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

require('./footer.scss');

const facebookImage = require('./facebook.svg');
const linkedInImage = require('./linkedin.svg');
const twitterImage = require('./twitter.svg');

export default class Footer extends Component {
  static propTypes = {
    absolute: PropTypes.bool,
    hide: PropTypes.bool
  }

  componentDidMount () {
    if (this.props.hide) {
      $(window).on('wheel', (e) => {
        if (e.originalEvent.deltaY > 0) {
          this.hide();
        } else if (e.originalEvent.deltaY < 0) {
          this.show();
        }
      });
    }
  }

  hide () {
    $('section.footer').addClass('hidden');
  }

  show () {
    $('section.footer').removeClass('hidden');
  }

  render () {
    return (
      <section className={`${(this.props.absolute ? 'footer absolute ' : 'footer ')} ${(this.props.hide ? 'hidden' : '')}`} id='get-in-touch'>
        <div className='wrapper footer__container cf'>
          <div className='social__container'>
            <a href='https://www.facebook.com/Spott.it/' target='_blank'>
              <img src={facebookImage} />
            </a>
            <a href='https://www.linkedin.com/company/appiness' target='_blank'>
              <img src={linkedInImage} />
            </a>
            <a href='https://twitter.com/SPOTT_it' target='_blank'>
              <img src={twitterImage} />
            </a>
          </div>
          <div className='footer__info'>
            <p>Want to get involved with Spott?</p>
            <p>Mail us at <a href='mailto:info@spott.it'>info@spott.it</a></p>
          </div>
          <div className='footer__info footer__info--copyright'>
            <p className='info__fat'>Copyright 2016 • Appiness NV • All rights reserved</p>
            <p><Link to='/terms'>Terms</Link> • <Link to='/privacy'>Privacy</Link> • made with <span className='heart'></span> in Belgium</p>
          </div>
        </div>
      </section>
    );
  }
}
