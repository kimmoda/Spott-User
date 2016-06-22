import React, { Component } from 'react';
import Search from './search';
import RecentlyAdded from './recentlyAdded';
import DownloadApp from './downloadApp';

export default class Home2 extends Component {

  render () {
    return (
      <div>
        <Search />
        <RecentlyAdded />
        <DownloadApp />
      </div>
    );
  }

}
