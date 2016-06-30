import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Navbar from './navbar';
import { Link } from 'react-router';

const RadiumedLink = Radium(Link);

// Constants
// /////////

export const colors = {
  dark: '#221f26',
  whiteGray: '#f9f9f9',
  darkPink: '#cf315b',
  coolGray: '#a7a6a9',
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

export const Button = Radium((props) => {
  if (!props.href) {
    return <button {...props} style={[ buttonStyle, props.style ]}>{props.children}</button>;
  }
  return <a {...props} style={[ buttonStyle, props.style ]}>{props.children}</a>;
});
Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array ])
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
  children: PropTypes.node.isRequired,
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
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};

const sectionTitleStyle = {
  ...makeTextStyle(fontWeights.light, '1.438em', '0.031em'),
  color: colors.dark
};
export const SectionTitle = Radium((props) => {
  return <h2 {...props} style={[ sectionTitleStyle, props.style ]}>{props.children}</h2>;
});
SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
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
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};

// Tiles Component
// ///////////////

@Radium
export class Tiles extends Component {

  static propTypes = {
    horizontalSpacing: PropTypes.number.isRequired,
    items: ImmutablePropTypes.listOf(
      PropTypes.any
    ).isRequired,
    numColumns: PropTypes.objectOf(PropTypes.number).isRequired, // Maps screen widths on numColumns
    // The component for rendering the tile. Is cloned with an additional
    // 'value' prop.
    style: PropTypes.object,
    tileRenderer: PropTypes.func.isRequired
  };

  render () {
    const { horizontalSpacing, items, numColumns, style: tilesStyle, tileRenderer } = this.props;

    const style = {
      display: 'inline-block',
      width: `${100 / numColumns.extraSmall}%`,
      paddingLeft: `${horizontalSpacing / 2}em`,
      paddingRight: `${horizontalSpacing / 2}em`,
      [mediaQueries.small]: {
        width: `${100 / numColumns.small}%`
      },
      [mediaQueries.medium]: {
        width: `${100 / numColumns.medium}%`,
        paddingLeft: `${horizontalSpacing}em`,
        paddingRight: `${horizontalSpacing}em`
      },
      [mediaQueries.large]: {
        width: `${100 / numColumns.large}%`
      },
      [mediaQueries.extraLarge]: {
        width: `${100 / numColumns.extraLarge}%`
      }
    };

    // Determine container style
    const containerStyle = {
      overflow: 'visible',
      whiteSpace: 'nowrap',
      position: 'relative',
      marginLeft: `-${horizontalSpacing / 2}em`,
      marginRight: `-${horizontalSpacing / 2}em`,
      [mediaQueries.medium]: {
        marginLeft: `-${horizontalSpacing}em`,
        marginRight: `-${horizontalSpacing}em`
      }
    };

    // Return render result
    return (
      <div style={[ containerStyle, tilesStyle ]}>
        {items.map((item, i) => tileRenderer({ style, key: i, item }))}
      </div>
    );
  }

}

const fadeStyle = {
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0))',
  position: 'absolute',
  width: '6em',
  right: 0,
  top: 0,
  bottom: 5
};

export const FadedTiles = Radium((props) => (
  <div style={{ position: 'relative' }}>
    <ScalableContainer>
      {props.children}
    </ScalableContainer>
    <div style={fadeStyle}></div>
  </div>
));

FadedTiles.propTypes = {
  children: PropTypes.node.isRequired
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
    paddingBottom: '1em',
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
  <div style={[ entityHeaderStyles.wrapper, backgroundImage && { backgroundImage: `url(${backgroundImage})` } ]}>
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
    ...makeTextStyle(fontWeights.medium, '0.8125em', '0.03125em'),
    color: colors.coolGray,
    display: 'inline-block',
    paddingBottom: '1.1875em',
    textDecoration: 'none',
    textTransform: 'uppercase'
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
