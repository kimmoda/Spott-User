import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';
import { Map } from 'immutable';
import { colors, fontWeights, load, makeTextStyle, mediaQueries, pinkButtonStyle, Button, Container, Money, Spinner } from '../../_common/buildingBlocks';
import Tiles from '../../_common/tiles/productTiles';
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
        },
        shareButton: {
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: '0.125em',
          borderColor: colors.coolGray,
          color: colors.coolGray,
          textDecoration: 'none',
          fill: colors.coolGray,
          borderRadius: '20em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '0.188em',
          paddingBottom: '0.188em',
          paddingLeft: '0.625em',
          paddingRight: '0.625em',
          ':hover': {
            borderColor: colors.dark,
            color: colors.dark,
            fill: colors.dark
          }
        },
        shareText: {
          ...makeTextStyle(fontWeights.bold, '0.688em'),
          textTransform: 'uppercase',
          letterSpacing: '0.219em',
          lineHeight: 0
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
                  <Money
                    amount={product.getIn([ 'offerings', '0', 'price', 'amount' ])}
                    currency={product.getIn([ 'offerings', '0', 'price', 'currency' ])} />
                </h2>
                <div style={styles.details.buttons.wrapper}>
                  <Button disabled={notAvailable} href={product.getIn([ 'offerings', '0', 'url' ])} key='buyButton' style={pinkButtonStyle} target='_blank'>
                    <span style={styles.details.buttons.buyText}>{t('productDetail.buyNow')}</span>
                  </Button>
                  <a
                    href='#'
                    style={styles.details.buttons.shareButton}
                    onClick={this.share}>
                    <svg style={styles.details.buttons.shareIcon} viewBox='0 0 481.6 481.6' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M381.6 309.4c-27.7 0-52.4 13.2-68.2 33.6l-132.3-73.9c3.1-8.9 4.8-18.5 4.8-28.4 0-10-1.7-19.5-4.9-28.5l132.2-73.8c15.7 20.5 40.5 33.8 68.3 33.8 47.4 0 86.1-38.6 86.1-86.1S429 0 381.5 0s-86.1 38.6-86.1 86.1c0 10 1.7 19.6 4.9 28.5l-132.1 73.8c-15.7-20.6-40.5-33.8-68.3-33.8-47.4 0-86.1 38.6-86.1 86.1s38.7 86.1 86.2 86.1c27.8 0 52.6-13.3 68.4-33.9l132.2 73.9c-3.2 9-5 18.7-5 28.7 0 47.4 38.6 86.1 86.1 86.1s86.1-38.6 86.1-86.1-38.7-86.1-86.2-86.1zm0-282.3c32.6 0 59.1 26.5 59.1 59.1s-26.5 59.1-59.1 59.1-59.1-26.5-59.1-59.1 26.6-59.1 59.1-59.1zM100 299.8c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.6 59.1-59.1 59.1zm281.6 154.7c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.5 59.1-59.1 59.1z'/>
                    </svg>
                    <span style={styles.details.buttons.shareText}>&nbsp;{t('productDetail.share')}</span>
                  </a>
                </div>
                {notAvailable &&
                  <div style={styles.details.notAvailable}>{t('productDetail.unavailable')}</div>}
              </div>
            </div>
            <div style={styles.clear} />
            {/* TODO: Didier will provide title, description and maybe images for sharing */}
            <FacebookShareData
              description={product.get('description') || ''}
              imageUrls={product.get('images') && product.get('images').map((image) => image.get('url')).toJS()}
              title={product.get('shortName')} url={window.location.href} />
          </Container>
        </div>
        <div style={styles.similarProducts}>
          <Container>
            <h1 style={styles.similarProductsTitle}>{t('productDetail.similarProducts')}</h1>
            {product.get('similarProducts') && product.get('similarProducts').size > 0 &&
              <Tiles items={Map({ _status: LOADED, data: product.get('similarProducts') })} />}
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
    return (<div></div>);
  }

  render () {
    return load(this.props.product, this.renderProduct, null, this.renderNotFoundError, this.renderUnexpectedError);
  }

}
