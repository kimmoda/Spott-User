import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';
import { Map } from 'immutable';
import { push as routerPush, replace as routerReplace } from 'react-router-redux';
import { colors, load, fontWeights, formatPrice, makeTextStyle, mediaQueries, Spinner, pinkButtonStyle, Button, Container, ShareButton, Modal, largeDialogStyle, SmallContainer } from '../../_common/buildingBlocks';
import ProductTiles from '../../_common/tiles/productTiles';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import { LOADED } from '../../../data/statusTypes';
import WishlistButton from '../../profile/view/wishlistButton';

@localized
@connect(productSelector, (dispatch) => ({
  onChangeImageSelection: bindActionCreators(actions.changeImageSelection, dispatch),
  loadProduct: bindActionCreators(actions.loadProduct, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  routerReplace: bindActionCreators(routerReplace, dispatch)
}))
@Radium
export default class ProductDetail extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadProduct: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
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
    routerPush: PropTypes.func.isRequired,
    routerReplace: PropTypes.func.isRequired,
    selectedImageId: PropTypes.string,
    t: PropTypes.func.isRequired,
    onChangeImageSelection: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.share = ::this.share;
    this.onClose = ::this.onClose;
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

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || '/');
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
    wrapper: {
      position: 'relative'
    },
    pbModal: {
      paddingBottom: '5em'
    },
    productInfo: {
      fontSize: '16px',
      width: '100%',
      paddingTop: '3.75em',
      paddingBottom: '3.75em',
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
      backgroundColor: colors.whiteGray,
      display: 'flex',
      flexWrap: 'wrap'
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      [mediaQueries.medium]: {
        width: '35%',
        paddingRight: '1em'
      }
    },
    right: {
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
        flexGrow: 1,
        position: 'relative',
        marginBottom: '1.25em'
      },
      big: {
        maxWidth: '100%',
        maxHeight: '100%'
      },
      small: {
        wrapper: {
          display: 'flex',
          alignItems: 'center'
        },
        item: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '42px',
          height: '42px',
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
        buyButton: {
          width: '170px',
          height: '42px',
          fontSize: '12px',
          letterSpacing: '3.6px'
        }
      }
    },
    similarProducts: {
      fontSize: '16px',
      width: '100%',
      paddingTop: '40px',
      paddingBottom: '50px',
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
      backgroundColor: colors.whiteGray
    },
    brandProducts: {
      fontSize: '16px',
      width: '100%',
      paddingTop: '40px',
      paddingBottom: '50px',
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
    header: {
      container: {
        paddingBottom: '1.1111em',
        paddingTop: '1.1111em',
        [mediaQueries.medium]: {
          alignItems: 'flex-end',
          display: 'flex',
          justifyContent: 'space-between'
        }
      },
      left: {
        [mediaQueries.medium]: {
          flex: '1 1 auto',
          overflow: 'hidden',
          paddingRight: '0.5em'
        }
      },
      right: {
        display: 'flex',
        marginTop: '0.5em',
        [mediaQueries.medium]: {
          flex: '0 0 auto',
          marginTop: 0,
          justifyContent: 'space-between'
        }
      },
      sceneFrom: {
        base: {
          ...makeTextStyle(fontWeights.bold, '0.6111em', '0.1346em'),
          opacity: 0.5,
          color: colors.dark,
          textTransform: 'uppercase',
          paddingTop: '0.8695em'
        },
        light: {
          color: colors.white
        }
      },
      saveButton: {
        active: {
          backgroundColor: colors.darkPink,
          color: colors.white
        },
        base: {
          backgroundColor: 'transparent',
          color: colors.coolGray
        },
        light: {
          color: colors.white
        }
      },
      shareButton: {
        base: {
          marginLeft: '0.5em'
        },
        light: {
          ':hover': {
            borderColor: colors.white,
            color: colors.white,
            fill: colors.white
          }
        }
      },
      link: {
        base: {
          color: colors.dark
        },
        light: {
          color: colors.white
        }
      },
      title: {
        base: {
          ...makeTextStyle(fontWeights.regular, '1.2777em', '0.0222em'),
          color: colors.dark,
          fontWeight: 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        emph: {
          opacity: 0.5
        },
        light: {
          color: colors.white
        }
      }
    }
  };

  renderProduct () {
    const { styles } = this.constructor;
    const { onChangeImageSelection, product, selectedImageId, t, location } = this.props;
    const notAvailable = !(product.get('available') && product.getIn([ 'offerings', '0', 'url' ]));
    const selectedImage = product.get('images') && product.get('images').find((image) => image.get('id') === selectedImageId);
    const share = product.get('share');
    const isPopup = location.state && location.state.modal;
    const ContentContainer = isPopup ? (props) => <div>{props.children}</div> : SmallContainer;

    const locationBack = location.state && location.state.returnTo
      ? Object.assign({}, location, { pathname: location.state.returnTo })
      : Object.assign({}, location, { state: { returnTo: location.pathname } });

    const content = (
      <div style={styles.wrapper}>
        <ContentContainer>
          <div style={styles.header.container}>
            <div style={styles.header.left}>
              <div style={[ styles.header.sceneFrom.base, isPopup && styles.header.sceneFrom.light ]}>{t('productDetail.product')}</div>
              <h1 style={[ styles.header.title.base, isPopup && styles.header.title.light ]}>
                {product.get('shortName')}
              </h1>
            </div>
            <div style={styles.header.right}>
              <ShareButton disabled={!share} href={share && `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share.get('url'))}&title=${share.get('title')}`} style={[ styles.header.shareButton.base, isPopup && styles.header.shareButton.light ]}>
                {t('common.share')}
              </ShareButton>
            </div>
          </div>
          <div style={styles.productInfo}>
            <div style={styles.left}>
              <div style={styles.images.wrapper}>
                {selectedImage &&
                <img src={`${selectedImage.get('url')}?height=750&width=750`} style={styles.images.big}/>}
              </div>
              <div style={styles.images.small.wrapper}>
                {product.get('images') && product.get('images').map((image) =>
                  <div
                    key={image.get('id')}
                    style={[ styles.images.small.item, image.get('id') === selectedImageId && styles.images.selected ]}
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
                  <Button disabled={notAvailable} key='buyButton' style={[ pinkButtonStyle, styles.details.buttons.buyButton ]} target='_blank' onClick={this.onBuyClick}>
                    <span style={styles.details.buttons.buyText}>{t('productDetail.buyNow')}</span>
                  </Button>
                  {product.get('id') && <WishlistButton productUuid={product.get('id')} />}
                </div>
                {notAvailable &&
                <div style={styles.details.notAvailable}>{t('productDetail.unavailable')}</div>}
              </div>
            </div>
            <div style={styles.clear}/>
            {share &&
            <FacebookShareData
              description={share.get('description')}
              imageUrl={share.getIn([ 'image', 'url' ])}
              title={share.get('title')}
              url={window.location.href}/>}
          </div>
        </ContentContainer>
        <div style={styles.brandProducts}>
          <SmallContainer>
            <div>
              {(!product.get('brandProducts') || product.get('brandProducts').size === 0) &&
              <h1 style={styles.similarProductsTitle}>
                {t('productDetail.moreFromBrand', {}, () => product.getIn([ 'brand', 'name' ]))}
              </h1>}
              {product.get('brandProducts') && product.get('brandProducts').size > 0 &&
              <ProductTiles
                items={Map({ _status: LOADED, data: product.get('brandProducts') })}
                tileProps={{ isDirectPage: !isPopup, location: locationBack }}
                title={t('productDetail.moreFromBrand', {}, (contents, key) => (
                  product.getIn([ 'brand', 'name' ])
                ))}/>}
              {product.get('brandProducts') && product.get('brandProducts').size === 0 &&
              <p style={styles.similarProductsNone}>
                {t('productDetail.noMoreFromBrand', {}, () => product.getIn([ 'brand', 'name' ]))}
              </p>}
              {!product.get('brandProducts') && <Spinner />}
            </div>
          </SmallContainer>
        </div>
        <div style={styles.similarProducts}>
          <SmallContainer>
            <div>
              {(!product.get('similarProducts') || product.get('similarProducts').size === 0) &&
                <h1 style={styles.similarProductsTitle}>{t('productDetail.similarProducts')}</h1>}
              {product.get('similarProducts') && product.get('similarProducts').size > 0 &&
                <ProductTiles
                  items={Map({ _status: LOADED, data: product.get('similarProducts') })}
                  tileProps={{ isDirectPage: !isPopup, location: locationBack }}
                  title={t('productDetail.similarProducts')}/>}
              {product.get('similarProducts') && product.get('similarProducts').size === 0 &&
                <p style={styles.similarProductsNone}>{t('productDetail.noSimilar')}</p>}
              {!product.get('similarProducts') && <Spinner />}
            </div>
          </SmallContainer>
        </div>
        {isPopup && <div style={styles.pbModal} />}
      </div>
    );

    if (isPopup) {
      return (
        <Modal
          isOpen
          style={largeDialogStyle}
          onClose={this.onClose}>
          {content}
        </Modal>
      );
    }
    return content;
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
    return load(this.props.product, this.renderProduct, this.renderProduct, this.renderNotFoundError, this.renderUnexpectedError);
  }

}
