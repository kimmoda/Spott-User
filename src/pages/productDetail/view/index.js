import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Link } from 'react-router';
import { colors, Container, fontWeights, makeTextStyle, mediaQueries, Tiles } from '../../_common/buildingBlocks';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { FETCHING, LOADED, UPDATING } from '../../../data/statusTypes';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { slugify } from '../../../utils';
import Navbar from '../../_common/navbar';
import Spinner from '../../_common/spinner';

const RadiumLink = Radium(Link);

@connect(productSelector, (dispatch) => ({
  onChangeImageSelection: bindActionCreators(actions.changeImageSelection, dispatch)
}))
@Radium
export default class ProductDetail extends Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired
    }).isRequired,
    product: ImmutablePropTypes.mapContains({
      shortName: PropTypes.string.isRequired,
      longName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      images: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          url: PropTypes.string.isRequired,
          uuid: PropTypes.string.isRequired
        })
      ),
      uuid: PropTypes.string.isRequired
    }),
    onChangeImageSelection: PropTypes.func.isRequired
  };

  static needs (props, store) {
    // (Re)fetch the product.
    return store.dispatch(actions.loadProduct(props.params.productId));
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
        width: '60%',
        paddingRight: '1em'
      }
    },
    right: {
      float: 'left',
      width: '100%',
      [mediaQueries.medium]: {
        width: '40%',
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
        borderRadius: '0.25em',
        backgroundColor: colors.white,
        boxShadow: '0 0.063em 0.063em 0 rgba(0, 0, 0, 0.1)',
        border: `solid 0.063em ${colors.whiteThree}`,
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
      wrapper: {
        padding: '1.25em',
        borderRadius: '0.25em',
        backgroundColor: colors.white,
        boxShadow: '0 0.063em 0.063em 0 rgba(0, 0, 0, 0.1)',
        border: `solid 0.063em ${colors.whiteThree}`
      },
      productTitle: {
        ...makeTextStyle(fontWeights.bold, '1.5em'),
        paddingBottom: '0.6663em',
        color: colors.charcoalGray
      },
      productDescription: {
        ...makeTextStyle(fontWeights.regular, '0.938em'),
        paddingBottom: '0.6565em',
        color: colors.slateGray
      },
      match: {
        wrapper: {
          height: '3.75em',
          borderRadius: '0.25em',
          marginBottom: '1.313em',
          border: `solid 0.063em ${colors.whiteThree}`
        }
      },
      price: {
        ...makeTextStyle(fontWeights.bold, '1.5em'),
        color: colors.charcoalGray,
        paddingBottom: '1.25em'
      },
      buttons: {
        wrapper: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        squareButton: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.625em',
          height: '2.625em',
          borderRadius: '0.125em',
          border: `solid 0.063em ${colors.coolGray}`,
          marginRight: '0.75em'
        },
        growButton: {
          alignItems: 'center',
          backgroundColor: colors.green,
          borderRadius: '0.125em',
          display: 'flex',
          flexGrow: 1,
          height: '2.625em',
          justifyContent: 'center',
          textDecoration: 'none'
        },
        buyText: {
          ...makeTextStyle(fontWeights.regular, '0.875em', '0.037em'),
          color: colors.white
        }
      },
      line: {
        margin: '1.313em 0',
        border: 'none',
        height: '0.063em',
        backgroundColor: colors.whiteThree
      },
      offers: {
        label: {
          ...makeTextStyle(fontWeights.regular, '0.938em'),
          color: colors.slateGray,
          paddingRight: '0.5em'
        },
        ammount: {
          ...makeTextStyle(fontWeights.regular, '0.938em'),
          color: colors.coolGray
        }
      }
    },
    brand: {
      wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1.25em',
        marginTop: '1em',
        height: '3.75em',
        borderRadius: '0.25em',
        backgroundColor: colors.white,
        boxShadow: '0 0.063em 0.063em 0 rgba(0, 0, 0, 0.1)',
        border: `solid 0.063em ${colors.whiteThree}`
      },
      left: {
        display: 'flex',
        alignItems: 'center'
      },
      logo: {
        width: '1.875em',
        height: '1.875em',
        marginRight: '0.625em'
      },
      name: {
        ...makeTextStyle(fontWeights.regular, '0.938em'),
        color: colors.slateGray
      }
    },
    report: {
      wrapper: {
        marginTop: '1em'
      },
      text: {
        ...makeTextStyle(fontWeights.regular, '0.875em'),
        color: colors.coolGray
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
      ...makeTextStyle(fontWeights.regular, '1.75em'),
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
    const { onChangeImageSelection, product } = this.props;
    if (product.get('_status') === FETCHING) {
      return (<Spinner />);
    } else if (product.get('_status') === LOADED || product.get('_status') === UPDATING) {
      return (
        <div>
          <Navbar currentPathname={this.props.location.pathname}/>
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
                <div style={styles.details.wrapper}>
                  <h2 style={styles.details.productTitle}>{product.get('shortName')}</h2>
                  {/* <div style={styles.details.match.wrapper}>

                  </div>*/}
                  <p style={styles.details.productDescription}>{product.get('description')}</p>
                  <h2 style={styles.details.price}>{product.getIn([ 'offerings', '0', 'price', 'amount' ])}&nbsp;{product.getIn([ 'offerings', '0', 'price', 'currency' ])}</h2>
                  <div style={styles.details.buttons.wrapper}>
                    {/* <div style={styles.details.buttons.squareButton}>
                      <svg height='15' viewBox='0 0 16 15' width='16' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><path d='M-4-5h24v24H-4'/><path d='M8 14.68l-1.16-1.056C2.72 9.888 0 7.416 0 4.4 0 1.928 1.936 0 4.4 0 5.792 0 7.128.648 8 1.664 8.872.648 10.208 0 11.6 0 14.064 0 16 1.928 16 4.4c0 3.016-2.72 5.488-6.84 9.224L8 14.68z' fill='#A7A6A9'/></g></svg>
                    </div>
                    <div style={styles.details.buttons.squareButton}>
                      <svg height='14' viewBox='0 0 20 14' width='20' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><path d='M-2-6h24v24H-2'/><path d='M12 4H0v2h12V4zm0-4H0v2h12V0zm4 8V4h-2v4h-4v2h4v4h2v-4h4V8h-4zM0 10h8V8H0v2z' fill='#A7A6A9'/></g></svg>
                    </div>*/}
                    <a href={product.getIn([ 'offerings', '0', 'url' ])} style={styles.details.buttons.growButton}>
                      <span style={styles.details.buttons.buyText}>BUY NOW</span>
                    </a>
                  </div>
                  {/* <hr style={styles.details.line}/>
                  <span style={styles.details.offers.label}>All vendors</span><span style={styles.details.offers.ammount}>(3)</span>*/}
                </div>
                <div style={styles.brand.wrapper}>
                  <div style={styles.brand.left}>
                    {product.getIn([ 'brand', 'logo' ]) && <img src={product.getIn([ 'brand', 'logo', 'url' ])} style={styles.brand.logo} />} <span style={styles.brand.name}>{product.getIn([ 'brand', 'name' ])}</span>
                  </div>
                  {/* <svg height='13' viewBox='0 0 8 13' width='8' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><path d='M-8-5.25h24v24H-8'/><path d='M.59 11.34l4.58-4.59L.59 2.16 2 .75l6 6-6 6' fill='#221F26' fill-opacity='.54' /></g></svg>*/}
                </div>
                {/* <div style={styles.report.wrapper}>
                  <span style={styles.report.text}>Report this product</span>
                </div>*/}
              </div>
              <div style={styles.clear} />
              {/* TODO: Didier will provide title, description and maybe images for sharing */}
              <FacebookShareData description={product.get('description')} imageUrls={product.get('images') && product.get('images').map((image) => image.get('url')).toJS()} title={product.get('shortName')} />
            </Container>
          </div>
          <div style={styles.similarProducts}>
            <Container>
              <h1 style={styles.similarProductsTitle}>Similar items</h1>
              {product.get('similarProducts') && product.get('similarProducts').size > 0 && <Tiles horizontalSpacing={30} items={product.get('similarProducts')} numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }} tile={<SimilarProduct />} verticalSpacing={101} />}
              {product.get('similarProducts') && product.get('similarProducts').size === 0 && <p style={styles.similarProductsNone}>No similar items found.</p>}
            </Container>
          </div>
        </div>
      );
    }
    return (<div></div>);
  }
}

@Radium
export class SimilarProduct extends Component {
  static propTypes = {
    item: PropTypes.object,
    style: PropTypes.object
  }

  static styles = {
    wrapper: {
      display: 'block',
      textDecoration: 'none',
      borderRadius: '0.25em',
      backgroundColor: colors.white,
      boxShadow: '0 0.063em 0.063em 0 rgba(0, 0, 0, 0.1)',
      border: `solid 0.063em ${colors.whiteThree}`,
      cursor: 'pointer'
    },
    name: {
      ...makeTextStyle(fontWeights.regular, '0.938em'),
      color: colors.slateGray,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    price: {
      ...makeTextStyle(fontWeights.bold, '0.875em'),
      color: colors.cool
    },
    textWrapper: {
      padding: '1em'
    },
    imageWrapper: {
      width: '100%',
      paddingTop: '100%',
      position: 'relative',
      height: 0
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxWidth: '100%',
      maxHeight: '100%',
      margin: 'auto',
      zoom: '8'
    }
  }

  render () {
    const { styles } = this.constructor;
    const { item, style } = this.props;
    return (
      <div style={style}>
        <RadiumLink style={styles.wrapper} to={`/product/${slugify(item.get('shortName'))}/${item.get('id')}`}>
          <div style={styles.imageWrapper}>
            <img src={item.get('image')} style={styles.image} />
          </div>
          <div style={styles.textWrapper}>
            <p style={styles.name}>{item.get('shortName')}</p>
            <p style={styles.price}>{item.getIn([ 'price', 'amount' ])}&nbsp;{item.getIn([ 'price', 'currency' ])}</p>
          </div>
        </RadiumLink>
      </div>
    );
  }
}
