import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { colors, Container, Message } from '../../../_common/buildingBlocks';
import SceneTiles from '../../../_common/tiles/sceneTiles';
import { scenesForYouSelector } from '../../selectors';
import localized from '../../../_common/localized';
import ImmutablePropTypes from 'react-immutable-proptypes';

@localized
@connect(scenesForYouSelector)
@Radium
export default class NewScenesForYou extends Component {

  static propTypes = {
    scenes: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  static styles = {
    wrapper: {
      backgroundColor: colors.white,
      paddingTop: '6.25em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { scenes, t } = this.props;
    return (
      <div style={styles.wrapper}>
        <Container>
          <SceneTiles
            items={scenes}
            renderEmptyComponent={() => <Message>{t('home.newScenesForYou.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notFound')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            tileProps={{ showDetails: true }}
            title={t('home.newScenesForYou.title')} />
        </Container>
      </div>
    );
  }

}
