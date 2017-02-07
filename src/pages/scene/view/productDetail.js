import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';
import { Map } from 'immutable';
import { colors, load, formatPrice, fontWeights, makeTextStyle, mediaQueries, pinkButtonStyle, Button, SmallContainer, ShareButton, Spinner } from '../../_common/buildingBlocks';
import ProductTiles from '../../_common/tiles/productTiles';
import * as actions from '../actions';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import { LOADED } from '../../../data/statusTypes';
import WishlistButton from '../../profile/view/wishlistButton';

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
    location: PropTypes.object,
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
    this.onBuyClick = ::this.onBuyClick;
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

  onBuyClick () {
    const postUrl = this.props.product.getIn([ 'offerings', '0', 'url' ]);
    // Create a form using the good ol' DOM API
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', postUrl);
    form.setAttribute('target', '_blank');
    // Destructive manipulation of the DOM-tree.
    document.body.appendChild(form);
    // Submit form
    form.submit();
    form.remove();
  }

  static styles = {
    productInfo: {
      width: '100%',
      paddingTop: '3.75em',
      paddingBottom: '3.75em',
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
      backgroundColor: colors.whiteGray
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
      width: '100%',
      paddingTop: '3.75em',
      paddingBottom: '3.75em',
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
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
    },
    spinner: {
      marginTop: '2.5em'
    },
    relevance: {
      base: {
        ...makeTextStyle(fontWeights.bold, '0.625em', '0.125em'),
        borderRadius: '6.25em',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: '0.25em 0.688em',
        textTransform: 'uppercase',
        marginRight: '1em'
      },
      EXACT: {
        borderColor: colors.green,
        color: colors.green
      },
      MEDIUM: {
        borderColor: colors.yellow,
        color: colors.yellow
      },
      LOW: {
        borderColor: colors.darkPink,
        color: colors.darkPink
      }
    }
  }

  renderRelevance (relevance) {
    const styles = this.constructor.styles;
    const { t } = this.props;
    return relevance && relevance !== 'NONE' && <span style={[ styles.relevance.base, styles.relevance[relevance] ]}>{t(`relevance.${relevance}`)}</span>;
  }

  renderProduct () {
    const { styles } = this.constructor;
    const { onChangeImageSelection, product, selectedImageId, t, location } = this.props;
    const notAvailable = !(product.get('available') && product.getIn([ 'offerings', '0', 'url' ]));
    const selectedImage = product.get('images') && product.get('images').find((image) => image.get('id') === selectedImageId);
    const share = product.get('share');

    const locationBack = location.state && location.state.returnTo ? Object.assign({}, location, { pathname: location.state.returnTo }) : location;

    return (
      <div>
        <div style={styles.productInfo}>
          <SmallContainer>
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
                <p style={styles.details.brand.label}>{this.renderRelevance(product.get('relevance'))}{product.get('brand') ? t('productDetail.by', { brandName: product.getIn([ 'brand', 'name' ]) }) : <span>&nbsp;</span>}</p>
                {product.get('description') &&
                  <p style={styles.details.productDescription}>{product.get('description')}</p>}
                <h2 style={styles.details.price}>
                  {formatPrice(product.getIn([ 'offerings', '0', 'price' ]))}
                </h2>
                <div style={styles.details.buttons.wrapper}>
                  <Button disabled={notAvailable} key='buyButton' style={pinkButtonStyle} target='_blank' onClick={this.onBuyClick}>
                    <span style={styles.details.buttons.buyText}>{t('productDetail.buyNow')}</span>
                  </Button>
                  <ShareButton disabled={!share} href={share && `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${share.get('url')}`)}&title=${share.get('title')}`}>
                    {t('common.share')}
                  </ShareButton>
                  <WishlistButton productUuid={product.get('id')}/>
                </div>
                {notAvailable &&
                  <div style={styles.details.notAvailable}>{t('productDetail.unavailable')}</div>}
              </div>
            </div>
            <div style={styles.clear} />
            {/* We do not update the share information in the headers because
                this page is used in context of a scene, which is the primary target
                to share. If a product is shared we use the product page. */}
          </SmallContainer>
        </div>
        <div style={styles.similarProducts}>
          <SmallContainer style={styles.smallContainer}>
            <h1 style={styles.similarProductsTitle}>{t('productDetail.similarProducts')}</h1>
            {product.get('similarProducts') && product.get('similarProducts').size > 0 &&
              <ProductTiles items={Map({ _status: LOADED, data: product.get('similarProducts') })} tileProps={{ location: locationBack }} />}
            {product.get('similarProducts') && product.get('similarProducts').size === 0 &&
              <p style={styles.similarProductsNone}>{t('productDetail.noSimilar')}</p>}
            {!product.get('similarProducts') && <Spinner />}
          </SmallContainer>
        </div>
      </div>
    );
  }

  renderNotFoundError () {
    const { styles } = this.constructor;
    const { currentLocale, t } = this.props;
    return (
      <div style={styles.productInfo}>
        <SmallContainer>
          <p style={styles.emptyText}>{t('productDetail.notExist')} <Link style={styles.return} to={`/${currentLocale}`}>{t('common.return')}</Link></p>
        </SmallContainer>
      </div>
    );
  }

  renderUnexpectedError () {
    return <div />;
  }

  render () {
    const { styles } = this.constructor;
    return load(this.props.product, this.renderProduct, () => <div style={styles.productInfo}><SmallContainer style={styles.spinner}><Spinner /></SmallContainer></div>, this.renderNotFoundError, this.renderUnexpectedError);
  }

}
