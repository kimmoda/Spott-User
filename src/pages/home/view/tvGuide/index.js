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
import { TvGuideTile } from '../../../_common/tiles/tvGuideTiles';
import TvGuideTiles from '../../../_common/tiles/tvGuideTiles';

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
    t: PropTypes.func.isRequired
  }

  static styles = {
    wrapper: {
      backgroundColor: colors.whiteGray,
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { episodes, fetchMediumTopProducts, mediumHasTopProducts, products, t } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container>
          <TvGuideTiles
            items={episodes}
            renderEmptyComponent={() => <Message>{t('home.newEpisodes.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notFound')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            title={t('home.newEpisodes.title')} />
          {/* episodes.get('data').map((obj) => {
            return <TvGuideTile item={obj}/>;
          })*/}
        </Container>
      </div>
    );
  }

}
