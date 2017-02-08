import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { colors } from '../../_common/buildingBlocks';
import Search from './search';
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
    loadUserData: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
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
    const { isAuthenticated, params } = this.props;
    const backgroundStyle = [ { backgroundColor: colors.whiteGray }, { backgroundColor: colors.white } ];
    let i = 0;
    return (
      <div style={{ fontSize: '16px', backgroundColor: 'white' }}>
        <Search />
        <RecentlyAdded params={params} style={backgroundStyle[i++ % 2]}/>
        {isAuthenticated && <NewScenesForYou style={backgroundStyle[i++ % 2]}/>}
        <TvGuide style={backgroundStyle[i++ % 2]}/>
        <NewEpisodes style={backgroundStyle[i++ % 2]}/>
        <TopSellingProducts style={backgroundStyle[i++ % 2]}/>
        <PopularProducts style={backgroundStyle[i++ % 2]}/>
        <DownloadApp style={backgroundStyle[i++ % 2]}/>
        {isAuthenticated && <RecentlyAddedToWishlist style={backgroundStyle[i++ % 2]}/>}
        {/* <PopularNearYou style={backgroundStyle[i++ % 2]} /> */}
      </div>
    );
  }

}
