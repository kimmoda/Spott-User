import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import Tiles from '../../_common/tiles';

const itemStyles = {
  container: {
    border: '1px solid black'
  },
  name: {

  },
  image: {

  }
};
@Radium
class Tile extends Component {
  static propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    style: {}
  }

  render () {
    const { name, style } = this.props;
    return (
      <div style={[ style, itemStyles.container ]}>
        {name}
        {/* <p style={itemStyles.name}>{name}></p>
        <img src={itemStyles.image}>{image}</img>*/}
      </div>
    );
  }
}

const fakeItems = Reflect.apply(Array, Array, Array(50)).map((x, index) => ({ key: index.toString(), value: { name: index.toString() } }));

export default class Wishlist extends Component {

  render () {
    return <Tiles numColumns={5} items={fakeItems} tile={<Tile />} horizontalSpacing={10} verticalSpacing={10} />
  }
}
