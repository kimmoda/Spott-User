import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ERROR, FETCHING, LAZY, LOADED, UPDATING } from '../../data/statusTypes';
import localized from './localized';

export const RadiumLink = Radium(Link);

// Constants
// /////////

export const colors = {
  dark: '#221f26',
  whiteGray: '#f9f9f9',
  darkPink: '#cf315b',
  charcoalGray: '#38353c',
  charcoal: '#161b15',
  cool: '#221f26',
  coolGray: '#a7a6a9',
  green: '#1ab61a',
  slateGray: '#59575c',
  whiteThree: '#e9e9e9',
  whiteTwo: '#fcfcfc',
  white: '#ffffff',
  yellow: '#f6bf26',
  coolGreen: '#2ecb70',
  borderGrey: '#d7d7d7'
};

export const fontWeights = {
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold'
};

export const mediaQueryThresholds = {
  mobile: 420,
  extraSmall: 0,
  small: 480,
  medium: 768,
  large: 992,
  extraLarge: 1200,
  extraExtraLarge: 1700
};
export const mediaQueries = {
  mobile: `@media only screen and (max-width: ${mediaQueryThresholds.mobile}px)`,
  small: `@media only screen and (min-width: ${mediaQueryThresholds.small}px)`,
  medium: `@media only screen and (min-width: ${mediaQueryThresholds.medium}px)`,
  large: `@media only screen and (min-width: ${mediaQueryThresholds.large}px)`,
  extraLarge: `@media only screen and (min-width: ${mediaQueryThresholds.extraLarge}px)`,
  extraExtraLarge: `@media only screen and (min-width: ${mediaQueryThresholds.extraExtraLarge}px)`
};

@Radium
export class Spinner extends Component {

  static styles = {
    container: {
      width: '40px',
      height: '40px',
      margin: '40px auto',
      backgroundColor: colors.coolGray,
      borderRadius: '100%',
      animation: 'x 1s ease-in-out infinite',
      animationName: Radium.keyframes({
        '0%': {
          transform: 'scale(0)',
          opacity: 0.5
        },
        '100%': {
          transform: 'scale(1.0)',
          opacity: 0
        }
      }, 'spinner')
    }
  };

  render () {
    return (
      <div style={this.constructor.styles.container} />
    );
  }
}

// Utilities
// /////////

const currencies = {
  EUR: '€',
  GBP: '£',
  USD: '$'
};

export function formatPrice (price) {
  if (price && price.get('amount')) {
    // Try to use symbol.
    const currency = currencies[price.get('currency')];
    if (currency) {
      return `${currency} ${price.get('amount').toFixed(2)}`;
    }
    return `${price.get('amount').toFixed(2)} ${price.get('currency')}`;
  }
  return '\u00a0';
}

export function makeTextStyle (fontWeight = fontWeights.regular, fontSize = '1em', letterSpacing = 0, lineHeight = 'normal') {
  return {
    fontFamily: fontWeight,
    fontSize,
    letterSpacing,
    lineHeight
  };
}

// Load an item or a list.
export function load (item, renderItem, renderSpinner, renderNotFound, renderUnexpectedComponent, renderEmptyComponent) {
  // Render spinner when FETCHING or LAZY
  if (!item.get('_status') || item.get('_status') === FETCHING || item.get('_status') === LAZY) {
    return (renderSpinner && renderSpinner()) || <Spinner />;
  }
  // When loaded, render items, or empty if there are none.
  if (item.get('_status') === LOADED || item.get('_status') === UPDATING) {
    if (item.get('data') && item.get('data').size === 0) {
      return (renderEmptyComponent && renderEmptyComponent()) || <div />;
    }
    return renderItem(item);
  }
  // In case of an error, render not found or unexpected, depending on the error.
  if (item.get('_status') === ERROR && item.get('_error').name === 'NotFoundError') {
    return (renderNotFound && renderNotFound()) || <div />;
  }
  return (renderUnexpectedComponent && renderUnexpectedComponent()) || <div />;
}

@localized
@Radium
export class LoadComponent extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    item: ImmutablePropTypes.mapContains({
      _error: PropTypes.object,
      _status: PropTypes.string,
      data: ImmutablePropTypes.list
    }),
    renderEmpty: PropTypes.func,
    renderInContainer: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    renderNotFound: PropTypes.func,
    renderSpinner: PropTypes.func,
    renderUnexpected: PropTypes.func,
    t: PropTypes.func.isRequired
  };

  static styles = {
    return: {
      ...makeTextStyle(fontWeights.bold),
      color: colors.dark,
      textDecoration: 'none'
    }
  };

  renderInContainer (children) {
    const { renderInContainer } = this.props;
    return (renderInContainer && renderInContainer(children)) || <div>{children}</div>;
  }

  render () {
    const styles = this.constructor.styles;
    const { currentLocale, item, renderItem, renderEmpty, renderNotFound, renderSpinner, renderUnexpected, t } = this.props;
    // Render spinner when FETCHING or LAZY
    if (!item.get('_status') || item.get('_status') === FETCHING || item.get('_status') === LAZY) {
      return (renderSpinner && this.renderInContainer(renderSpinner())) || this.renderInContainer(<Spinner />);
    }
    // When loaded, render items, or empty if there are none.
    if (item.get('_status') === LOADED || item.get('_status') === UPDATING) {
      if (item.get('data') && item.get('data').size === 0) {
        return (renderEmpty && this.renderInContainer(renderEmpty())) || this.renderInContainer(t('common.empty'));
      }
      return renderItem(item);
    }
    // In case of an error, render not found or unexpected, depending on the error.
    if (item.get('_status') === ERROR && item.get('_error').name === 'NotFoundError') {
      return (renderNotFound && this.renderInContainer(renderNotFound())) || this.renderInContainer(<span>{t('common.notExist')} <Link style={styles.return} to={`/${currentLocale}`}>{t('common.return')}</Link></span>);
    }
    return (renderUnexpected && this.renderInContainer(renderUnexpected())) || this.renderInContainer(t('common.unexpected'));
  }

}

// Same for media or characters.
export function responsiveBackgroundImage (url) {
  return {
    backgroundImage: `url("${url}?height=422&width=750")`,
    [mediaQueries.large]: {
      backgroundImage: `url("${url}?height=699&width=1242")`
    },
    [mediaQueries.extraLarge]: {
      backgroundImage: `url("${url}?height=985&width=1750")`
    },
    [mediaQueries.extraExtraLarge]: {
      backgroundImage: `url("${url}?height=1125&width=2000")`
    }
  };
}
