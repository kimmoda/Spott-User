import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { colors, Container, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';

const footerStyles = {
  wrapper: {
    backgroundColor: colors.dark,
    paddingTop: '15px',
    paddingBottom: '15px',
    textAlign: 'center'
  },
  languageSelection: {
    ...makeTextStyle(fontWeights.regular, '0.813em', '0.031em'),
    float: 'left',
    color: colors.coolGray
  },
  languageSelectionCurrent: {
    ...makeTextStyle(fontWeights.regular),
    color: colors.white,
    display: 'inline-block'
  },
  menu: {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  menuItem: {
    ...makeTextStyle(fontWeights.regular, '0.813em', '0.031em'),
    color: colors.coolGray,
    display: 'inline-block',
    paddingLeft: '1.385em',
    paddingRight: '1.385em',
    textDecoration: 'none'
  },
  copyright: {
    ...makeTextStyle(fontWeights.regular, '0.813em', '0.031em'),
    color: colors.coolGray,
    float: 'right'
  }
};
@localized
export default class Footer extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    const { t } = this.props;
    return (
      <footer style={footerStyles.wrapper}>
        <Container>
          <div style={footerStyles.languageSelection}>
            {t('_common.footer.language', {}, (_, key) => (
              <div style={footerStyles.languageSelectionCurrent}>English</div>
            ))}
          </div>
          <div style={footerStyles.menu}>
            <Link style={footerStyles.menuItem} to='/terms'>{t('_common.footer.terms')}</Link>
            <Link style={footerStyles.menuItem} to='/privacy'>{t('_common.footer.privacy')}</Link>
          </div>
          <div style={footerStyles.copyright}>
            {t('_common.footer.copyright')}
          </div>
        </Container>
        {/*
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
            <p> •  • {t('_common.footer.madeWithLove', {}, (_, key) => <span className='heart' key={key}></span>)}</p>
          </div>
        </div>*/}
      </footer>
    );
  }
}
