import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { goBack as routerGoBack, replace as routerReplace } from 'react-router-redux';
import Radium from 'radium';
import { Map } from 'immutable';
import { colors, load, fontWeights, largeDialogStyle, makeTextStyle, mediaQueries, pinkButtonStyle, Button, SmallContainer, Modal, Money, ShareButton, Spinner } from '../../_common/buildingBlocks';
import ProductTiles from '../../_common/tiles/productTiles';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import { LOADED } from '../../../data/statusTypes';
import Marker from '../../_common/tiles/_marker';

@localized
@connect(productSelector, (dispatch) => ({
  loadScene: bindActionCreators(actions.loadScene, dispatch),
  routerGoBack: bindActionCreators(routerGoBack, dispatch),
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
    routerGoBack: PropTypes.func.isRequired,
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
    this.props.routerGoBack();
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
      borderRadius: '0.25em',
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
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-2.3em'
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
      right: {
        display: 'flex',
        marginTop: '0.5em',
        [mediaQueries.medium]: {
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
    const { isAuthenticated, children, currentLocale, params: { productId }, scene, t, toggleSaveScene } = this.props;
    const isPopup = this.props.location.state && this.props.location.state.modal;
    const ContentContainer = isPopup ? (props) => <div>{props.children}</div> : SmallContainer;

    const content =
      <div>
        <ContentContainer>
          <div style={styles.header.container}>
            <div style={styles.header.left}>
              <div style={[ styles.header.sceneFrom.base, isPopup && styles.header.sceneFrom.light ]}>Scene from</div>
              <h1 style={[ styles.header.title.base, isPopup && styles.header.title.light ]}>
                Daredevil <span style={styles.header.title.emph}>- SO3E07</span> World on Fire
              </h1>
            </div>
            <div style={styles.header.right}>
              {isAuthenticated
                ? <Button style={[ pinkButtonStyle, styles.header.saveButton.base, isPopup && styles.header.saveButton.light ]} onClick={toggleSaveScene}>
                    {scene.get('saved') ? t('scene.unsave') : t('scene.save')}
                  </Button>
                : <Button style={[ pinkButtonStyle, styles.header.saveButton.base, isPopup && styles.header.saveButton.light ]} to={{
                  pathname: `/${currentLocale}/login`,
                  state: { modal: true, returnTo: location.pathname }
                }}>
                  {t('scene.save')}
                </Button>}
              <ShareButton href={`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(scene.get('shareUrl'))}&title=Discover this scene now on Spott`} style={[ styles.header.shareButton.base, isPopup && styles.header.shareButton.light ]}>
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
            {scene.get('products').map((product) =>
              <Marker key={product.get('id')} relativeLeft={product.getIn([ 'position', 'x' ])} relativeTop={product.getIn([ 'position', 'y' ])} />)}
            <div style={styles.images.wrapper}>
              {scene.get('products').take(6).map((product) =>
                <Link key={product.get('id')} to={`${scene.get('shareUrl')}/product/${product.get('id')}`}>
                  <div style={[ styles.images.small.wrapper, product.get('id') === productId && styles.images.selected ]}>
                    <img
                      src={`${product.getIn([ 'image', 'url' ])}?height=160&width=160`}
                      style={styles.images.small.image} />
                  </div>
                </Link>)}
            </div>
          </div>
          <div style={{ clear: 'both' }} />
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
    return <div></div>;
  }

  render () {
    return load(this.props.scene, this.renderScene, null, this.renderNotFoundError, this.renderUnexpectedError);
  }

}
