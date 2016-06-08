import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Navbar from '../../_common/navbar';
require('../helloBank.scss');

const RadiumLink = Radium(Link);

// Wrapper
// ///////

const backgroundImage = require('./background.png');
const deviceImage = require('./device.png');
const helloBankImage = require('./helloBank.png');

const wrapperStyles = {
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    pointerEvents: 'none'
  },
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    height: 100,
    position: 'relative',
    width: '100%'
  },
  body: {
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative'
  },
  deviceWrapper: {
    overflow: 'hidden',
    height: 200,
    maxWidth: 250,
    width: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    '@media (min-width: 960px)': {
      position: 'absolute',
      height: 'auto',
      left: 15,
      width: 396,
      maxWidth: 396,
      bottom: 0,
      marginLeft: 0,
      marginRight: 0
    }
  },
  device: {
    display: 'block',
    width: '100%'
  },
  contentWrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    width: '100%',
    '@media (min-width: 960px)': {
      paddingLeft: 500,
      paddingTop: 100,
      paddingBottom: 128,
      display: 'inline-block'
    }
  },
  content: {
    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.1)',
    width: '100%',
    padding: 25,
    backgroundColor: 'white',
    '@media (min-width: 960px)': {
      boxShadow: 'none',
      padding: 0,
      backgroundColor: 'transparent',
      minHeight: 570
    }
  },
  footer: {
    wrapper: {
      backgroundColor: '#333333',
      paddingTop: 33,
      paddingBottom: 33,
      position: 'relative',
      width: '100%'
    },
    container: {
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      '@media (min-width: 960px)': {
        maxWidth: 960,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    links: {
      float: 'right',
      textAlign: 'right',
      '@media (min-width: 700px)': {
        lineHeight: '34px',
        textAlign: 'left'
      }
    },
    link: {
      display: 'block',
      opacity: 0.7,
      fontFamily: 'Roboto-Regular',
      fontSize: '13px',
      color: '#ffffff',
      textDecoration: 'none',
      '@media (min-width: 700px)': {
        display: 'inline-block',
        marginLeft: 15
      },
      '@media (min-width: 850px)': {
        marginLeft: 52
      }
    },
    logo: {
      float: 'left',
      height: 34
    },
    logoText: {
      marginLeft: 13,
      fontFamily: 'Roboto-Regular',
      fontSize: '13px',
      display: 'inline-block',
      color: '#ffffff',
      lineHeight: '17px'
    },
    logoTextLink: {
      color: '#27d2df'
    }
  }
};

class Wrapper extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    return (
      <div>
        <div style={wrapperStyles.background}></div>
        <Navbar currentPathname={this.props.location.pathname} />
        <div style={wrapperStyles.body}>
          <div style={wrapperStyles.deviceWrapper}>
            <img src={deviceImage} style={wrapperStyles.device} />
          </div>
          <div style={wrapperStyles.contentWrapper}>
            <section style={wrapperStyles.content}>
              {this.props.children}
            </section>
          </div>
        </div>
        <div style={wrapperStyles.footer.wrapper}>
          <footer style={wrapperStyles.footer.container}>
            <img src={helloBankImage} style={wrapperStyles.footer.logo} />
            <div style={wrapperStyles.footer.logoText}>
              In samenwerking met <br />
              <a href='https://www.hellobank.be/' style={wrapperStyles.footer.logoTextLink} target='_blank'>hellobank.be</a>
            </div>
            <div style={wrapperStyles.footer.links}>
              <RadiumLink style={wrapperStyles.footer.link} to='/get-in-touch'>Contact</RadiumLink>
              <RadiumLink style={wrapperStyles.footer.link} to='/terms'>Algemene voorwaarden</RadiumLink>
              <RadiumLink style={wrapperStyles.footer.link} to='/hellobank-reglement'>Wedstrijdvoorwaarden</RadiumLink>
              <RadiumLink style={wrapperStyles.footer.link} to='/app'>Download de App</RadiumLink>
            </div>
            <div style={{ clear: 'both' }}></div>
          </footer>
        </div>
      </div>
    );
  }

}

export default Radium(Wrapper);
