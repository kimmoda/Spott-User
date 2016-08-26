import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { replace as routeReplace } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Container, Submenu, SubmenuItem } from '../../_common/buildingBlocks';
import { seasonsSelector } from '../selector';
import { loadSeasons } from '../actions';

const styles = {
  submenu: {
    borderTop: '1px solid rgba(255, 255, 255, 0.25)'
  },
  submenuItem: {
    borderBottom: 0
  }
};

@connect(seasonsSelector, (dispatch) => ({
  loadSeasons: bindActionCreators(loadSeasons, dispatch),
  routeReplace: bindActionCreators(routeReplace, dispatch)
}))
export default class SeasonsTabs extends Component {

  static propTypes = {
    children: PropTypes.node,
    loadSeasons: PropTypes.func,
    params: PropTypes.shape({
      mediumId: PropTypes.string.isRequired,
      seasonId: PropTypes.string
    }).isRequired,
    routeReplace: PropTypes.func.isRequired,
    seasons: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          shareUrl: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })
      )
    }),
    t: PropTypes.func
  }

  async componentWillMount () {
    await this.props.loadSeasons(this.props.params.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    const { params: { mediumId, seasonId }, seasons } = nextProps;

    // Load seasons of the new medium if necessary.
    if (this.props.params.mediumId !== mediumId) {
      this.props.loadSeasons(mediumId);
    }

    // Replace current route by the first season if necessary.
    if (!seasonId && seasons.get('data').size > 0) {
      this.props.routeReplace(seasons.getIn([ 'data', 0, 'shareUrl' ]));
    }
  }

  render () {
    const { children, seasons } = this.props;
    return (
      <div>
        <Container>
          <Submenu style={styles.submenu}>
            {seasons.get('data').map((season) => (
              <SubmenuItem key={`${season.get('id')}`} name={season.get('title')} pathname={`${season.get('shareUrl')}`} style={styles.submenuItem} />
            ))}
          </Submenu>
        </Container>
        {children}
      </div>
    );
  }

}
