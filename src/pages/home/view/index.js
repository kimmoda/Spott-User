import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Search from './search';
import RecentlyAdded from './recentlyAdded';
// import NewEpisodes from './newEpisodes';
// import NewScenesForYou from './newScenesForYou';
// import TopSellingProducts from './topSellingProducts';
// import PopularProducts from './popularProducts';
import DownloadApp from './downloadApp';
// import RecentlyAddedToWishlist from './recentlyAddedToWishlist';
// import PopularNearYou from './popularNearYou';
import { homeSelector } from '../selectors';

@connect(homeSelector)
export default class Home extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  render () {
    // const { isAuthenticated } = this.props;
    return (
      <div style={{ fontSize: '16px', backgroundColor: 'white' }}>
        {/* <Search /> */}
        <RecentlyAdded />
        {/* <NewScenesForYou /> */}
        {/* <NewEpisodes /> */}
        {/* <PopularProducts /> */}
        {/* <TopSellingProducts /> */}
        <DownloadApp />
        {/* {isAuthenticated && <RecentlyAddedToWishlist />} */}
        {/* <PopularNearYou /> */}
      </div>
    );
  }

}
