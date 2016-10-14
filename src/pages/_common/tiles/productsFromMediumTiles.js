import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { fontWeights, makeTextStyle, mediaQueries, LoadComponent, Message, RadiumLink } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import { LAZY } from '../../../data/statusTypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';
import { sceneTilesStyle } from './styles';

@localized
@Radium
export class ProductsFromMediumTile extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    fetchMediumTopProducts: PropTypes.func.isRequired,
    item: ImmutablePropTypes.mapContains({
      profileImage: ImmutablePropTypes.map,
      title: PropTypes.string.isRequired,
      products: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          name: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        }).isRequired,
      ),
      logo: PropTypes.string
    }).isRequired,
    mediumHasTopProducts: ImmutablePropTypes.mapContains({
      data: PropTypes.list
    }).isRequired,
    products: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '125%',
      height: 0
    },
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...makeTextStyle(fontWeights.bold, '0.825em', '0.219em'),
      color: '#ffffff',
      textTransform: 'uppercase',
      position: 'relative',
      paddingLeft: '1em',
      paddingRight: '1em'
    },
    image: {
      backgroundSize: 'cover',
      backgroundPosition: 'center 20%',
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
      position: 'relative',
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
    },
    contentWrapper: {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      left: 0,
      position: 'absolute',
      right: 0,
      top: '20%'
    },
    message: {
      paddingLeft: '1.5em',
      paddingRight: '1.5em',
      textAlign: 'center',
      whiteSpace: 'pre-line'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { currentLocale, item, mediumHasTopProducts, products, style, t } = this.props;
    let topProducts = mediumHasTopProducts.get(item.get('id')) || Map({ _status: LAZY, data: List() });
    topProducts = topProducts.set('data', (topProducts.get('data') || List()).map((id) => products.get(id)).filter((p) => p.get('image')).take(4));

    return (
      <BaseTile key={item.get('id')} load={() => this.props.fetchMediumTopProducts({ mediumId: item.get('id') })} style={style}>
        <div style={styles.container}>
          <RadiumLink title={item.get('title')} to={item.get('shareUrl')}>
            <div
              style={[
                styles.image,
                item.get('profileImage') && {
                  backgroundImage: `url("${item.getIn([ 'profileImage', 'url' ])}?height=349&width=621")`
                } ]}>
              <div style={sceneTilesStyle.layer}/>
              {item.get('logo')
                ? <img src={item.get('logo')} style={styles.logo} title={item.get('name')} />
                : <p style={styles.text}>{item.get('title')}</p>}
            </div>
          </RadiumLink>
          <LoadComponent
            currentLocale={currentLocale}
            item={topProducts}
            renderEmpty={() => <Message style={styles.message}>{t('common.empty')}</Message>}
            renderInContainer={(children) => <div style={styles.contentWrapper}>{children}</div>}
            renderItem={() =>
              <div style={styles.productWrapper}>
                {topProducts.get('data').map((product) => (
                  <RadiumLink key={product.get('id')} style={styles.productImageWrapper} title={product.get('shortName')} to={product.get('shareUrl')}>
                    <div style={[
                      styles.productImage, {
                        backgroundImage: `url("${product.getIn([ 'image', 'url' ])}?height=250&width=250")`,
                        [mediaQueries.medium]: {
                          backgroundImage: `url("${product.getIn([ 'image', 'url' ])}?height=214&width=214")`
                        }
                      } ]} />
                  </RadiumLink>
                ))}
              </div>}
            renderNotFound={() => <Message style={styles.message}>{t('common.notExist')}</Message>}
            renderUnexpected={() => <Message style={styles.message}>{t('common.unexpected')}</Message>}
            t={t} />
        </div>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 1, small: 2, medium: 2, large: 3, extraLarge: 3 },
  (instanceProps) => <ProductsFromMediumTile {...instanceProps} />
);
