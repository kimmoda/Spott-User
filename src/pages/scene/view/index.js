import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push as routerPush, replace as routerReplace } from 'react-router-redux';
import Radium from 'radium';
import { Map } from 'immutable';
import { colors, load, fontWeights, largeDialogStyle, makeTextStyle, mediaQueries, pinkButtonStyle, Button, SmallContainer, Modal, ShareButton } from '../../_common/buildingBlocks';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import { LOADED } from '../../../data/statusTypes';
import Marker, { largeMarkerStyle } from '../../_common/tiles/_marker';
import { MOVIE, SERIES } from '../../../data/mediumTypes';
import { formatEpisodeNumber } from '../../../utils';
import ProductThumbs from '../../_common/tiles/productThumbs';

@localized
@connect(productSelector, (dispatch) => ({
  loadScene: bindActionCreators(actions.loadScene, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  routerReplace: bindActionCreators(routerReplace, dispatch),
  toggleSaveScene: bindActionCreators(actions.toggleSaveScene, dispatch)
}))
@Radium
export default class Scene extends Component {

  static propTypes = {
    children: PropTypes.node,
    currentLocale: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loadScene: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    params: PropTypes.shape({
      productId: PropTypes.string,
      sceneId: PropTypes.string.isRequired
    }).isRequired,
    routerPush: PropTypes.func.isRequired,
    routerReplace: PropTypes.func.isRequired,
    scene: ImmutablePropTypes.mapContains({
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string,
        id: PropTypes.string
      }),
      id: PropTypes.string,
      products: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          image: ImmutablePropTypes.mapContains({
            url: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired
          }),
          id: PropTypes.string.isRequired,
          price: ImmutablePropTypes.mapContains({
            amount: PropTypes.number,
            currency: PropTypes.string
          }),
          shortName: PropTypes.string.isRequired
        }).isRequired
      ),
      shareUrl: PropTypes.string
    }),
    t: PropTypes.func.isRequired,
    toggleSaveScene: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    // this.share = ::this.share;
    this.renderScene = ::this.renderScene;
    this.renderNotFoundError = ::this.renderNotFoundError;
    this.renderUnexpectedError = ::this.renderUnexpectedError;
    this.onClose = ::this.onClose;
  }

  async componentWillMount () {
    const { productId, sceneId } = this.props.params;
    // (Re)fetch the scene.
    const scene = await this.props.loadScene(sceneId);
    // Update the url, display the first product.
    if (scene.products.length > 0 && !productId) {
      this.props.routerReplace({ ...this.props.location, pathname: `${this.props.location.pathname}/product/${scene.products[0].id}` });
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { productId, sceneId } = this.props.params;
    // (Re)fetch the scene.
    if (sceneId !== nextProps.params.sceneId) {
      const scene = await this.props.loadScene(nextProps.params.sceneId);
      // Update the url, display the first product.
      if (scene.products.length > 0 && !productId) {
        this.props.routerReplace({ ...this.props.location, pathname: `${this.props.location.pathname}/product/${scene.products[0].id}` });
      }
    }
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || '/');
  }

  static styles = {
    scene: {
      container: {
        position: 'relative',
        paddingTop: '56%',
        height: 0,
        width: '100%'
      },
      image: {
        width: '100%'
      }
    },
    markers: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    },
    characters: {
      left: '1.25em',
      position: 'absolute',
      right: '1.25em',
      textAlign: 'right',
      top: '1.125em'
    },
    products: {
      position: 'absolute',
      bottom: '2em'
    },
    image: {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderTopLeftRadius: '0.25em',
      borderTopRightRadius: '0.25em',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    images: {
      selected: {
        border: `solid 0.15em ${colors.darkPink}`,
        cursor: 'default',
        boxShadow: '0 0.8888em 1.1111em 0 rgba(0, 0, 0, 0.4)'
      },
      wrapper: {
        width: '100%',
        paddingLeft: '1em',
        paddingRight: '1em',
        textAlign: 'center',
        // Center the images on the bottom-line of the scene.
        transform: 'translateY(-33.3333%)',
        pointerEvents: 'none'
      },
      item: {
        pointerEvents: 'all'
      },
      small: {
        wrapper: {
          backgroundColor: 'white',
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
    subtile: {
      base: {
        height: '2em',
        position: 'relative',
        display: 'inline-block',
        opacity: 0.98,
        width: '2em',
        [mediaQueries.large]: {
          width: '2.5em',
          height: '2.5em'
        }
      },
      face: {
        marginLeft: '0.4em'
      }
    },
    subtileImage: {
      bottom: 0,
      height: 'auto',
      left: 0,
      margin: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 'auto',
      transition: 'filter 0.25s ease-in-out',
      ':hover': {
        filter: 'opacity(70%)'
      }
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
          overflow: 'hidden'
        }
      },
      right: {
        display: 'flex',
        marginTop: '0.5em',
        [mediaQueries.medium]: {
          flex: '0 0',
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

  renderScene () {
    const styles = this.constructor.styles;
    const { isAuthenticated, children, currentLocale, location, params: { productId }, scene, t, toggleSaveScene } = this.props;
    const isPopup = location.state && location.state.modal;
    const ContentContainer = isPopup ? (props) => <div>{props.children}</div> : SmallContainer;
    const share = scene.get('share');

    const titleLinkStyle = Object.assign({}, styles.header.link.base, isPopup && styles.header.link.light);

    const content =
      <div>
        <ContentContainer>
          <div style={styles.header.container}>
            <div style={styles.header.left}>
              <div style={[ styles.header.sceneFrom.base, isPopup && styles.header.sceneFrom.light ]}>{t('scene.sceneFrom')}</div>
              <h1 style={[ styles.header.title.base, isPopup && styles.header.title.light ]}>
                {(() => {
                  if (scene.get('type') === SERIES) {
                    return (<span><Link activeStyle={titleLinkStyle} style={titleLinkStyle} to={scene.getIn([ 'series', 'shareUrl' ])}>{scene.getIn([ 'series', 'title' ]) || '\u00A0'}</Link> <span style={styles.header.title.emph}>- {formatEpisodeNumber(scene.getIn([ 'season', 'number' ]), scene.getIn([ 'episode', 'number' ]))}</span> {scene.getIn([ 'episode', 'title' ])}</span>);
                  } else if (scene.get('type') === MOVIE) {
                    return (<Link activeStyle={titleLinkStyle} style={titleLinkStyle} to={scene.getIn([ 'movie', 'shareUrl' ])}>{scene.getIn([ 'movie', 'title' ]) || '\u00A0'}</Link>);
                  }
                  return (<div style={titleLinkStyle}>{'\u00A0'}</div>);
                })()}
              </h1>
            </div>
            <div style={styles.header.right}>
              {isAuthenticated
                ? <Button
                  style={[
                    pinkButtonStyle,
                    styles.header.saveButton.base,
                    isPopup && styles.header.saveButton.light,
                    scene.get('saved') && styles.header.saveButton.active
                  ]}
                  onClick={toggleSaveScene}>
                    {scene.get('saved') ? t('scene.unsave') : t('scene.save')}
                  </Button>
                : <Button style={[ pinkButtonStyle, styles.header.saveButton.base, isPopup && styles.header.saveButton.light ]} to={{
                  pathname: `/${currentLocale}/login`,
                  state: { modal: true, returnTo: location.pathname }
                }}>
                  {t('scene.save')}
                </Button>}
              <ShareButton disabled={!share} href={share && `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=${share.get('title')}`} style={[ styles.header.shareButton.base, isPopup && styles.header.shareButton.light ]}>
                {t('common.share')}
              </ShareButton>
            </div>
          </div>
          <div style={styles.scene.container}>
            <div style={[ styles.image, scene.get('image') && { backgroundImage: `url("${scene.getIn([ 'image', 'url' ])}?width=750&height=422")` } ]} />
            <div style={styles.characters}>
              {scene.get('characters').take(8).map((character) =>
                <div key={character.get('id')} style={[ styles.subtile.base, styles.subtile.face ]}>
                  <img
                    alt={character.get('name')}
                    key={character.get('id')}
                    src={`${character.getIn([ 'image', 'url' ])}?height=90&width=90`}
                    style={styles.subtileImage}
                    title={character.get('name')}/>
                </div>)}
            </div>
            <div style={styles.markers}>
              {/* Display product of products with a position. Global products don't have a position. */}
              {scene.get('products').filter((product) => product.get('position')).map((product) =>
                <Link alt={product.get('shortName')} key={product.get('id')} title={product.get('shortName')} to={{
                  ...location,
                  pathname: `${scene.get('shareUrl')}/product/${product.get('id')}`
                }}>
                  <Marker key={product.get('id')} relativeLeft={product.getIn([ 'position', 'x' ])} relativeTop={product.getIn([ 'position', 'y' ])} selected={productId === product.get('id')} style={largeMarkerStyle} />
                </Link>)}
            </div>
            <div style={styles.images.wrapper}>
              <ProductThumbs
                horizontalSpacing={0.555}
                items={Map({ _status: LOADED, data: scene.get('products') })}
                numColumns={{ extraSmall: 7, small: 9, medium: 10, large: 11, extraLarge: 12 }}
                tileProps={{ location, productId, scene, innerStyle: styles.images.item }} />
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          {share &&
            <FacebookShareData
              description={share.get('description')}
              imageUrl={share.getIn([ 'image', 'url' ])}
              title={share.get('title')}
              url={window.location.href} />}
        </ContentContainer>
        {children}
      </div>;

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
      <SmallContainer>
        <p style={styles.emptyText}>{t('productDetail.notExist')} <Link style={styles.return} to={`/${currentLocale}`}>{t('common.return')}</Link></p>
      </SmallContainer>
    );
  }

  renderUnexpectedError () {
    return <div />;
  }

  render () {
    return load(this.props.scene, this.renderScene, null, this.renderNotFoundError, this.renderUnexpectedError);
  }

}
