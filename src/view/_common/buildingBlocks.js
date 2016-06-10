import Radium from 'radium';
import React, { PropTypes } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router';

const RadiumedLink = Radium(Link);

// Constants
// /////////

export const colors = {
  darkPink: '#cf315b',
  coolGray: '#a7a6a9',
  slateGray: '#59575c',
  whiteTwo: '#fcfcfc',
  white: '#ffffff'
};

export const fontWeights = {
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold'
};

export const mediaQueries = {
  small: '@media only screen and (min-width: 480px)',
  medium: '@media only screen and (min-width: 768px)',
  large: '@media only screen and (min-width: 992px)',
  extraLarge: '@media only screen and (min-width: 1200px)'
};

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

// Button component
// ////////////////

const buttonStyle = {
  ...makeTextStyle(fontWeights.bold, '0.875em', '0.013em', '1em'),
  backgroundColor: 'rgba(255, 255, 255, 0)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: colors.white,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  ':focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
};
export const Button = Radium((props) => {
  if (!props.href) {
    return <button {...props} style={[ buttonStyle, props.style ]}>{props.children}</button>;
  }
  return <a {...props} style={[ buttonStyle, props.style ]}>{props.children}</a>;
});
Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  style: PropTypes.object
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
  <div style={[ containerStyles, props.style ]}>
    {props.children}
  </div>
));
Container.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};

// Page Component
// //////////////

const pageStyles = {
  wrapper: {
    backgroundColor: colors.whiteTwo,
    minHeight: '100%'
  },
  container: {
    paddingTop: '1.875em',
    paddingBottom: '1.875em'
  }
};
export const Page = Radium(({ children, currentPathname, header, submenuItems }) => (
  <div style={pageStyles.wrapper}>
    <Navbar currentPathname={currentPathname}/>
    {header}
    <Container style={pageStyles.container}>
      {submenuItems && <Submenu>{submenuItems}</Submenu>}
      {children}
    </Container>
  </div>
));
Page.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  submenuItems: PropTypes.node
};

// Entity header
// /////////////

const entityHeaderStyles = {
  wrapper: {
    backgroundSize: 'cover',
    position: 'relative'
  },
  backgroundOverlay: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to top, #221f26, rgba(58, 34, 44, 0))'
  },
  container: {
    paddingTop: '20.5%',
    paddingBottom: '3%',
    [mediaQueries.medium]: {
      paddingTop: '9.0625em',
      paddingBottom: '1.1875em'
    },
    [mediaQueries.large]: {
      paddingTop: '11.8125em',
      paddingBottom: '1.5em'
    },
    [mediaQueries.extraLarge]: {
      paddingTop: '14.375em',
      paddingBottom: '1.875em'
    },
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative' // Display in front of background overlay
  },
  contents: {
    flex: '1'
  }
};
export const EntityHeader = Radium(({ backgroundImage, buttons, children }) => (
  <div style={[ entityHeaderStyles.wrapper, { backgroundImage } ]}>
    <div style={entityHeaderStyles.backgroundOverlay}></div>
    <Container style={entityHeaderStyles.container}>
      <div style={entityHeaderStyles.contents}>{children}</div>
      <div>{buttons}</div>
    </Container>
  </div>
));
EntityHeader.propTypes = {
  backgroundImage: PropTypes.string,
  buttons: PropTypes.node,
  children: PropTypes.node.isRequired
};

// Submenu and submenuitem styles
// //////////////////////////////

const submenuItemStyles = {
  container: {
    display: 'inline-block',
    marginRight: '2.8125em'
  },
  base: {
    color: colors.coolGray,
    display: 'inline-block',
    paddingBottom: '1.1875em',
    textDecoration: 'none'
  },
  active: {
    borderBottom: `2px solid ${colors.darkPink}`,
    color: colors.darkPink
  }
};
export const SubmenuItem = Radium(({ name, pathname, style }) => (
  <li style={submenuItemStyles.container}>
    <RadiumedLink activeStyle={{ ...submenuItemStyles.base, ...submenuItemStyles.active, style }} key={pathname} style={[ submenuItemStyles.base, style ]} to={pathname}>
      {name}
    </RadiumedLink>
  </li>
));
SubmenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  style: PropTypes.object
};

const submenuStyles = {
  container: {
    display: 'block',
    listStyleType: 'none',
    paddingBottom: '1.875em'
  }
};
export const Submenu = Radium(({ children, style }) => (
  <ul style={[ submenuStyles.container, style ]}>
    {children}
  </ul>
));
Submenu.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};
