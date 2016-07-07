import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import localized from '../localized';

require('./footer.scss');

const facebookImage = require('./facebook.svg');
const linkedInImage = require('./linkedin.svg');
const twitterImage = require('./twitter.svg');

@localized
export default class Footer extends Component {
  static propTypes = {
    absolute: PropTypes.bool,
    hide: PropTypes.bool,
    t: PropTypes.func.isRequired
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
    const { t } = this.props;
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
            <p>{t('_common.footer.getInvolved')}</p>
            <p>{t('_common.footer.getInvolvedMailUs', {}, (_, key) => <a href='mailto:info@spott.it' key={key}>info@spott.it</a>)}</p>
          </div>
          <div className='footer__info footer__info--copyright'>
            <p className='info__fat'>{t('_common.footer.copyright')} • {t('_common.footer.appiness')} • {t('_common.footer.allRightsReserved')}</p>
            <p><Link to='/terms'>{t('_common.footer.terms')}</Link> • <Link to='/privacy'>{t('_common.footer.privacy')}</Link> • {t('_common.footer.madeWithLove', {}, (_, key) => <span className='heart' key={key}></span>)}</p>
          </div>
        </div>
      </section>
    );
  }
}
