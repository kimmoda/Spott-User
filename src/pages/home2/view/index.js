import React, { Component } from 'react';
import Search from './search';
import RecentlyAdded from './recentlyAdded';
import NewScenesForYou from './newScenesForYou';
import DownloadApp from './downloadApp';

export default class Home2 extends Component {

  render () {
    return (
      <div>
        <Search />
        <RecentlyAdded />
        <NewScenesForYou />
        <DownloadApp />
      </div>
    );
  }

}
