import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Tiles } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from '../_baseTile';

const dummyScenes = fromJS([ {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  name: 'Daredevil',
  products: [ {
    name: 'Backpack',
    id: 'XYZ1',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ2',
    image: require('./images/eames.png')

  }, {
    name: 'Lasagna',
    id: 'XYZ3',
    image: require('./images/lasagna.png')

  }, {
    name: 'Tabasco',
    id: 'XYZ4',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/gameOfThrones.jpg'),
  logo: require('./images/gameOfThronesLogo.png'),
  name: 'Game of Thrones',
  products: [ {
    name: 'Backpack',
    id: 'XYZ5',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ6',
    image: require('./images/eames.png')

  }, {
    name: 'Lasagna',
    id: 'XYZ7',
    image: require('./images/lasagna.png')

  }, {
    name: 'Tabasco',
    id: 'XYZ8',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/warcraft.jpg'),
  logo: require('./images/warcraftLogo.png'),
  name: 'Warcraft',
  products: [ {
    name: 'Backpack',
    id: 'XYZ9',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ10',
    image: require('./images/eames.png')

  }, {
    name: 'Lasagna',
    id: 'XYZ11',
    image: require('./images/lasagna.png')
  }, {
    name: 'Tabasco',
    id: 'XYZ12',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  name: 'Daredevil',
  products: [ {
    name: 'Backpack',
    id: 'XYZ13',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ14',
    image: require('./images/eames.png')
  }, {
    name: 'Lasagna',
    id: 'XYZ15',
    image: require('./images/lasagna.png')
  }, {
    name: 'Tabasco',
    id: 'XYZ16',
    image: require('./images/tabasco.png')
  } ]
} ]);

@Radium
export class ProductsFromMediumTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      products: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          name: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        }).isRequired,
      ).isRequired,
      logo: PropTypes.string.isRequired
    }).isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {

      position: 'relative',
      paddingTop: '125%',
      height: 0
    },
    image: {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '0.25em 0.25em 0 0',
      position: 'absolute',
      width: '100%',
      height: '20%',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      display: 'block',
      maxWidth: '60%',
      maxHeight: '60%',
      width: 'auto',
      height: 'auto',
      filter: 'brightness(0) invert(1)',
      objectFit: 'contain' // Firefox doesn't keep aspect ratio when using maxwidth and maxheight
    },
    productWrapper: {
      position: 'absolute',
      top: '20%',
      left: 0,
      bottom: 0,
      right: 0
    },
    productImageWrapper: {
      float: 'left',
      width: '50%',
      height: '50%',
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.4)',
      // marginBottom: '15px',
      overflow: 'hidden'
    },
    productImage: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      transition: '0.25s ease-in-out',
      ':hover': {
        filter: 'opacity(70%)'
      }
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, style } = this.props;
    return (
      <BaseTile style={style}>
        <div style={styles.container}>
          <div
            style={[ styles.image, { backgroundImage: `url("${item.get('image')}")` } ]}>
            <img src={item.get('logo')} style={styles.logo} title={item.get('name')} />
          </div>
          <div style={styles.productWrapper}>
            {item.get('products').map((product) => (
              <div key={product.get('id')} style={styles.productImageWrapper}>
                <div
                  key={`"animation-${product.get('id')}"`}
                  style={[ styles.productImage, { backgroundImage: `url("${product.get('image')}")` } ]}
                  title={product.get('name')} />
              </div>))}
          </div>
          {/* <div style={styles.layer}></div>*/}
        </div>
      </BaseTile>
    );
  }
}

export default class ProductsFromMediumTiles extends Component {

  static propTypes = {
    items: ImmutablePropTypes.list,
    style: PropTypes.object
  };

  static styles = {
    tiles: {
    }
  };

  render () {
    const { styles } = this.constructor;
    const { items, style } = this.props;
    return (
      <Tiles
        horizontalSpacing={0.938}
        items={items || dummyScenes}
        numColumns={{ small: 1, medium: 2, large: 3, extraLarge: 4 }}
        style={[ styles.tiles, style ]}
        tileRenderer={(instanceProps) => <ProductsFromMediumTile {...instanceProps} />}
        verticalSpacing={0} />
    );
  }
}
