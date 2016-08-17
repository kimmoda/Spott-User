import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router';
import { ERROR, FETCHING, LAZY, LOADED, UPDATING } from '../../data/statusTypes';

export const RadiumLink = Radium(Link);

const crossImage = require('./cross.svg');

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
  white: '#ffffff'
};

export const fontWeights = {
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold'
};

export const mediaQueryThresholds = {
  extraSmall: 0,
  small: 480,
  medium: 768,
  large: 992,
  extraLarge: 1200
};
export const mediaQueries = {
  small: `@media only screen and (min-width: ${mediaQueryThresholds.small}px)`,
  medium: `@media only screen and (min-width: ${mediaQueryThresholds.medium}px)`,
  large: `@media only screen and (min-width: ${mediaQueryThresholds.large}px)`,
  extraLarge: `@media only screen and (min-width: ${mediaQueryThresholds.extraLarge}px)`
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 1
  },
  content: {
    // Set width and center horizontally
    margin: 'auto',
    // maxWidth: 420,
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

// const dialogButtonStyle = {
//   backgroundColor: '#ffffff',
//   position: 'absolute',
//   top: 0,
//   right: 0,
//   height: '2.5em',
//   width: '2.5em'
// };

export const Modal = Radium((props) => (
  <ReactModal
    isOpen={props.isOpen}
    style={dialogStyle}
    onRequestClose={props.onClose}>
    <div style={{ position: 'relative' }}>
      {/* Although this is a button, we chose a <div> for accessibility.
          The dialog can be canceled by pressing 'escape', so we remove the
          cross from tab focus. */}
      {/* <div style={dialogButtonStyle} onClick={props.onClick}>
        <img alt='Close' src={crossImage} />
      </div> */}
      {props.children}
    </div>
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
  padding: '0.85em 2.45em',
  ':hover': {
    backgroundColor: 'rgba(207, 49, 91, 0.6)'
  },
  ':focus': {
    backgroundColor: 'rgba(207, 49, 91, 0.6)'
  }
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
  return (
    <a
      href='#'
      style={[ shareButtonStyle, props.style ]}
      onClick={(e) => {
        e.preventDefault();
        const left = (screen.width / 2) - 300;
        const top = (screen.height / 2) - 200;
        window.open(props.href, 'name', `width=600,height=400,top=${top},left=${left}`);
      }}>
      <svg style={shareIconStyle} viewBox='0 0 481.6 481.6' xmlns='http://www.w3.org/2000/svg'>
        <path d='M381.6 309.4c-27.7 0-52.4 13.2-68.2 33.6l-132.3-73.9c3.1-8.9 4.8-18.5 4.8-28.4 0-10-1.7-19.5-4.9-28.5l132.2-73.8c15.7 20.5 40.5 33.8 68.3 33.8 47.4 0 86.1-38.6 86.1-86.1S429 0 381.5 0s-86.1 38.6-86.1 86.1c0 10 1.7 19.6 4.9 28.5l-132.1 73.8c-15.7-20.6-40.5-33.8-68.3-33.8-47.4 0-86.1 38.6-86.1 86.1s38.7 86.1 86.2 86.1c27.8 0 52.6-13.3 68.4-33.9l132.2 73.9c-3.2 9-5 18.7-5 28.7 0 47.4 38.6 86.1 86.1 86.1s86.1-38.6 86.1-86.1-38.7-86.1-86.2-86.1zm0-282.3c32.6 0 59.1 26.5 59.1 59.1s-26.5 59.1-59.1 59.1-59.1-26.5-59.1-59.1 26.6-59.1 59.1-59.1zM100 299.8c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.6 59.1-59.1 59.1zm281.6 154.7c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.5 59.1-59.1 59.1z'/>
      </svg>
      <span style={shareTextStyle}>&nbsp;{props.children}</span>
    </a>
  );
});

Button.propTypes = {
  children: PropTypes.node,
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

// Container component
// ///////////////////

const scalableContainerStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  paddingLeft: '1em',
  paddingRight: '1em',
  [mediaQueries.medium]: {
    paddingLeft: '3em',
    paddingRight: '3em'
  },
  [mediaQueries.large]: {
    paddingLeft: '4em',
    paddingRight: '4em'
  },
  [mediaQueries.extraLarge]: {
    paddingLeft: '6.5em',
    paddingRight: '6.5em'
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
    ...makeTextStyle(fontWeights.bold, '0.750em', '0.317em'),
    color: colors.coolGray,
    display: 'inline-block',
    paddingTop: '1.6296em',
    paddingBottom: '1.6296em',
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '14.815em'
  },
  active: {
    borderBottom: `4px solid ${colors.darkPink}`,
    color: colors.white
  }
};
export const SubmenuItem = Radium(({ name, pathname }) => (
  <li style={submenuItemStyles.container}>
    <RadiumLink activeStyle={submenuItemStyles.active} key={pathname} style={submenuItemStyles.base} to={pathname}>
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
    listStyleType: 'none'
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

export class Money extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string
  }

  render () {
    const { amount, currency } = this.props;
    if (typeof amount !== 'number' || !currency) {
      return <span>&nbsp;</span>;
    }
    switch (currency) {
      case 'EUR':
        return (<span>€ {amount}</span>);
      case 'USD':
        return (<span>$ {amount}</span>);
      default:
        return (<span>{amount} {currency}</span>);
    }
  }
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
