/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Radium from 'radium';
import { colors, mediaQueryThresholds, fontWeights, makeTextStyle, SectionTitle } from '../buildingBlocks';
import localized from '../localized';
import { Tiles } from './_tiles';
import { LOADED, UPDATING } from '../../../data/statusTypes';

const ArrowLeftImage = (props) => (
  <svg {...props} version='1.1' viewBox='0 0 8 13'>
    <g fill='none' fillRule='evenodd' id='UI' stroke='none' strokeWidth='1'>
      <g id='Large-Desktop-Homepage' transform='translate(-1259.000000, -1067.000000)'>
        <g id='Section-New-Scenes-For-You' transform='translate(0.000000, 1017.000000)'>
          <g id='Heading' transform='translate(137.000000, 40.000000)'>
            <g id='Navigation' transform='translate(1010.000000, 4.000000)'>
              <g id='Icon-Arrow-Left' transform='translate(116.000000, 12.500000) scale(-1, 1) translate(-116.000000, -12.500000) translate(104.000000, 0.000000)'>
                <polygon id='Bounds' points='0 0.75 24 0.75 24 24.75 0 24.75' />
                <polygon fill={props.color} id='Shape' points='8.59 17.34 13.17 12.75 8.59 8.16 10 6.75 16 12.75 10 18.75' />
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
    <g fill='none' fillRule='evenodd' id='UI' stroke='none' strokeWidth='1'>
      <g id='Large-Desktop-Homepage' transform='translate(-1289.000000, -1067.000000)'>
        <g id='Section-New-Scenes-For-You' transform='translate(0.000000, 1017.000000)'>
          <g id='Heading' transform='translate(137.000000, 40.000000)'>
            <g id='Navigation' transform='translate(1010.000000, 4.000000)'>
              <g id='Icon-Arrow-Right' transform='translate(134.000000, 0.000000)'>
                <polygon id='Bounds' points='0 0.75 24 0.75 24 24.75 0 24.75' />
                <polygon fill={props.color} id='Shape' points='8.59 17.34 13.17 12.75 8.59 8.16 10 6.75 16 12.75 10 18.75' />
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
        arrowsType: PropTypes.oneOf([ 'none', 'inline', 'top' ]),
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
        tileProps: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object
      };

      static defaultProps = {
        arrowsType: 'top'
      }

      constructor (props) {
        super(props);
        this.onBackClick = ::this.onBackClick;
        this.onMoreClick = ::this.onMoreClick;
        this.onPatchWidth = ::this.onPatchWidth;
        this._patchWidth = ::this._patchWidth;
        this.state = {
          first: 0,
          screenWidth: -1
        };
      }

      componentDidMount () {
        // Create global 'on resize' hook
        window.addEventListener('resize', this.onPatchWidth);
        this.onPatchWidth();
      }

      componentWillUnmount () {
        // Create global 'on resize' hook
        window.removeEventListener('resize', this.onPatchWidth);
        // Cancel any pending timeout
        if (this.patchWidthTimeout) {
          clearTimeout(this.patchWidthTimeout);
        }
      }

      _patchWidth () {
        // Timeout was triggered.
        this.patchWidthTimeout = null;
        // Read width from DOM
        const screenWidth = window.innerWidth;
        // Save width
        this.setState({ screenWidth });
      }

      onPatchWidth () {
        // We have to read the width from the DOM. We try to do this in a performant
        // way using window.requestAnimationFrame.
        if (window.requestAnimationFrame) {
          return window.requestAnimationFrame(this._patchWidth);
        }
        // The performant method failed, fall back to setTimeout(). :(
        this.patchWidthTimeout = setTimeout(this._patchWidth, 66);
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
        headerArrows: {
          flex: '1 1 auto',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        },
        headerArrowLeft: {
          cursor: 'pointer',
          paddingRight: '0.25em',
          marginRight: '0.5em'
        },
        headerArrowRight: {
          cursor: 'pointer',
          paddingLeft: '0.25em'
        },
        inlineArrows: {
          flex: '1 1 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 100,
          pointerEvents: 'none'
        },
        inlineArrowLeft: {
          cursor: 'pointer',
          paddingLeft: '0.75em',
          pointerEvents: 'all'
        },
        inlineArrowRight: {
          cursor: 'pointer',
          paddingRight: '0.75em',
          pointerEvents: 'all'
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
        const {
          arrowsType, items, listStyle, renderEmptyComponent, renderLoadingComponent,
          renderNotFoundComponent, renderUnexpectedComponent, style, tileProps, titleStyle, title
        } = this.props;
        const { screenWidth } = this.state;

        // If we have no known container width (first render), there is no reason to proceed
        if (screenWidth === -1) {
          return <div ref={(x) => { this.container = x; }} style={{ minHeight: 1 }} />;
        }

        // Determine number of items currently visible
        const currentNumColumns = Object.keys(mediaQueryThresholds).reduce((best, mediaQuery) => {
          const mediaQueryThreshold = mediaQueryThresholds[mediaQuery];
          // If the screen width is smaller than the currently visited media query's threshold,
          // the current media query does not match.
          if (screenWidth < mediaQueryThreshold) {
            return best;
          }
          // Ok, the media query matches. Is it a better match than the
          // best match until now? If not, continue...
          if (best.mediaQueryThreshold > mediaQueryThreshold) {
            return best;
          }
          // Ok we have a new best match!
          return { numColumns: numColumns[mediaQuery], mediaQueryThreshold };
        }, { numColumns: -1, mediaQueryThreshold: -1 }).numColumns;

        const renderArrows = (containerStyle, leftStyle, rightStyle, arrowColor) => (
          <div style={containerStyle}>
            <div style={leftStyle} onClick={this.onBackClick}>
              <ArrowLeftImage color={arrowColor} style={styles.arrowIcon} />
            </div>
            <div style={rightStyle} onClick={this.onMoreClick}>
              <ArrowRightImage color={arrowColor} style={styles.arrowIcon} />
            </div>
          </div>
        );

        return (
          <div ref={(x) => { this.container = x; }} style={[ styles.container, style ]}>
            {(arrowsType === 'top' || title) &&
              <div style={styles.header}>
                {title && <RadiumSectionTitle style={titleStyle}>{title}</RadiumSectionTitle>}
                {arrowsType === 'top' && items.get('data').size > currentNumColumns &&
                  renderArrows(
                    styles.headerArrows,
                    styles.headerArrowLeft,
                    styles.headerArrowRight,
                    (titleStyle && titleStyle.color) || colors.dark)}
                </div>}
            {(arrowsType === 'inline') &&
              renderArrows(
                styles.inlineArrows,
                styles.inlineArrowLeft,
                styles.inlineArrowRight,
                colors.white
              )}
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
              tileProps={tileProps}
              tileRenderer={tileRenderer} />
          </div>
        );
      }
    }
  );
}
