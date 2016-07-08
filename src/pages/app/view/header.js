import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { colors, Container, fontWeights, makeTextStyle, mediaQueries } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import Radium from 'radium';

const spottImage = require('./spott.png');

const RadiumLink = Radium(Link);

const styles = {
  wrapper: {
    backgroundColor: 'white'
  },
  container: {

  },
  logoSection: {

  },
  navSection: {

  },
  userSection: {

  }
};
@Radium
@localized
export default class Navbar extends Component {

  render () {
    const { t } = this.props;
    return (
      <header style={styles.wrapper}>
        <Container style={styles.container}>
          <div style={styles.logoSection}>
            <Link to='/'>
              <img src={spottImage} />
            </Link>
          </div>
          <nav style={styles.navSection}></nav>
          <div style={styles.userSection}></div>
        </Container>
      </header>
    );
  }

}
