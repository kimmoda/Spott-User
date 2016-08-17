import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { colors, Container, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import { tabsSelector } from '../../selector';
import { SERIES } from '../../../../data/mediumTypes';

const styles = {
  tabs: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0
  },
  tab: {
    base: {
      ...makeTextStyle(fontWeights.bold, '0.75em', '0.237em'),
      color: 'white',
      opacity: 0.5,
      paddingBottom: '1em',
      paddingTop: '1em',
      textDecoration: 'none',
      textAlign: 'center',
      minWidth: '12.5em',
      display: 'inline-block',
      borderBottomWidth: 4,
      borderBottomStyle: 'solid',
      borderBottomColor: colors.dark
    },
    active: {
      borderBottomColor: colors.darkPink,
      opacity: 1
    }
  }
};

@localized
@connect(tabsSelector)
export default class Tabs extends Component {

  static propTypes = {
    children: PropTypes.node,
    medium: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      shareUrl: PropTypes.string.isRequired
    }),
    t: PropTypes.func
  }

  render () {
    const { children, medium, t } = this.props;
    console.log(medium.toJS());
    return (
      <Container style={styles.tabs}>
        <p>Tabs</p>
        <div>
          <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`${medium.get('shareUrl')}/overview`}>{t('common.overview')}</Link>
          <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`${medium.get('shareUrl')}/${medium.get('type') === SERIES ? 'season' : 'scenes'}`}>Scenes</Link>
        </div>
        {children}
      </Container>
    );
  }

}
