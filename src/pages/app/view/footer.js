import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { colors, Container, fontWeights, makeTextStyle, mediaQueries } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import Radium from 'radium';

const RadiumLink = Radium(Link);

const styles = {
  wrapper: {
    backgroundColor: colors.dark,
    paddingTop: '0.9375em',
    paddingBottom: '0.9375em'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  languageSelection: {
    ...makeTextStyle(fontWeights.regular, '0.813em', '0.031em'),
    color: colors.coolGray,
    flex: '1 1 100%',
    width: '100%',
    textAlign: 'center',
    [mediaQueries.medium]: {
      width: 'auto',
      flex: '0 0 auto',
      textAlign: 'left'
    }
  },
  languageSelectionCurrent: {
    ...makeTextStyle(fontWeights.regular),
    color: colors.white,
    display: 'inline-block'
  },
  menu: {
    flex: '1 1 100%',
    width: '100%',
    textAlign: 'center',
    lineHeight: '1em',
    margin: '0 auto',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    [mediaQueries.medium]: {
      width: 'auto',
      flex: '1',
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  menuSeparator: {
    ...makeTextStyle(fontWeights.regular, '0.813em', '0.031em'),
    color: colors.coolGray,
    display: 'inline-block',
    [mediaQueries.medium]: {
      display: 'none'
    }
  },
  menuItem: {
    ...makeTextStyle(fontWeights.regular, '0.813em', '0.031em'),
    color: colors.coolGray,
    display: 'inline-block',
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
    textDecoration: 'none',
    [mediaQueries.medium]: {
      paddingLeft: '1.385em',
      paddingRight: '1.385em'
    }
  },
  copyright: {
    ...makeTextStyle(fontWeights.regular, '0.813em', '0.031em'),
    color: colors.coolGray,
    flex: '1 1 100%',
    width: '100%',
    textAlign: 'center',
    [mediaQueries.medium]: {
      width: 'auto',
      flex: '0 0 auto',
      textAlign: 'left'
    }
  }
};
@localized
@Radium
export default class Footer extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    const { t } = this.props;
    return (
      <footer style={styles.wrapper}>
        <Container className='cf' style={styles.container}>
          <div style={styles.languageSelection}>
            {t('_common.footer.language', {}, (_, key) => (
              <div style={styles.languageSelectionCurrent}>English</div>
            ))}
          </div>
          <div style={styles.menu}>
            <RadiumLink style={styles.menuItem} to='/terms'>{t('_common.footer.terms')}</RadiumLink>
            <span style={styles.menuSeparator}>/</span>
            <RadiumLink style={styles.menuItem} to='/privacy'>{t('_common.footer.privacy')}</RadiumLink>
          </div>
          <div style={styles.copyright}>
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
