import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Button, colors, Container, fontWeights, makeTextStyle, mediaQueries, Money, pinkButtonStyle } from '../../_common/buildingBlocks';
import Tiles from '../../_common/tiles/productTiles';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { FETCHING, LOADED, UPDATING } from '../../../data/statusTypes';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Spinner from '../../_common/spinner';
import localized from '../../_common/localized';

@localized
@connect(productSelector, (dispatch) => ({
  onChangeImageSelection: bindActionCreators(actions.changeImageSelection, dispatch),
  loadProduct: bindActionCreators(actions.loadProduct, dispatch)
}))
@Radium
export default class ProductDetail extends Component {

  static propTypes = {
    loadProduct: PropTypes.func.isRequired,
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired
    }).isRequired,
    product: ImmutablePropTypes.mapContains({
      shortName: PropTypes.string,
      longName: PropTypes.string,
      description: PropTypes.string,
      images: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          url: PropTypes.string,
          id: PropTypes.string
        })
      ),
      id: PropTypes.string
    }),
    t: PropTypes.func.isRequired,
    onChangeImageSelection: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.share = ::this.share;
    this.product = this.props.params.productId;
  }

  componentWillMount () {
    // (Re)fetch the product.
    this.props.loadProduct(this.props.params.productId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.productId !== nextProps.params.productId) {
      this.props.loadProduct(nextProps.params.productId);
    }
  }

  share () {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=Discover ${this.props.product.get('shortName')} now on Spott`, 'name', 'width=600,height=400');
  }

  static styles = {
    productInfo: {
      fontSize: '16px',
      width: '100%',
      paddingTop: '3.75em',
      paddingBottom: '3.75em',
      backgroundColor: colors.whiteTwo
    },
    left: {
      float: 'left',
      width: '100%',
      [mediaQueries.medium]: {
        width: '35%',
        paddingRight: '1em'
      }
    },
    right: {
      float: 'left',
      width: '100%',
      [mediaQueries.medium]: {
        width: '65%',
        paddingLeft: '1em'
      }
    },
    clear: {
      clear: 'both'
    },
    images: {
      selected: {
        border: `solid 0.15em ${colors.darkPink}`,
        cursor: 'default'
      },
      wrapper: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
        height: 0,
        marginBottom: '1.25em'
      },
      big: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto',
        zoom: '8'
      },
      small: {
        wrapper: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          float: 'left',
          width: '3.75em',
          height: '3.75em',
          margin: '0 0.625em 0.625em 0',
          borderRadius: '0.25em',
          border: `solid 0.15em ${colors.whiteTwo}`,
          cursor: 'pointer'
        },
        image: {
          maxWidth: '100%',
          maxHeight: '100%'
        }
      }
    },
    details: {
      productTitle: {
        ...makeTextStyle(fontWeights.light, '2em'),
        color: colors.charcoalGray
      },
      brand: {
        label: {
          paddingTop: '0.313em',
          ...makeTextStyle(fontWeights.regular, '0.875em', '0.025em'),
          color: colors.dark
        },
        brandName: {
          ...makeTextStyle(fontWeights.regular, '1em'),
          color: colors.darkPink
        }
      },
      productDescription: {
        paddingTop: '2em',
        ...makeTextStyle(fontWeights.regular, '0.938em'),
        color: colors.slateGray
      },
      price: {
        paddingTop: '1.25em',
        ...makeTextStyle(fontWeights.bold, '1.5em'),
        color: colors.charcoalGray
      },
      buttons: {
        wrapper: {
          paddingTop: '1.875em',
          display: 'flex',
          justifyContent: 'space-between'
        },
        shareButton: {
          backgroundColor: 'transparent',
          border: 'solid 0.125em',
          borderRadius: '20em',
          lineHeight: '1em',
          display: 'inline-block'
        },
        shareIcon: {
          width: '1em',
          height: '1em'
        }
      }
    },
    similarProducts: {
      fontSize: '16px',
      width: '100%',
      paddingTop: '3.75em',
      paddingBottom: '3.75em',
      backgroundColor: colors.white
    },
    similarProductsTitle: {
      ...makeTextStyle(fontWeights.light, '1.438em', '0.031em'),
      color: colors.cool,
      paddingBottom: '1.0714em'
    },
    similarProductsNone: {
      ...makeTextStyle(fontWeights.regular, '0.938em'),
      paddingBottom: '0.6565em',
      color: colors.slateGray
    }
  }

  render () {
    const { styles } = this.constructor;
    const { onChangeImageSelection, product, t } = this.props;
    if (!product.get('_status') || product.get('_status') === FETCHING) {
      return (<Spinner />);
    } else if (product.get('_status') === LOADED || product.get('_status') === UPDATING) {
      return (
        <div>
          <div style={styles.productInfo}>
            <Container>
              <div style={styles.left}>
                <div style={styles.images.wrapper}>
                  <img src={product.get('selectedImage')} style={styles.images.big} />
                </div>
                <div>
                  {product.get('images') && product.get('images').map((image) =>
                    <div
                      key={image.get('id')}
                      style={[ styles.images.small.wrapper, image.get('url') === product.get('selectedImage') && styles.images.selected ]}
                      onClick={onChangeImageSelection.bind(null, image.get('url'))}>
                      <img
                        src={image.get('url')}
                        style={styles.images.small.image}/>
                    </div>)}
                </div>
              </div>
              <div style={styles.right}>
                <div>
                  <h2 style={styles.details.productTitle}>{product.get('shortName')}</h2>
                  <p style={styles.details.brand.label}>By&nbsp;<span>{product.getIn([ 'brand', 'name' ])}</span></p>
                  {product.get('description') && <p style={styles.details.productDescription}>{product.get('description')}</p>}
                  <h2 style={styles.details.price}><Money amount={product.getIn([ 'offerings', '0', 'price', 'amount' ])} currency={product.getIn([ 'offerings', '0', 'price', 'currency' ])} /></h2>
                  <div style={styles.details.buttons.wrapper}>
                    <Button href={product.getIn([ 'offerings', '0', 'url' ])} style={pinkButtonStyle} target='_blank'>
                      <span style={styles.details.buttons.buyText}>{t('productDetail.buyNow').toUpperCase()}</span>
                    </Button>
                    <button
                      style={styles.details.buttons.shareButton}
                      onClick={this.share}>
                      <svg style={styles.details.buttons.shareIcon} viewBox='-280 402.8 27.6 19.1' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M-252.6 412.7l-13 9.1c-.3.2-.5.1-.5-.2v-5.8c-3.7 0-11.6-.1-14 5.2.2-11 11.2-12.5 14-12.7v-5.2c0-.3.2-.4.5-.2l13 9.1c.3.2.3.6 0 .7z'/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div style={styles.clear} />
              {/* TODO: Didier will provide title, description and maybe images for sharing */}
              <FacebookShareData description={product.get('description') || ''} imageUrls={product.get('images') && product.get('images').map((image) => image.get('url')).toJS()} title={product.get('shortName')} url={window.location.href}/>
            </Container>
          </div>
          <div style={styles.similarProducts}>
            <Container>
              <h1 style={styles.similarProductsTitle}>Similar items</h1>
              {product.get('similarProducts') && product.get('similarProducts').size > 0 && <Tiles items={product.get('similarProducts')} />}
              {product.get('similarProducts') && product.get('similarProducts').size === 0 && <p style={styles.similarProductsNone}>No similar items found.</p>}
            </Container>
          </div>
        </div>
      );
    }
    return (<div></div>);
  }
}
