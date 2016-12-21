import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, Container, Message } from '../../../../_common/buildingBlocks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../../_common/localized';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { recentEpisodesSelector } from '../../../selector';
import * as actions from '../../../../../data/actions';
import { loadRecentEpisodes } from '../../../actions';
import { EpisodeTile } from '../../../../_common/tiles/episodeTiles';
import makeTiles from '../../../../_common/tiles/_makeTiles';

const EpisodeTiles = makeTiles(
  0.938,
  { extraSmall: 1, small: 2, medium: 2, large: 2, extraLarge: 3, extraExtraLarge: 3 },
  (instanceProps) => <EpisodeTile {...instanceProps} />
);

@localized
@connect(recentEpisodesSelector, (dispatch) => ({
  fetchMediumTopProducts: bindActionCreators(actions.fetchMediumTopProducts, dispatch),
  loadRecentEpisodes: bindActionCreators(loadRecentEpisodes, dispatch)
}))
@Radium
export default class RecentEpisodes extends Component {

  static propTypes = {
    episodes: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    fetchMediumTopProducts: PropTypes.func.isRequired,
    loadRecentEpisodes: PropTypes.func.isRequired,
    location: PropTypes.object,
    // Which medium (like an episode) has which top products? mediumId: [ productIds ]
    mediumHasTopProducts: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    mediumId: PropTypes.string.isRequired,
    // Hash of products, productId: productEntity
    products: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadRecentEpisodes(this.props.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.mediumId !== nextProps.mediumId) {
      this.props.loadRecentEpisodes(nextProps.mediumId);
    }
  }

  static styles = {
    wrapper: {
      backgroundColor: colors.whiteGray,
      paddingTop: '40px',
      paddingBottom: '50px'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { episodes, fetchMediumTopProducts, mediumHasTopProducts, products, t, location } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container style={styles.container}>
          <EpisodeTiles
            items={episodes}
            renderEmptyComponent={() => <Message>{t('medium.recentEpisodes.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notFound')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            tileProps={{ fetchMediumTopProducts, mediumHasTopProducts, products, isInSeriesRender: true, location }}
            title={t('medium.recentEpisodes.title')} />
        </Container>
      </div>
    );
  }

}
