import React, { Component } from 'react';
import Search from './search';
import RecentlyAdded from './recentlyAdded';
import NewScenesForYou from './newScenesForYou';
import TopSellingProducts from './topSellingProducts';
import DownloadApp from './downloadApp';
import RecentlyAddedToWishlist from './recentlyAddedToWishlist';
import PopularNearYou from './popularNearYou';

export default class Home2 extends Component {

  render () {
    return (
      <div style={{ fontSize: '16px' }}>
        <Search />
        <RecentlyAdded />
        <NewScenesForYou />
        <TopSellingProducts />
        <DownloadApp />
        <RecentlyAddedToWishlist />
        <PopularNearYou />
      </div>
    );
  }

}
