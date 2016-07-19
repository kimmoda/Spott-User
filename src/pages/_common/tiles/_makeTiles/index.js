/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Radium from 'radium';
import { colors, SectionTitle, Tiles } from '../../../_common/buildingBlocks';

const ArrowLeftImage = (props) => (
  <svg height='13px' {...props} version='1.1' viewBox='0 0 8 13' width='8px'>
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
  <svg height='13px' {...props} version='1.1' viewBox='0 0 8 13' width='8px'>
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
    @Radium
    class TopLevelMediumTiles extends Component {

      static propTypes = {
        items: ImmutablePropTypes.list,
        listStyle: PropTypes.object,
        style: PropTypes.object,
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
        this.setState({ first: 0 }); // Reset "caroussel"
      }

      onBackClick (e) {
        e.preventDefault();
        this.setState({ first: this.state.first === 0 ? this.props.items.size - 1 : this.state.first - 1 });
      }

      onMoreClick (e) {
        e.preventDefault();
        this.setState({ first: this.state.first === this.props.items.size - 1 ? 0 : this.state.first + 1 });
      }

      static styles = {
        container: {
          position: 'relative'
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
        headerIcon: {
          padding: '0em 0.5em',
          margin: '0.5em',
          cursor: 'hand'
        },
        list: {
          userSelect: 'none'
        }
      }
      render () {
        const { styles } = this.constructor;
        const { items, listStyle, style, titleStyle, title } = this.props;
        const arrowColor = (titleStyle && titleStyle.color) || colors.dark;
        return (
          <div style={[ styles.container, style ]}>
            <div style={styles.header}>
              {title && <RadiumSectionTitle style={titleStyle}>{title}</RadiumSectionTitle>}
              <div style={styles.headerIcons}><ArrowLeftImage color={arrowColor} style={styles.headerIcon} onClick={this.onBackClick}/><ArrowRightImage color={arrowColor} style={styles.headerIcon} onClick={this.onMoreClick} /></div>
            </div>
            <RadiumTiles
              first={this.state.first}
              horizontalSpacing={horizontalSpacing}
              items={items}
              numColumns={numColumns}
              style={[ styles.list, listStyle ]}
              tileRenderer={tileRenderer} />
          </div>
        );
      }
    }
  );
}
