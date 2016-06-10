import React, { Component, PropTypes } from 'react';
import { colors, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import Tiles from '../../_common/tiles';

const itemStyles = {
  container: {
    border: `1px solid ${colors.whiteThree}`,
    backgroundColor: colors.white,
    padding: '1.25em'
  },
  name: {
    ...makeTextStyle(fontWeights.medium, '1.0625em'),
    color: colors.slateGray
  },
  image: {
    marginTop: '1.25em',
    width: '100%',
    paddingBottom: '100%'
  }
};
class Tile extends Component {
  static propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.object
  }

  render () {
    const { name, image, style } = this.props;
    return (
      <div style={style}>
        <div style={itemStyles.container}>
          <p style={itemStyles.name}>{name}</p>
          <div style={{ ...itemStyles.image, backgroundImage: image }}></div>
        </div>
      </div>
    );
  }
}

const fakeItems = Reflect.apply(Array, Array, Array(50)).map((x, index) => ({ name: `Item ${index.toString()}`, image: 'linear-gradient(to right, #d9345d, rgb(31, 188, 233))' }));

export default class Wishlist extends Component {

  render () {
    return (
      <Tiles horizontalSpacing={10} items={fakeItems} numColumns={4} tile={<Tile />} verticalSpacing={60} />
    );
  }
}
