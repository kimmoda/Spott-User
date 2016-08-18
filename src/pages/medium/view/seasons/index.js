import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { colors, Container, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import { seasonsSelector } from '../../selector';
import { loadSeasons } from '../../actions';

const styles = {
  season: {
    base: {
      ...makeTextStyle(fontWeights.bold, '0.75em', '0.237em'),
      backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
      color: 'white',
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
      borderBottomColor: colors.darkPink
    }
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
      <Container>
          {seasons.get('data').map((season) => (
            <Link activeStyle={styles.season.active} style={styles.season.base} to={`${season.get('shareUrl')}`} key={`${season.get('id')}`}>{season.get('title')}</Link>
          ))}
        {children}
      </Container>
    );
  }

}
