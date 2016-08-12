import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';
import { Map } from 'immutable';
import { colors, load, fontWeights, makeTextStyle, mediaQueries, pinkButtonStyle, Button, Container, Money, ShareButton, Spinner } from '../../_common/buildingBlocks';
import ProductTiles from '../../_common/tiles/productTiles';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import { LOADED } from '../../../data/statusTypes';

@localized
@connect(productSelector, (dispatch) => ({
  loadScene: bindActionCreators(actions.loadScene, dispatch),
  toggleSaveScene: bindActionCreators(actions.toggleSaveScene, dispatch)
}))
@Radium
export default class Scene extends Component {

  static propTypes = {
    children: PropTypes.node,
    currentLocale: PropTypes.string.isRequired,
    loadScene: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    params: PropTypes.shape({
      productId: PropTypes.string,
      sceneId: PropTypes.string.isRequired
    }).isRequired,
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
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    // this.share = ::this.share;
    this.renderScene = ::this.renderScene;
    this.renderNotFoundError = ::this.renderNotFoundError;
    this.renderUnexpectedError = ::this.renderUnexpectedError;
  }

  async componentWillMount () {
    // (Re)fetch the scene.
    await this.props.loadScene(this.props.params.sceneId);
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.params.sceneId !== nextProps.params.sceneId) {
      await this.props.loadScene(nextProps.params.sceneId);
    }
  }

  static styles = {
    scene: {
      container: {
        position: 'relative'
      },
      image: {
        width: '100%'
      }
    },
    characters: {
      position: 'absolute',
      left: '1.25em',
      right: '1.25em',
      textAlign: 'right',
      top: '1.125em'
    },
    products: {
      position: 'absolute',
      bottom: '2em'
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
    sceneFrom: {
      ...makeTextStyle(fontWeights.bold, '0.6111em', '0.1346em'),
      opacity: 0.5,
      color: colors.dark,
      textTransform: 'uppercase',
      paddingTop: '0.8695em'
    },
    title: {
      base: {
        ...makeTextStyle(fontWeights.regular, '1.2777em', '0.0222em'),
        color: colors.dark,
        fontWeight: 400
      },
      emph: {
        opacity: 0.5
      }
    },
    header: {
      paddingBottom: '1.1111em',
      paddingTop: '1.1111em',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  };

  renderScene () {
    const styles = this.constructor.styles;
    const { isAuthenticated, children, currentLocale, params: { productId }, scene, t, toggleSaveScene } = this.props;
    return (
      <div>
        <Container>
          <div style={styles.header}>
            <div style={styles.left}>
              <div style={styles.sceneFrom}>Scene from</div>
              <h1 style={styles.title.base}>Daredevil <span style={styles.title.emph}>- SO3E07</span> World on Fire</h1>
            </div>
            <div style={styles.right}>
              {isAuthenticated
                ? <Button style={[ pinkButtonStyle ]} onClick={toggleSaveScene}>
                    {scene.get('saved') ? t('scene.unsave') : t('scene.save')}
                  </Button>
                : <Button style={[ pinkButtonStyle ]} to={{
                  pathname: `/${currentLocale}/login`,
                  state: { modal: true, returnTo: location.pathname }
                }}>
                  {t('scene.save')}
                </Button>}
              <ShareButton href={`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=Discover this scene now on Spott`}>
                share
              </ShareButton>
            </div>
          </div>
          <div style={styles.scene.container}>
            {scene.get('image') && <img src={scene.getIn([ 'image', 'url' ])} style={styles.scene.image} />}
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
            <div style={styles.images.wrapper}>
              {scene.get('products').take(6).map((product) =>
                <Link key={product.get('id')} to={`/${currentLocale}/scene/series/test/${scene.get('id')}/product/${product.get('id')}`}>
                  <div style={[ styles.images.small.wrapper, product.get('id') === productId && styles.images.selected ]}>
                    <img
                      src={`${product.getIn([ 'image', 'url' ])}?height=160&width=160`}
                      style={styles.images.small.image} />
                  </div>
                </Link>)}
            </div>
          </div>
          <div style={{ clear: 'both' }} />
        </Container>
        {children}
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
    return <div></div>;
  }

  render () {
    return load(this.props.scene, this.renderScene, null, this.renderNotFoundError, this.renderUnexpectedError);
  }

}
