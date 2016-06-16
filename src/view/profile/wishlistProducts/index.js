import React, { PropTypes, Component } from 'react';

export default class WishlistProducts extends Component {
  static propTypes = {
    items: PropTypes.list
  };

  render () {
    return (
      <div>Wishlistproducts</div>
    );
  }
}
