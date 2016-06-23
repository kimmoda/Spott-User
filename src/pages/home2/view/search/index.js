import React, { Component, PropTypes } from 'react';
import { colors, Container, Page, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import { dummySelector } from '../../selectors';
import { dummy } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

const styles = {
  wrapper: {
    backgroundColor: colors.whiteGray,
    padding: '146px 0',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  title: {
    color: colors.dark,
    ...makeTextStyle(fontWeights.light, '44px', '0.7px')
  },
  body: {
    display: 'inline-block'
  },
  info: {
    color: colors.dark,
    opacity: 0.5,
    marginTop: '10px',
    ...makeTextStyle(fontWeights.regular, '23px', '0.5px')
  },
  searchFieldContainer: {
    marginTop: '54.5px',
    boxShadow: '0 10px 12px 0 rgba(0, 0, 0, 0.3)',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '4px'
  },
  searchField: {
    border: 0,
    borderRadius: '4px',
    backgroundColor: colors.white,
    padding: '19px',
    display: 'block',
    width: '100%'
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
            <div style={styles.searchFieldContainer}>
              <input placeholder='Search for movies, series, characters or brands' style={styles.searchField} type='text' />
            </div>
          </div>
        </Container>
      </div>
    );
  }

}
