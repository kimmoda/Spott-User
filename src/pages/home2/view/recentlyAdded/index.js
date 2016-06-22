import React, { Component, PropTypes } from 'react';
import { colors, Container, Page, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import { dummySelector } from '../../selectors';
import { dummy } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class RecentlyAdded extends Component {

  render () {
    return (
      <div>Recently added</div>
    );
  }

}
