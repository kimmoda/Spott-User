import React, { Component, PropTypes } from 'react';
import { colors, Container, Page, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import { dummySelector } from '../../selectors';
import { dummy } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

const icon = require('./icon.svg');

const styles = {
  wrapper: {
    backgroundColor: colors.whiteGray,
    padding: '9.125em 0',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  title: {
    color: colors.dark,
    ...makeTextStyle(fontWeights.light, '2.75em', '0.04375em')
  },
  body: {
    display: 'inline-block'
  },
  info: {
    color: colors.dark,
    opacity: 0.5,
    marginTop: '0.625em',
    ...makeTextStyle(fontWeights.regular, '1.4375em', '0.03125em')
  },
  searchFieldWrapper: {
    marginTop: '3.40625em',
    boxShadow: '0 0.625em 0.75em 0 rgba(0, 0, 0, 0.3)',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  searchFieldContainer: {
    borderRadius: '0.25em',
    backgroundColor: colors.white
  },
  searchFieldIcon: {
  },
  searchField: {
    border: 0,
    borderRadius: '0.25em',
    display: 'block',
    width: '100%',
    paddingLeft: '7.25em',
    paddingTop: '1.1875em',
    paddingBottom: '1.1875em',
    paddingRight: '1.1875em',
    backgroundImage: `url(${icon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '1.1875em 1.1875em',
    color: colors.dark,
    ...makeTextStyle(fontWeights.light, '1.125em')
  }
};
export default class Search extends Component {

  render () {
    return (
      <div style={styles.wrapper}>
        <Container>
          <h1 style={styles.title}>Television is now your favourite shop</h1>
          <div style={styles.body}>
            <p style={styles.info}>Spott allows you to find products in the things you watch</p>
            <div style={styles.searchFieldWrapper}>
              <div style={styles.searchFieldContainer}>
                <input placeholder='Search for movies, series, characters or brands' style={styles.searchField} type='text' />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

}
