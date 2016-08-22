import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import { List } from 'immutable';
import { colors, RadiumLink, mediaQueries, load } from '../buildingBlocks';

@Radium
export class ProductThumb extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      image: ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }),
      shortName: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
    // Current selected product.
    productId: PropTypes.string,
    scene: ImmutablePropTypes.mapContains({
      shareUrl: PropTypes.string.isRequired
    }).isRequired,
    style: PropTypes.object
  };

  static styles = {
    selected: {
      border: `solid 0.15em ${colors.darkPink}`,
      cursor: 'default',
      boxShadow: '0 0.4444em 0.5555em 0 rgba(0, 0, 0, 0.4)'
    },
    image: {
      bottom: 0,
      height: 'auto',
      left: 0,
      margin: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 'auto'
    },
    imageContainer: {
      height: 0,
      paddingTop: '100%',
      position: 'relative',
      width: '100%',
      borderRadius: '0.25em',
      border: `solid 0.15em ${colors.whiteTwo}`
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, location, scene, productId, style } = this.props;

    return (
      <BaseTile style={style}>
        <RadiumLink alt={item.get('shortName')} key={item.get('id')} title={item.get('shortName')} to={{
          ...location,
          pathname: `${scene.get('shareUrl')}/product/${item.get('id')}`
        }}>
          <div style={[ styles.imageContainer, item.get('id') === productId && styles.selected ]}>
            {item.get('image') && <img
              alt={item.get('shortName')}
              src={`${item.getIn([ 'image', 'url' ])}?height=160&width=160`}
              style={styles.image}
              title={item.get('shortName')} />}
          </div>
        </RadiumLink>
      </BaseTile>
    );
  }
}

@Radium
export default class ProductThumbs extends Component {

  static propTypes = {
    first: PropTypes.number,
    horizontalSpacing: PropTypes.number.isRequired,
    items: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    numColumns: PropTypes.objectOf(PropTypes.number).isRequired, // Maps screen widths on numColumns
    renderEmptyComponent: PropTypes.func,
    renderLoadingComponent: PropTypes.func,
    renderNotFoundComponent: PropTypes.func,
    renderUnexpectedComponent: PropTypes.func,
    // The component for rendering the tile. Is cloned with an additional
    // 'value' prop.
    style: PropTypes.object,
    tileProps: PropTypes.object
  };

  rotateList (l, count) {
    let result = l;
    if (l.size === 0) { return l; }
    for (let i = 0; i < count; i++) {
      const first = result.first();
      result = result.push(first);
      result = result.shift();
    }
    return result;
  }

  render () {
    const {
      first, horizontalSpacing, items, numColumns, renderEmptyComponent,
      renderLoadingComponent, renderNotFoundComponent, renderUnexpectedComponent,
      style: tilesStyle, tileProps
    } = this.props;
    const style = {
      display: 'inline-block',
      width: `${100 / numColumns.extraSmall}%`,
      paddingLeft: `${horizontalSpacing / 2}em`,
      paddingRight: `${horizontalSpacing / 2}em`,
      [mediaQueries.small]: {
        width: `${100 / numColumns.small}%`
      },
      [mediaQueries.medium]: {
        width: `${100 / numColumns.medium}%`,
        paddingLeft: `${horizontalSpacing}em`,
        paddingRight: `${horizontalSpacing}em`
      },
      [mediaQueries.large]: {
        width: `${100 / numColumns.large}%`
      },
      [mediaQueries.extraLarge]: {
        width: `${100 / numColumns.extraLarge}%`
      }
    };

    // Determine container style
    const containerStyle = {
      whiteSpace: 'nowrap',
      position: 'relative',
      marginBottom: '-1em',
      marginLeft: `-${horizontalSpacing / 2}em`,
      marginRight: `-${horizontalSpacing / 2}em`,
      marginTop: '-1em',
      paddingBottom: '1em',
      paddingTop: '1em',
      overflow: 'hidden',
      [mediaQueries.medium]: {
        marginLeft: `-${horizontalSpacing}em`,
        marginRight: `-${horizontalSpacing}em`
      }
    };

    // Return render result
    return load(
      items,
      () => (
        <div style={[ containerStyle, tilesStyle ]}>
          {(this.rotateList(items.get('data') || List(), first).map((item, i) => <ProductThumb {...(tileProps || {})} item={item} key={i} style={style} />))}
        </div>
      ),
      renderLoadingComponent,
      renderNotFoundComponent,
      renderUnexpectedComponent,
      renderEmptyComponent
    );
  }

}
