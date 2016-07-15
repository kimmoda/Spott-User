import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Radium from 'radium';
import { fontWeights, makeTextStyle, SectionTitle, Tiles } from '../../_common/buildingBlocks';

const RadiumSectionTitle = Radium(SectionTitle);
const RadiumTiles = Radium(Tiles);

/**
 * Abstraction for generating a section with tiles.
 * horizontalSpacing {number} - Spacing between tiles in em
 * numColumns - hash mapping sizes (extraSmall, small, medium, large, extraLarge) on a
 *   number of tiles. Ensure that extraSmall exists.
 * tileRenderer: a tileRenderer function as supported by the Tiles-abstraction.
 */
export default function makeTiles (horizontalSpacing, numColumns, tileRenderer) {
  return (
    @Radium
    class TopLevelMediumTiles extends Component {

      static propTypes = {
        items: ImmutablePropTypes.list,
        style: PropTypes.object,
        listStyle: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object
      };

      static styles = {
        container: {
          position: 'relative'
        },
        tiles: {
        },
        title: {
        }
      }
      render () {
        const { styles } = this.constructor;
        const { items, listStyle, style, titleStyle, title } = this.props;
        return (
          <div style={[ styles.container, style ]}>
            {title && <RadiumSectionTitle style={[ styles.title, titleStyle ]}>{title}</RadiumSectionTitle>}
            <RadiumTiles
              horizontalSpacing={horizontalSpacing}
              items={items}
              numColumns={numColumns}
              style={[ styles.tiles, listStyle ]}
              tileRenderer={tileRenderer} />
          </div>
        );
      }
    }
  );
}
