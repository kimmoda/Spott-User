import React, { Component, PropTypes } from 'react';
// import NewScenesForYou from './newScenesForYou';
import PickedForYou from './pickedForYou';
import TopProducts from './topProducts';
// import RecentEpisodes from './recentEpisodes';
// import PeopleAlsoWatch from './peopleAlsoWatch';

export default class Overview extends Component {

  static propTypes = {
    params: PropTypes.shape({
      mediumId: PropTypes.string.isRequired
    }).isRequired
  };

  render () {
    const { params: { mediumId } } = this.props;
    return (
      <div>
        {/* TODO: further impl of API, <NewScenesForYou mediumId={mediumId} /> */}
        <PickedForYou mediumId={mediumId} />
        {/*
        <RecentEpisodes />
        */}
        <TopProducts mediumId={mediumId} />
        {/*
        <PeopleAlsoWatch />
        */}
      </div>
    );
  }

}
