import React, { Component } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { SectionTitle, ScalableContainer, Tiles } from '../../../_common/buildingBlocks';
import PosterTile from '../../../_common/tiles/posterTile';

const dummyPosters = fromJS([ {
  image: require('./images/criminalMinds.jpg'),
  name: 'Criminal Minds'
}, {
  image: require('./images/ghostInTheShell.jpg'),
  name: 'Ghost In The Shell'
}, {
  image: require('./images/modernFamily.jpg'),
  name: 'Modern Family'
}, {
  image: require('./images/batman.jpg'),
  name: 'Batman'
}, {
  image: require('./images/batman.jpg'),
  name: 'Batman'
}, {
  image: require('./images/ghostInTheShell.jpg'),
  name: 'Ghost In The Shell'
}, {
  image: require('./images/modernFamily.jpg'),
  name: 'Modern Family'
} ]);

@Radium
export default class PopularNearYou extends Component {

  static styles = {
    container: {
      backgroundColor: 'white',
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    },
    subtitle: {
      marginBottom: '1.304em'
    },
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.subtitle}>Popular near you</SectionTitle>
        <Tiles
          horizontalSpacing='0.938em'
          items={dummyPosters}
          numColumns={{ small: 4, medium: 5, large: 6, extraLarge: 7 }}
          style={styles.tiles}
          tileRenderer={(instanceProps) => <PosterTile {...instanceProps} />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}
