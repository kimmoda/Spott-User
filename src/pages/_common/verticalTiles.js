/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/**
 * Creates and returns a new debounced version of the passed function which
 * will postpone its execution until after wait milliseconds have elapsed since
 * the last time it was invoked. Useful for implementing 'search'. After we
 * stopped entering the search string, we want to perform a single search.
 * NOTE: based on underscore's debounce()
 * @param {function} func The function to be applied after a certain time.
 * @param {wait} number The number of milliseconds to wait until execution.
 */
/* eslint-disable */
export function slowdown (func, wait, immediate) {
  let timeout;
	return function() {
		const context = this;
    const args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
        func.apply(context, args);
      }
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
      func.apply(context, args);
    }
	};
}
/* eslint-enable */

/**
 * Main component, containing and efficiently rendering our tiles.
 */
export default class VerticalTiles extends Component {
  static propTypes = {
    aspectRatio: PropTypes.number.isRequired,
    horizontalSpacing: PropTypes.number.isRequired,
    items: ImmutablePropTypes.listOf(
      PropTypes.any
    ).isRequired,
    numColumns: PropTypes.objectOf(PropTypes.number).isRequired, // Maps screen widths on numColumns
    returnTo: PropTypes.string,
    // The component for rendering the tile. Is cloned with an additional
    // 'value' prop.
    tile: PropTypes.node.isRequired,
    verticalSpacing: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
    this.onPatch = slowdown(::this.onPatch, 15);
    this._patch = ::this._patch;
    this.state = { // We'll initialize the fields after mount
      from: -1,
      to: -1,
      width: -1
    };
  }

  componentDidMount () {
    // Create global 'on resize' hook
    window.addEventListener('resize', this.onPatch);
    window.addEventListener('scroll', this.onPatch);
    this.onPatch();
  }

  componentWillUnmount () {
    // Create global 'on resize' hook
    window.removeEventListener('resize', this.onPatch);
    window.removeEventListener('scroll', this.onPatch);
  }

  _patch () {
    // Read width from DOM
    const screenWidth = window.innerWidth;
    const width = this.container.clientWidth;
    // Get global scroll top and bottom
    const scrollTop = document.body.scrollTop;
    const scrollBottom = scrollTop + window.innerHeight;
    // Get position of the tile grid
    const myTop = this.container.offsetTop;
    const myBottom = myTop + this.container.offsetHeight;
    // Determine visible area
    if (scrollBottom < myTop || scrollTop > myBottom) {
      // No visible part
      this.setState({ from: -1, to: -1, screenWidth, width });
    } else {
      const visibleTop = (scrollTop < myTop ? myTop : scrollTop);
      const visibleBottom = (scrollBottom > myBottom ? myBottom : scrollBottom);
      this.setState({ from: visibleTop - myTop, screenWidth, to: visibleBottom - myTop, width });
    }
  }

  onPatch () {
    // We have to read the width from the DOM. We try to do this in a performant
    // way using window.requestAnimationFrame.
    if (window.requestAnimationFrame) {
      return window.requestAnimationFrame(this._patch);
    }
    // The performant method failed, fall back to setTimeout(). :(
    setTimeout(this._patch, 66);
  }

  render () {
    const { aspectRatio, horizontalSpacing, items, numColumns, verticalSpacing, tile } = this.props;
    const { from, screenWidth, to, width } = this.state;
    // If we have no known container width (first render), there is no reason to proced
    if (width === -1 || items.size === 0) {
      return <div ref={(x) => { this.container = x; }} style={{ minHeight: 1 }} />;
    }
    // Determine number of columbs
    const resolvedNumColumns = Object.keys(numColumns).reduce(({ bestFit, bestNumColumns }, aFit) => {
      // The current one is not a better fit
      if (screenWidth >= aFit && aFit > bestFit) {
        const aNumColumns = numColumns[aFit];
        return { bestFit: aFit, bestNumColumns: aNumColumns };
      }
      return { bestFit, bestNumColumns };
    }, { bestFit: -1, bestNumColumns: 1 }).bestNumColumns;
    // Size of a cell
    const cellWidth = Math.ceil((width - horizontalSpacing * (resolvedNumColumns - 1)) / resolvedNumColumns);
    // Calculate some necessities
    const numItems = items.size;
    const numRows = Math.ceil(numItems / resolvedNumColumns);
    const rowHeight = cellWidth * aspectRatio + verticalSpacing;
    // Render items
    const renderedItems = [];
    for (let row = 0; row < numRows; row++) {
      const positionY = rowHeight * row;
      // Continue if not visible yet
      if (positionY + rowHeight < from - 7 * rowHeight) {  // Render 7 rows extra
        continue;
      }
      // Abort if not visible anymore
      if (positionY > to + 7 * rowHeight) { // Render 7 rows extra
        break;
      }
      // Iterate over columns
      for (let column = 0; column < resolvedNumColumns; column++) {
        const index = row * resolvedNumColumns + column;
        // No more items on this row? (last row is not full)
        if (index >= numItems) {
          break;
        }
        // Determine position
        const positionX = (column * cellWidth) + (column * horizontalSpacing);
        // Build style
        const style = {
          width: `${cellWidth}px`,
          height: `${rowHeight - verticalSpacing}px`,
          transform: `translate(${positionX}px, ${positionY}px)`,
          position: 'absolute'
        };
        renderedItems.push(React.cloneElement(tile, { ...tile.props, style, key: index, item: items.get(index) }));
      }
    }
    // Determine container style
    const containerStyle = {
      height: (numRows * rowHeight) - verticalSpacing, // No vertical spacing below the last row
      minHeight: 1
    };
    // Return render result
    return (
      <div ref={(x) => { this.container = x; }} style={containerStyle}>
        {renderedItems}
      </div>
    );
  }
}
