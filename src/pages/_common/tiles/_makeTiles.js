/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Radium from 'radium';
import { colors, fontWeights, makeTextStyle, SectionTitle } from '../buildingBlocks';
import localized from '../localized';
import { Tiles } from './_tiles';
import { LOADED, UPDATING } from '../../../data/statusTypes';

const ArrowLeftImage = (props) => (
  <svg {...props} version='1.1' viewBox='0 0 8 13'>
    <g fill='none' fill-rule='evenodd' id='UI' stroke='none' strokeWidth='1'>
      <g id='Large-Desktop-Homepage' transform='translate(-1259.000000, -1067.000000)'>
        <g id='Section-New-Scenes-For-You' transform='translate(0.000000, 1017.000000)'>
          <g id='Heading' transform='translate(137.000000, 40.000000)'>
            <g id='Navigation' transform='translate(1010.000000, 4.000000)'>
              <g id='Icon-Arrow-Left' transform='translate(116.000000, 12.500000) scale(-1, 1) translate(-116.000000, -12.500000) translate(104.000000, 0.000000)'>
                <polygon id='Bounds' points='0 0.75 24 0.75 24 24.75 0 24.75'></polygon>
                <polygon fill={props.color} id='Shape' points='8.59 17.34 13.17 12.75 8.59 8.16 10 6.75 16 12.75 10 18.75'></polygon>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
ArrowLeftImage.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object
};
const ArrowRightImage = (props) => (
  <svg {...props} version='1.1' viewBox='0 0 8 13'>
    <g fill='none' fill-rule='evenodd' id='UI' stroke='none' strokeWidth='1'>
      <g id='Large-Desktop-Homepage' transform='translate(-1289.000000, -1067.000000)'>
        <g id='Section-New-Scenes-For-You' transform='translate(0.000000, 1017.000000)'>
          <g id='Heading' transform='translate(137.000000, 40.000000)'>
            <g id='Navigation' transform='translate(1010.000000, 4.000000)'>
              <g id='Icon-Arrow-Right' transform='translate(134.000000, 0.000000)'>
                <polygon id='Bounds' points='0 0.75 24 0.75 24 24.75 0 24.75'></polygon>
                <polygon fill={props.color} id='Shape' points='8.59 17.34 13.17 12.75 8.59 8.16 10 6.75 16 12.75 10 18.75'></polygon>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
ArrowRightImage.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object
};

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
    @localized
    @Radium
    class GenericTiles extends Component {

      static propTypes = {
        currentLocale: PropTypes.string.isRequired,
        items: ImmutablePropTypes.mapContains({
          _status: PropTypes.string,
          data: ImmutablePropTypes.list
        }),
        listStyle: PropTypes.object,
        renderEmptyComponent: PropTypes.func,
        renderLoadingComponent: PropTypes.func,
        renderNotFoundComponent: PropTypes.func,
        renderUnexpectedComponent: PropTypes.func,
        style: PropTypes.object,
        t: PropTypes.func.isRequired,
        title: PropTypes.string,
        titleStyle: PropTypes.object
      };

      constructor (props) {
        super(props);
        this.onBackClick = ::this.onBackClick;
        this.onMoreClick = ::this.onMoreClick;
        this.state = {
          first: 0
        };
      }

      componentWillReceiveProps (nextProps) {
        if (this.props.items.get('_status') === UPDATING &&
           nextProps.items.get('_status') === LOADED) {
          // We've fetched the list earlier, but now we refetched it. Check whether
          // it is necessary to reset position (we prefer retaining position).
          // Note that we do this relatively naïve for now. A better check certainly
          // is possible.
          if (this.state.first >= nextProps.items.get('data').size) {
            this.setState({ first: 0 });
          }
          // Retain position.
          return;
        }

        // Reset position
        this.setState({ first: 0 }); // Reset "caroussel"
      }

      onBackClick (e) {
        e.preventDefault();
        this.setState({ first: this.state.first === 0 ? this.props.items.get('data').size - 1 : this.state.first - 1 });
      }

      onMoreClick (e) {
        e.preventDefault();
        this.setState({ first: this.state.first === this.props.items.get('data').size - 1 ? 0 : this.state.first + 1 });
      }

      static styles = {
        container: {
          position: 'relative',
          userSelect: 'none'
        },
        header: {
          display: 'flex',
          alignItems: 'baseline'
        },
        headerIcons: {
          flex: '1 1 auto',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        },
        leftArrowWrapper: {
          padding: 0,
          cursor: 'pointer',
          paddingRight: '0.25em',
          marginRight: '0.5em'
        },
        rightArrowWrapper: {
          padding: 0,
          cursor: 'pointer',
          paddingLeft: '0.25em'
        },
        arrowIcon: {
          cursor: 'pointer',
          width: '8px',
          height: '12px'
        },
        return: {
          ...makeTextStyle(fontWeights.bold),
          color: colors.dark,
          textDecoration: 'none'
        },
        emptyText: {
          paddingTop: '3em',
          ...makeTextStyle(fontWeights.medium, '0.875em'),
          color: colors.slateGray
        }
      };

      render () {
        const { styles } = this.constructor;
        const { items, listStyle, renderEmptyComponent, renderLoadingComponent, renderNotFoundComponent, renderUnexpectedComponent, style, titleStyle, title } = this.props;
        const arrowColor = (titleStyle && titleStyle.color) || colors.dark;

        return (
          <div style={[ styles.container, style ]}>
            <div style={styles.header}>
              <RadiumSectionTitle style={titleStyle}>{title}</RadiumSectionTitle>
              {items.get('data').size > 1 &&
                <div style={styles.headerIcons}>
                  <div style={styles.leftArrowWrapper} onClick={this.onBackClick}>
                    <ArrowLeftImage color={arrowColor} style={styles.arrowIcon} />
                  </div>
                  <div style={styles.rightArrowWrapper} onClick={this.onMoreClick}>
                    <ArrowRightImage color={arrowColor} style={styles.arrowIcon} />
                  </div>
                </div>}
            </div>
            <RadiumTiles
              first={this.state.first}
              horizontalSpacing={horizontalSpacing}
              items={items}
              numColumns={numColumns}
              renderEmptyComponent={renderEmptyComponent}
              renderLoadingComponent={renderLoadingComponent}
              renderNotFoundComponent={renderNotFoundComponent}
              renderUnexpectedComponent={renderUnexpectedComponent}
              style={listStyle}
              tileRenderer={tileRenderer} />
          </div>
        );
      }
    }
  );
}
