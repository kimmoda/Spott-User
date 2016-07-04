import React from 'react';
import NewScenesForYou from './newScenesForYou';
import PickedForYou from './pickedForYou';
import TopProducts from './topProducts';
import RecentEpisodes from './recentEpisodes';
import PeopleAlsoWatch from './peopleAlsoWatch';

export default () => (
  <div>
    <NewScenesForYou />
    <PickedForYou />
    <RecentEpisodes />
    <TopProducts />
    <PeopleAlsoWatch />
  </div>
);
