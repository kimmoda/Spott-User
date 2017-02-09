import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { COMMERCIAL, SERIES } from '../../../../data/mediumTypes';
// import NewScenesForYou from './newScenesForYou';
import PickedForYou from './pickedForYou';
import TopProducts from './topProducts';
import RecentEpisodes from './recentEpisodes';
// import PeopleAlsoWatch from './peopleAlsoWatch';
import { overviewSelector } from '../../selector';

@connect(overviewSelector)
export default class Overview extends Component {

  static propTypes = {
    location: PropTypes.object,
    medium: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      type: PropTypes.string
    }),
    params: PropTypes.shape({
      mediumId: PropTypes.string.isRequired
    }).isRequired
  };

  render () {
    const { medium, params: { mediumId }, location } = this.props;
    return (
      <div>
        {/* TODO: further impl of API, <NewScenesForYou mediumId={mediumId} /> */}
        {/* Products for you is hidden for a commercial. */}
        {medium.get('type') !== COMMERCIAL &&
          <PickedForYou mediumId={mediumId} />}
        {medium.get('type') === SERIES &&
          <RecentEpisodes location={location} mediumId={mediumId} />}
        <TopProducts location={location} mediumId={mediumId} />
        {/*
        <PeopleAlsoWatch />
        */}
      </div>
    );
  }

}
