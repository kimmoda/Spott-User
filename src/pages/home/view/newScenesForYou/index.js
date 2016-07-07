import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, ScalableContainer, SectionTitle } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SceneTiles from '../../../_common/tiles/sceneTiles';
import localized from '../../../_common/localized';

@localized
@Radium
export default class NewScenesForYou extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '6.25em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { t } = this.props;
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>{t('home.newScenesForYou.title')}</SectionTitle>
        <SceneTiles />
      </ScalableContainer>
    );
  }

}
