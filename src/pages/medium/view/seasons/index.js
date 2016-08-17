import React from 'react';
import { Link } from 'react-router';
import { fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';

const styles = {
  season: {
    base: {
      ...makeTextStyle(fontWeights.bold, '0.75em', '0.237em'),
      backgroundImage: 'linear-gradient(to top, #000000, rgba(0, 0, 0, 0))',
      color: 'white',
      opacity: 0.5,
      paddingBottom: '1em',
      paddingTop: '1em',
      textDecoration: 'none',
      textAlign: 'center',
      minWidth: '12.5em',
      display: 'inline-block'
    },
    active: {
      opacity: 1
    }
  }
};

export default (props) => (<div>
  <p>Seasons</p>
  <div>
    <Link activeStyle={styles.season.active} style={styles.season.base} to={`${props.medium.get('shareUrl')}/season/3`}>Season 3</Link>
    <Link activeStyle={styles.season.active} style={styles.season.base} to={`${props.medium.get('shareUrl')}/season/2`}>Season 2</Link>
    <Link activeStyle={styles.season.active} style={styles.season.base} to={`${props.medium.get('shareUrl')}/season/1`}>Season 1</Link>
  </div>
  {props.children}
</div>);
