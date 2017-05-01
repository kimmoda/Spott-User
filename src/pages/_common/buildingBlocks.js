import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ERROR, FETCHING, LAZY, LOADED, UPDATING } from '../../data/statusTypes';
import localized from './localized';

export const RadiumLink = Radium(Link);

// const crossImage = require('./cross.svg');

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

// Dialog styles
// /////////////

export const dialogStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000
  },
  content: {
    // Set width and center horizontally
    margin: 'auto',
    maxWidth: 420,
    width: '90%',
    left: 10,
    right: 10,
    // Internal padding
    padding: 0,
    // Fit height to content, centering vertically
    bottom: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    overflowY: 'scroll'
  }
};

export const largeDialogStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
    overflow: 'auto'
  },
  content: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    maxWidth: '90%',
    // Fit width to content, centering horizontally
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
    top: '5em',
    bottom: '5em',
    overflow: 'visible'
  }
};

export const smallDialogStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
    overflow: 'auto'
  },
  content: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    left: '50%',
    top: '50%',
    right: 'auto',
    transform: 'translateX(-50%) translateY(-50%)',
    bottom: '5em',
    overflow: 'visible'
  }
};

// const dialogButtonStyle = {
//   backgroundColor: '#ffffff',
//   position: 'absolute',
//   top: 0,
//   right: 0,
//   height: '2.5em',
//   width: '2.5em'
// };
class RemoveBodyScrollbar extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
  }
  render () {
    return this.props.children;
  }
}
export const Modal = Radium((props) => (
  <ReactModal
    isOpen={props.isOpen}
    style={props.style || dialogStyle}
    onAfterOpen={() => {
    }}
    onRequestClose={() => {
      props.onClose();
    }}>
      {/* Although this is a button, we chose a <div> for accessibility.
          The dialog can be canceled by pressing 'escape', so we remove the
          cross from tab focus. */}
      {/* <div style={dialogButtonStyle} onClick={props.onClick}>
        <img alt='Close' src={crossImage} />
      </div> */}
      <RemoveBodyScrollbar>
        {props.children}
      </RemoveBodyScrollbar>
  </ReactModal>
));

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

// Button component
// ////////////////

export const buttonStyle = {
  ...makeTextStyle(fontWeights.bold, '0.875em', '0.013em', '1em'),
  backgroundColor: 'rgba(255, 255, 255, 0)',
  borderStyle: 'solid',
  borderWidth: ' 1px',
  borderColor: `${colors.white}`,
  borderRadius: 0,
  boxShadow: 'none',
  color: colors.white,
  cursor: 'pointer',
  display: 'inline-block',
  outline: 0,
  padding: '0.625em 1.375em',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'background-color 0.5s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  ':focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
};
export const pinkButtonStyle = {
  borderRadius: '6.25em',
  backgroundColor: colors.darkPink,
  borderColor: colors.darkPink,
  fontSize: '0.688em',
  letterSpacing: '0.219em',
  padding: '0.85em 1.65em',
  ':hover': {
    backgroundColor: 'rgba(207, 49, 91, 0.6)'
  },
  ':focus': {
    backgroundColor: 'rgba(207, 49, 91, 0.6)'
  }
};
export const darkButtonStyle = {
  ...makeTextStyle(fontWeights.bold, '0.875em', '0.013em', '1em'),
  borderStyle: 'solid',
  borderWidth: ' 1px',
  borderRadius: '6.25em',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'background-color 0.5s ease',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  borderColor: colors.coolGray,
  fontSize: '0.688em',
  letterSpacing: '0.219em',
  padding: '0.85em 1.65em',
  color: colors.coolGray,
  cursor: 'pointer',
  display: 'inline-block',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  ':focus': {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  }
};
export const greenButtonStyle = {
  ...makeTextStyle(fontWeights.bold, '0.875em', '0.013em', '1em'),
  border: '0',
  borderRadius: '6.25em',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'background-color 0.5s ease',
  backgroundColor: colors.coolGreen,
  fontSize: '0.688em',
  letterSpacing: '0.219em',
  padding: '0.85em 34px',
  color: colors.white,
  cursor: 'pointer',
  display: 'inline-block',
  ':hover': {
    opacity: 0.8
  },
  ':focus': {
    opacity: 0.9
  },
  disabled: {
    backgroundColor: colors.coolGray,
    cursor: 'default',
    pointerEvents: 'none'
  }
};
export const greyButtonStyle = {
  ...greenButtonStyle,
  backgroundColor: colors.coolGray
};
const disabledButtonStyle = {
  opacity: 0.3
};
const disabledLinkButtonStyle = {
  opacity: 0.3,
  pointerEvents: 'none',
  cursor: 'default'
};
export const Button = Radium((props) => {
  const disabled = Boolean(props.disabled);
  if (!props.href && !props.to) {
    return <button {...props} style={[ buttonStyle, props.style, disabled && disabledButtonStyle ]}>{props.children}</button>;
  } else if (props.href) {
    return <a {...props} style={[ buttonStyle, props.style, disabled && disabledLinkButtonStyle ]}>{props.children}</a>;
  }
  return <RadiumLink {...props} style={[ buttonStyle, props.style, disabled && disabledLinkButtonStyle ]}>{props.children}</RadiumLink>;
});
Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array ])
};

const shareButtonStyle = {
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: '0.125em',
  borderColor: colors.coolGray,
  color: colors.coolGray,
  textDecoration: 'none',
  fill: colors.coolGray,
  borderRadius: '20em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '0.188em',
  paddingBottom: '0.188em',
  paddingLeft: '0.625em',
  paddingRight: '0.625em',
  ':hover': {
    borderColor: colors.dark,
    color: colors.dark,
    fill: colors.dark
  }
};
const shareTextStyle = {
  ...makeTextStyle(fontWeights.bold, '0.688em'),
  textTransform: 'uppercase',
  letterSpacing: '0.219em',
  lineHeight: 0
};

const shareIconStyle = {
  width: '1em',
  height: '1em'
};

export const ShareButton = Radium((props) => {
  const disabled = Boolean(props.disabled);
  return (
    <a
      href='#'
      style={[ shareButtonStyle, props.style, disabled && disabledButtonStyle ]}
      onClick={(e) => {
        e.preventDefault();
        if (props.href && !disabled) {
          const left = (screen.width / 2) - 300;
          const top = (screen.height / 2) - 200;
          window.open(props.href, 'name', `width=600,height=400,top=${top},left=${left}`);
        }
      }}>
      <svg style={shareIconStyle} viewBox='0 0 481.6 481.6' xmlns='http://www.w3.org/2000/svg'>
        <path d='M381.6 309.4c-27.7 0-52.4 13.2-68.2 33.6l-132.3-73.9c3.1-8.9 4.8-18.5 4.8-28.4 0-10-1.7-19.5-4.9-28.5l132.2-73.8c15.7 20.5 40.5 33.8 68.3 33.8 47.4 0 86.1-38.6 86.1-86.1S429 0 381.5 0s-86.1 38.6-86.1 86.1c0 10 1.7 19.6 4.9 28.5l-132.1 73.8c-15.7-20.6-40.5-33.8-68.3-33.8-47.4 0-86.1 38.6-86.1 86.1s38.7 86.1 86.2 86.1c27.8 0 52.6-13.3 68.4-33.9l132.2 73.9c-3.2 9-5 18.7-5 28.7 0 47.4 38.6 86.1 86.1 86.1s86.1-38.6 86.1-86.1-38.7-86.1-86.2-86.1zm0-282.3c32.6 0 59.1 26.5 59.1 59.1s-26.5 59.1-59.1 59.1-59.1-26.5-59.1-59.1 26.6-59.1 59.1-59.1zM100 299.8c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.6 59.1-59.1 59.1zm281.6 154.7c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.5 59.1-59.1 59.1z'/>
      </svg>
      <span style={shareTextStyle}>&nbsp;{props.children}</span>
    </a>
  );
});

ShareButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

// Container component
// ///////////////////

const containerStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  paddingLeft: '0.9375em',
  paddingRight: '0.9375em',
  [mediaQueries.medium]: {
    paddingLeft: 0,
    paddingRight: 0,
    width: 738
  },
  [mediaQueries.large]: {
    width: 962
  },
  [mediaQueries.extraLarge]: {
    width: 1170
  },
  [mediaQueries.extraExtraLarge]: {
    width: 1400
  }
};

export const Container = Radium((props) => (
  <div {...props} style={[ containerStyles, props.style ]}>
    {props.children}
  </div>
));
Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

const smallContainerStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  paddingLeft: '0.9375em',
  paddingRight: '0.9375em',
  [mediaQueries.medium]: {
    paddingLeft: 0,
    paddingRight: 0,
    width: 570
  },
  [mediaQueries.large]: {
    width: 658
  },
  [mediaQueries.extraLarge]: {
    width: 882
  },
  [mediaQueries.extraExtraLarge]: {
    width: 1170
  }
};

export const SmallContainer = Radium((props) => (
  <div {...props} style={[ smallContainerStyles, props.style ]}>
    {props.children}
  </div>
));
SmallContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};
// Container component
// ///////////////////

const scalableContainerStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  // paddingLeft: '1em',
  // paddingRight: '1em',
  [mediaQueries.medium]: {
    // paddingLeft: '3em',
    // paddingRight: '3em',
    maxWidth: 738
  },
  [mediaQueries.large]: {
    // paddingLeft: '4em',
    // paddingRight: '4em',
    maxWidth: 962
  },
  [mediaQueries.extraLarge]: {
    // paddingLeft: '6.5em',
    // paddingRight: '6.5em',
    maxWidth: 1170
  },
  [mediaQueries.extraExtraLarge]: {
    maxWidth: 1400
  }
};
export const ScalableContainer = Radium((props) => (
  <div style={[ scalableContainerStyles, props.style ]}>
    {props.children}
  </div>
));
ScalableContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

// SectionTitle Component
// //////////////////////

const titleStyle = {
  ...makeTextStyle(fontWeights.light, '3.75em', '0.0168em'),
  color: colors.dark,
  fontWeight: 300
};
export const Title = Radium((props) => {
  return <h1 {...props} style={[ titleStyle, props.style ]}>{props.children}</h1>;
});
Title.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

const sectionTitleStyle = {
  ...makeTextStyle(fontWeights.light, '1.438em', '0.031em'),
  color: colors.dark,
  marginBottom: '1.304em'
};
export const SectionTitle = Radium((props) => {
  return <h2 {...props} style={[ sectionTitleStyle, props.style ]}>{props.children}</h2>;
});
SectionTitle.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

const upperCaseSubtitleStyle = {
  ...makeTextStyle(fontWeights.light, '0.688em', '0.318em'),
  color: colors.dark,
  textTransform: 'uppercase'
};

export const UpperCaseSubtitle = Radium((props) => {
  return <h3 {...props} style={[ upperCaseSubtitleStyle, props.style ]}>{props.children}</h3>;
});
UpperCaseSubtitle.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

const messageStyle = {
  ...makeTextStyle(fontWeights.light, '0.9em', '0.0168em'),
  color: colors.dark,
  paddingTop: '1.5em',
  paddingBottom: '1.5em'
};
export const Message = Radium((props) => {
  return <div {...props} style={[ messageStyle, props.style ]}>{props.children}</div>;
});
Message.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

// Submenu and submenuitem styles
// //////////////////////////////

const submenuItemStyles = {
  container: {
    display: 'block',
    float: 'left'
  },
  base: {
    ...makeTextStyle(fontWeights.bold, '0.75em', '0.237em'),
    paddingBottom: '1em',
    paddingTop: '1em',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
    borderBottomWidth: 4,
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(0, 0, 0, 0)',
    color: colors.coolGray,
    textTransform: 'uppercase',
    paddingLeft: '1em',
    paddingRight: '1em',
    [mediaQueries.medium]: {
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: '14.5em'
    }
  },
  active: {
    borderBottomColor: colors.darkPink,
    color: colors.white
  }
};
export const SubmenuItem = Radium(({ name, pathname, style }) => (
  <li style={submenuItemStyles.container}>
    <RadiumLink activeStyle={submenuItemStyles.active} key={pathname} style={{ ...submenuItemStyles.base, ...style }} to={pathname}>
      {name}
    </RadiumLink>
  </li>
));
SubmenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired
};

const submenuStyles = {
  container: {
    display: 'block',
    listStyleType: 'none',
    position: 'relative'
  }
};
export const Submenu = Radium(({ children, style }) => (
  <ul className='cf' style={[ submenuStyles.container, style ]}>
    {children}
  </ul>
));
Submenu.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

// Fade out
// ////////

const fadeOutStyle = {
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
  position: 'absolute',
  width: '4em',
  right: 0,
  top: 0,
  bottom: 5
};

export const FadeOutScalableContainer = Radium((props) => (
  <div style={{ position: 'relative' }}>
    <ScalableContainer>
      {props.children}
    </ScalableContainer>
    <div style={fadeOutStyle} />
  </div>
));

FadeOutScalableContainer.propTypes = {
  children: PropTypes.node
};

// Money
// /////
//
// export class Money extends Component {
//   static propTypes = {
//     amount: PropTypes.number,
//     currency: PropTypes.string
//   }
//
//   render () {
//     const { amount, currency } = this.props;
//     if (typeof amount !== 'number' || !currency) {
//       return <span>&nbsp;</span>;
//     }
//     switch (currency) {
//       case 'EUR':
//         return (<span>€ {amount}</span>);
//       case 'USD':
//         return (<span>$ {amount}</span>);
//       default:
//         return (<span>{amount} {currency}</span>);
//     }
//   }
// }

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

// Checkbox Input

export const checkboxStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '0.278em 0'
  },
  input: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none'
  },
  marker: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.coolGray}`,
    borderRadius: 3,
    cursor: 'pointer',
    display: 'flex',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    checked: {
      backgroundColor: colors.dark
    }
  },
  markerText: {
    display: 'block',
    backgroundColor: colors.cool,
    color: colors.whiteGray,
    fontSize: '16px',
    height: '18px',
    transform: 'scaleX(1.3)',
    pointerEvents: 'none'
  },
  label: {
    base: {
      fontSize: '14px',
      color: colors.coolGray,
      cursor: 'pointer',
      fontWeight: 'normal',
      paddingLeft: '10px',
      paddingBottom: 0,
      position: 'relative',
      alignItems: 'center'
    },
    error: {
      color: '#ff0000'
    }
  }
};
export const checkbox = Radium((props) => {
  function onClick (e) {
    // Cancel if disabled
    if (props.disabled) {
      return;
    }
    // Trigger change
    const newValue = !props.input.value;
    props.input.onChange(newValue);
  }

  return (
    <div style={checkboxStyles.container}>
      <input
        checked={props.input.value}
        id={props.input.name}
        style={checkboxStyles.input}
        type='checkbox'
        {...props.input} />
      <span style={[ checkboxStyles.marker, props.input.value && checkboxStyles.marker.checked ]} onClick={onClick}>
        {props.input.value && <span style={checkboxStyles.markerText}>✓</span>}
      </span>
      <label
        htmlFor={props.input.name}
        style={[ checkboxStyles.label.base, props.submitFailed && props.meta.touched && props.meta.error && checkboxStyles.label.error ]}>
        {props.text}
      </label>
    </div>
  );
});

export const textInputStyle = {
  width: '100%',
  height: '40px',
  borderRadius: '2px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: colors.borderGrey,
  fontSize: '14px',
  paddingLeft: '13px'
};
