import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';
import { Map } from 'immutable';
import { colors, load, fontWeights, formatPrice, makeTextStyle, mediaQueries, pinkButtonStyle, Button, Container, ShareButton, Spinner } from '../../_common/buildingBlocks';
import ProductTiles from '../../_common/tiles/productTiles';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import { LOADED } from '../../../data/statusTypes';

@localized
@connect(productSelector, (dispatch) => ({
  onChangeImageSelection: bindActionCreators(actions.changeImageSelection, dispatch),
  loadProduct: bindActionCreators(actions.loadProduct, dispatch)
}))
@Radium
export default class ProductDetail extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
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
    selectedImageId: PropTypes.string,
    t: PropTypes.func.isRequired,
    onChangeImageSelection: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.share = ::this.share;
    this.onBuyClick = ::this.onBuyClick;
    this.product = this.props.params.productId;
    this.renderProduct = ::this.renderProduct;
    this.renderNotFoundError = ::this.renderNotFoundError;
    this.renderUnexpectedError = ::this.renderUnexpectedError;
  }

  async componentWillMount () {
    // (Re)fetch the product.
    await this.props.loadProduct(this.props.params.productId);
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.params.productId !== nextProps.params.productId) {
      await this.props.loadProduct(nextProps.params.productId);
    }
  }

  share (e) {
    e.preventDefault();
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=Discover ${this.props.product.get('shortName')} now on Spott`, 'name', 'width=600,height=400');
  }

  onBuyClick () {
    const postUrl = this.props.product.getIn([ 'offerings', '0', 'url' ]);
    // Create a form using the good ol' DOM API
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', postUrl);
    // Distructive manipulation of the DOM-tree, but this doesn't matter since
    // we leave the SPA anyway.
    document.body.appendChild(form);
    // Submit form
    form.submit();
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
        margin: 'auto'
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
      notAvailable: {
        ...makeTextStyle(fontWeights.regular, '0.875em', '0.025em'),
        paddingTop: '0.313em'
      },
      buttons: {
        buyText: {
          textTransform: 'uppercase'
        },
        wrapper: {
          paddingTop: '1.875em',
          display: 'flex',
          justifyContent: 'space-between'
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
    },
    emptyText: {
      paddingTop: '3em',
      ...makeTextStyle(fontWeights.medium, '0.875em'),
      color: colors.slateGray
    },
    return: {
      ...makeTextStyle(fontWeights.bold),
      color: colors.dark,
      textDecoration: 'none'
    }
  }

  renderProduct () {
    const { styles } = this.constructor;
    const { onChangeImageSelection, product, selectedImageId, t } = this.props;
    const notAvailable = !product.getIn([ 'offerings', '0', 'url' ]);
    const selectedImage = product.get('images') && product.get('images').find((image) => image.get('id') === selectedImageId);
    const share = product.get('share');

    return (
      <div>
        <div style={styles.productInfo}>
          <Container>
            <div style={styles.left}>
              <div style={styles.images.wrapper}>
                {selectedImage &&
                  <img src={`${selectedImage.get('url')}?height=750&width=750`} style={styles.images.big} />}
              </div>
              <div>
                {product.get('images') && product.get('images').map((image) =>
                  <div
                    key={image.get('id')}
                    style={[ styles.images.small.wrapper, image.get('id') === selectedImageId && styles.images.selected ]}
                    onClick={onChangeImageSelection.bind(null, image.get('id'))}>
                    <img
                      src={`${image.get('url')}?height=160&width=160`}
                      style={styles.images.small.image}/>
                  </div>)}
              </div>
            </div>
            <div style={styles.right}>
              <div>
                <h2 style={styles.details.productTitle}>{product.get('shortName')}</h2>
                <p style={styles.details.brand.label}>{product.get('brand') ? t('productDetail.by', { brandName: product.getIn([ 'brand', 'name' ]) }) : <span>&nbsp;</span>}</p>
                {product.get('description') &&
                  <p style={styles.details.productDescription}>{product.get('description')}</p>}
                <h2 style={styles.details.price}>
                  {formatPrice(product.getIn([ 'offerings', '0', 'price' ]))}
                </h2>
                <div style={styles.details.buttons.wrapper}>
                  <Button disabled={notAvailable} key='buyButton' style={pinkButtonStyle} target='_blank' onClick={this.onBuyClick}>
                    <span style={styles.details.buttons.buyText}>{t('productDetail.buyNow')}</span>
                  </Button>
                  <ShareButton disabled={!share} href={share && `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share.get('url'))}&title=${share.get('title')}`}>
                    {t('common.share')}
                  </ShareButton>
                </div>
                {notAvailable &&
                  <div style={styles.details.notAvailable}>{t('productDetail.unavailable')}</div>}
              </div>
            </div>
            <div style={styles.clear} />
            {share &&
              <FacebookShareData
                description={share.get('description')}
                imageUrl={share.getIn([ 'image', 'url' ])}
                title={share.get('title')}
                url={window.location.href} />}
          </Container>
        </div>
        <div style={styles.similarProducts}>
          <Container>
            <h1 style={styles.similarProductsTitle}>{t('productDetail.similarProducts')}</h1>
            {product.get('similarProducts') && product.get('similarProducts').size > 0 &&
              <ProductTiles items={Map({ _status: LOADED, data: product.get('similarProducts') })} />}
            {product.get('similarProducts') && product.get('similarProducts').size === 0 &&
              <p style={styles.similarProductsNone}>{t('productDetail.noSimilar')}</p>}
            {!product.get('similarProducts') && <Spinner />}
          </Container>
        </div>
      </div>
    );
  }

  renderNotFoundError () {
    const { styles } = this.constructor;
    const { currentLocale, t } = this.props;
    return (
      <Container>
        <p style={styles.emptyText}>{t('productDetail.notExist')} <Link style={styles.return} to={`/${currentLocale}`}>{t('common.return')}</Link></p>
      </Container>
    );
  }

  renderUnexpectedError () {
    return <div />;
  }

  render () {
    return load(this.props.product, this.renderProduct, null, this.renderNotFoundError, this.renderUnexpectedError);
  }

}
