import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { Button, colors, Container, Page, fontWeights, makeTextStyle, SectionTitle, ScalableContainer, Tiles } from '../../../_common/buildingBlocks';
import { dummySelector } from '../../selectors';
import { dummy } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
class SeriesTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {
      position: 'relative',
      borderRadius: '0.25em',
      paddingTop: '56%',
      height: 0
    },
    layer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    title: {
      ...makeTextStyle(fontWeights.bold, '0.688em', '0.219em'),
      color: 'white',
      textTransform: 'uppercase',
      position: 'absolute',
      bottom: '1em',
      left: '1.25em'
    },
    image: {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, style } = this.props;
    return (
      <div style={style}>
        <div style={styles.container}>
          <div
            style={[ styles.image, { backgroundImage: `url("${item.get('image')}")` } ]}
            title={item.get('name')} />
          <div style={styles.layer}></div>
          <span style={styles.title}>{item.get('name')}</span>
        </div>
      </div>
    );
  }
}
export default class RecentlyAdded extends Component {

  static styles = {
    button: {
      borderRadius: '6.25em',
      backgroundColor: colors.darkPink,
      border: `solid 0.125em ${colors.darkPink}`,
      fontSize: '0.688em',
      letterSpacing: '0.219em',
      padding: '0.85em 2.45em',
      marginBottom: '3.75em'
    },
    container: {
      backgroundColor: '#232323',
      paddingTop: '6.25em',
      paddingBottom: '6.25em'
    },
    sectionTitle: {
      color: 'white'
    },
    subtitle: {
      color: 'white',
      fontFamily: 'Roboto',
      fontSize: '0.688em',
      fontWeight: 'bold',
      letterSpacing: '0.219em',
      textTransform: 'uppercase',
      marginBottom: '1.875em'
    },
    title: {
      color: 'white',
      fontFamily: 'Roboto',
      fontSize: '3.75em',
      fontWeight: 300,
      letterSpacing: '0.063em',
      marginBottom: '0.17em'
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
        <h1 style={styles.title}>X-files</h1>
        <h3 style={styles.subtitle}>Now available on Spott</h3>
        <Button style={styles.button}>Browse</Button>
        <SectionTitle style={styles.sectionTitle}>Recently added</SectionTitle>
        <Tiles
          horizontalSpacing='0.938em'
          items={dummySeries}
          numColumns={{ small: 1, medium: 2, large: 3, extraLarge: 4 }}
          style={styles.tiles}
          tile={<SeriesTile />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}
