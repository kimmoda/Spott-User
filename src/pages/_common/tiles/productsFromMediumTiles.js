import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';

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

export default makeTiles(
  0.938,
  { extraSmall: 1, small: 1, medium: 2, large: 3, extraLarge: 4 },
  (instanceProps) => <ProductsFromMediumTile {...instanceProps} />
);
