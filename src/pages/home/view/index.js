import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Search from './search';
import RecentlyAdded from './recentlyAdded';
import NewEpisodes from './newEpisodes';
import NewScenesForYou from './newScenesForYou';
import TopSellingProducts from './topSellingProducts';
import PopularProducts from './popularProducts';
import DownloadApp from './downloadApp';
import TvGuide from './tvGuide';
import RecentlyAddedToWishlist from './recentlyAddedToWishlist';
// import PopularNearYou from './popularNearYou';
import { homeSelector } from '../selectors';
import * as actions from '../actions';

@connect(homeSelector, (dispatch) => ({
  load: bindActionCreators(actions.load, dispatch),
  loadUserData: bindActionCreators(actions.loadUserData, dispatch)
}))
export default class Home extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    loadUserData: PropTypes.func.isRequired
  };

  // When loading the home page initially we load the personal data (sequentially) and
  // general data (sequentially) in parallel.
  componentDidMount () {
    this.props.load();
    if (this.props.isAuthenticated) {
      this.props.loadUserData();
    }
  }

  // If authenticated we load the personal data.
  componentWillReceiveProps ({ isAuthenticated }) {
    if (isAuthenticated && this.props.isAuthenticated !== isAuthenticated) {
      this.props.loadUserData();
    }
  }

  render () {
    const { isAuthenticated } = this.props;
    return (
      <div style={{ fontSize: '16px', backgroundColor: 'white' }}>
        {/* <Search /> */}
        <RecentlyAdded />
        {isAuthenticated && <NewScenesForYou />}
        <TvGuide/>
        <NewEpisodes />
        <TopSellingProducts />
        <PopularProducts />
        <DownloadApp />
        {isAuthenticated && <RecentlyAddedToWishlist />}
        {/* <PopularNearYou /> */}
      </div>
    );
  }

}
