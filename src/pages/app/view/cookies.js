
import React, { Component, PropTypes } from 'react';
import { buttonStyle, colors, fontWeights, makeTextStyle, mediaQueries, Button, Container, RadiumLink } from '../../_common/buildingBlocks';
import Dropdown from '../../_common/dropdown';
import localized from '../../_common/localized';
import Radium from 'radium';
import { localesHash, locales } from '../../../locales';
import cookie from 'react-cookie';

const styles = {
  link: {
    ...makeTextStyle(fontWeights.medium, '0.875em', '0.0187em'),
    color: colors.dark,
    textDecoration: 'none'
  },
  wrapper: {
    fontSize: '16px',
    color: colors.slateGray,
    backgroundColor: 'rgba(215, 215, 215, 0.95)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: '1.5em',
    paddingBottom: '1.5em',
    zIndex: 100
  },
  left: {
    float: 'left',
    fontSize: '16px'
  },
  text: {
    fontSize: '0.875em'
  },
  button: {
    borderRadius: '6.25em',
    backgroundColor: colors.whiteGray,
    color: colors.dark,
    fontSize: '0.688em',
    float: 'right',
    marginTop: '1em',
    marginLeft: '1em',
    [mediaQueries.small]: {
      marginTop: 0
    }
  }
};

@localized
@Radium
export default class Cookies extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onAcceptCookies = ::this.onAcceptCookies;
  }

  onAcceptCookies (e) {
    e.preventDefault();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    // Accept cookies
    cookie.save('acceptCookies', true, { expires: nextYear, path: '/' });
  }

  render () {
    const { currentLocale, style, t } = this.props;

    return (
      <section style={[ styles.wrapper, style ]}>
        <Container>
          <div style={styles.left}>
            <p style={styles.text}>{t('cookies.moreInfo', {}, (content, key) => <RadiumLink style={styles.link} to={`/${currentLocale}/cookies`}>{content}</RadiumLink>)}</p>
            <p style={styles.text}>
              {t('cookies.policy', {}, (content, key) => key === 1
                ? <RadiumLink key='terms' style={styles.link} to={`/${currentLocale}/terms`}>{content}</RadiumLink>
                : <RadiumLink key='privacy' style={styles.link} to={`/${currentLocale}/privacy`}>{content}</RadiumLink>
              )}
            </p>
          </div>
          <Button style={[ buttonStyle, styles.button ]} onClick={this.onAcceptCookies}>{t('cookies.continue')}</Button>
        </Container>
      </section>
    );
  }
}
