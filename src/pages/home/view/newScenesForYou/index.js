import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Container, Message, colors } from '../../../_common/buildingBlocks';
import SceneTiles from '../../../_common/tiles/sceneTiles';
import { scenesForYouSelector } from '../../selectors';
import localized from '../../../_common/localized';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { LOADED, UPDATING } from '../../../../data/statusTypes';

@localized
@connect(scenesForYouSelector)
@Radium
export default class NewScenesForYou extends Component {

  static propTypes = {
    scenes: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  static styles = {
    wrapper: {
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    },
    empty: {
      backgroundColor: colors.whiteGray,
      height: '4.5em',
      marginTop: '-5.5em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { scenes, style, t } = this.props;

    if ((scenes.get('_status') === LOADED || scenes.get('_status') === UPDATING) && (scenes.get('data') && scenes.get('data').size === 0)) {
      return (<div style={styles.empty} />);
    }

    return (
      <div style={[ styles.wrapper, style ]}>
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
