import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

const RadiumedLink = Radium(Link);

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
  if (!props.href && !props.to) {
    return <button {...props} style={[ buttonStyle, props.style ]}>{props.children}</button>;
  } else if (props.href) {
    return <a {...props} style={[ buttonStyle, props.style ]}>{props.children}</a>;
  }
  return <RadiumedLink {...props} style={[ buttonStyle, props.style ]}>{props.children}</RadiumedLink>;
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
  <div {...props} style={[ containerStyles, props.style ]}>
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
  color: colors.dark,
  marginBottom: '1.304em'
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
      whiteSpace: 'nowrap',
      position: 'relative',
      marginBottom: '-1em',
      marginLeft: `-${horizontalSpacing / 2}em`,
      marginRight: `-${horizontalSpacing / 2}em`,
      marginTop: '-1em',
      paddingBottom: '1em',
      paddingTop: '1em',
      overflow: 'hidden',
      [mediaQueries.medium]: {
        marginLeft: `-${horizontalSpacing}em`,
        marginRight: `-${horizontalSpacing}em`
      }
    };

    // Return render result
    return (
      <div style={[ containerStyle, tilesStyle ]}>
        {(items || []).map((item, i) => tileRenderer({ style, key: i, item }))}
      </div>
    );
  }

}

const fadeStyle = {
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgb(244, 0, 0))',
  position: 'absolute',
  width: '4em',
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
    listStyleType: 'none'
  }
};
export const Submenu = Radium(({ children, style }) => (
  <ul className='cf' style={[ submenuStyles.container, style ]}>
    {children}
  </ul>
));
Submenu.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};

export class Money extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string
  }

  render () {
    const { amount, currency } = this.props;
    switch (currency) {
      case 'EUR':
        return (<span>€ {amount}</span>);
      default:
        return (<span>{amount} {currency}</span>);
    }
  }
}
