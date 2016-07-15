import React, { Component } from 'react';
// import Search from './search';
import RecentlyAdded from './recentlyAdded';
// import NewEpisodes from './newEpisodes';
// import NewScenesForYou from './newScenesForYou';
// import TopSellingProducts from './topSellingProducts';
import DownloadApp from './downloadApp';
import RecentlyAddedToWishlist from './recentlyAddedToWishlist';
// import PopularNearYou from './popularNearYou';

export default class Home extends Component {

  render () {
    return (
      <div style={{ fontSize: '16px', backgroundColor: 'white' }}>
        {/* <Search /> */}
        <RecentlyAdded />
        {/* <NewScenesForYou /> */}
        {/* <NewEpisodes /> */}
        {/* <TopSellingProducts /> */}
        <DownloadApp />
        <RecentlyAddedToWishlist />
        {/* <PopularNearYou /> */}
      </div>
    );
  }

}
