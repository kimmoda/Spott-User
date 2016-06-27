import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { Button, Title, UpperCaseSubtitle, SectionTitle, ScalableContainer, Tiles, pinkButtonStyle } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SeriesTile from '../../../_common/tiles/seriesTile';
const xFilesImage = require('./images/x-files.jpg');

const dummySeries = fromJS([ {
  image: require('./images/modern-family.jpg'),
  name: 'Modern family'
}, {
  image: require('./images/new-girl.jpg'),
  name: 'New girl'
}, {
  image: require('./images/orange-is-the-new-black.jpg'),
  name: 'Orange is the new black'
}, {
  image: require('./images/kardashians.jpg'),
  name: 'Kardasians'
} ]);

@Radium
export default class RecentlyAdded extends Component {

  static styles = {
    button: {
      marginBottom: '5.45em',
      position: 'relative'
    },
    container: {
      backgroundColor: 'white',
      paddingTop: '6.25em',
      backgroundSize: 'cover',
      position: 'relative'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      opacity: 0.5,
      backgroundImage: 'linear-gradient(to bottom, #000000, rgb(255, 255, 255))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    title: {
      color: 'white',
      marginBottom: '0.17em'
    },
    subtitle: {
      color: 'white',
      marginBottom: '1.304em'
    },
    upperCaseSubtitle: {
      color: 'white',
      marginBottom: '2.725em'
    },
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em',
      transform: 'translateY(1.875em)'
    },
    wrapper: {
      position: 'relative'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={{ ...styles.container, backgroundImage: `url("${xFilesImage}")` }}>
        <div style={styles.overlay}></div>
        <div style={styles.wrapper}>
          <Title style={styles.title}>X-files</Title>
          <UpperCaseSubtitle style={styles.upperCaseSubtitle}>Now available on Spott</UpperCaseSubtitle>
          <Button style={{ ...pinkButtonStyle, ...styles.button }}>Browse</Button>
          <SectionTitle style={styles.subtitle}>Recently added</SectionTitle>
        </div>
        <Tiles
          horizontalSpacing='0.938em'
          items={dummySeries}
          numColumns={{ small: 1, medium: 2, large: 3, extraLarge: 4 }}
          style={styles.tiles}
          tileRenderer={(instanceProps) => <SeriesTile {...instanceProps} />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}
