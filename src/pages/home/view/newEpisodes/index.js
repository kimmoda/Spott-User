import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { colors, Container, Message } from '../../../_common/buildingBlocks';
import EpisodeTiles from '../../../_common/tiles/episodeTiles';
import { newEpisodesSelector } from '../../selectors';
import * as actions from '../../../../data/actions';
import localized from '../../../_common/localized';
import ImmutablePropTypes from 'react-immutable-proptypes';

@localized
@connect(newEpisodesSelector, (dispatch) => ({
  fetchMediumTopProducts: bindActionCreators(actions.fetchMediumTopProducts, dispatch)
}))
@Radium
export default class NewEpisodes extends Component {

  static propTypes = {
    episodes: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    fetchMediumTopProducts: PropTypes.func.isRequired,
    // Which medium (like an episode) has which top products? mediumId: [ productIds ]
    mediumHasTopProducts: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    // Hash of products, productId: productEntity
    products: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  static styles = {
    wrapper: {
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { episodes, fetchMediumTopProducts, mediumHasTopProducts, products, style, t } = this.props;
    return (
      <div style={[ styles.wrapper, style ]}>
        <Container>
          <EpisodeTiles
            items={episodes}
            renderEmptyComponent={() => <Message>{t('home.newEpisodes.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notFound')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            tileProps={{ fetchMediumTopProducts, mediumHasTopProducts, products }}
            title={t('home.newEpisodes.title')} />
        </Container>
      </div>
    );
  }

}
