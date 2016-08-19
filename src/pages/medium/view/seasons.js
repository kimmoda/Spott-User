import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
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
  loadSeasons: bindActionCreators(loadSeasons, dispatch)
}))
export default class SeasonsTabs extends Component {

  static propTypes = {
    children: PropTypes.node,
    loadSeasons: PropTypes.func,
    params: PropTypes.shape({
      mediumId: PropTypes.string.isRequired
    }).isRequired,
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

  componentWillMount () {
    this.props.loadSeasons(this.props.params.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.mediumId !== nextProps.params.mediumId) {
      this.props.loadSeasons(nextProps.params.mediumId);
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
