import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import { mediaQueries, load } from '../buildingBlocks';

@Radium
export class Tiles extends Component {

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
    returnTo: PropTypes.string,
    // The component for rendering the tile. Is cloned with an additional
    // 'value' prop.
    style: PropTypes.object,
    tileProps: PropTypes.object,
    tileRenderer: PropTypes.func.isRequired
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
      style: tilesStyle, tileProps, tileRenderer
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
          {/* We take one item more, so it's already there to display. */}
          {(this.rotateList(items.get('data') || List(), first).take(numColumns.extraLarge + 1).map((item, i) => tileRenderer({ ...(tileProps || {}), style, key: i, item })))}
        </div>
      ),
      renderLoadingComponent,
      renderNotFoundComponent,
      renderUnexpectedComponent,
      renderEmptyComponent
    );
  }

}
