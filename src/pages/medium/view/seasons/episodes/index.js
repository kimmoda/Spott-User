import React from 'react';
import SmallEpisodeTiles from '../../../../_common/tiles/smallEpisodeTiles';
import dummySmallEpisodes from '../../../../../api/mock/smallEpisodes';
import { fromJS } from 'immutable';
import { Container } from '../../../../_common/buildingBlocks';

const styles = {
  smallEpisodes: {
    paddingBottom: '1.7em'
  },
  smallEpisodeList: {
    overflow: 'visible',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 0
  }
};

export default (props) => (<div>
  <p>Episodes</p>
  <div style={styles.smallEpisodes}>
    <Container>
      <SmallEpisodeTiles items={fromJS({ data: dummySmallEpisodes, _status: 'loaded' })} listStyle={styles.smallEpisodeList} />
    </Container>
  </div>
  {props.children}
</div>);
