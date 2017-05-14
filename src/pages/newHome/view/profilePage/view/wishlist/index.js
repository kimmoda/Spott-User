/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userProfileDetailsSelector } from '../../../../selectors';
import NewUserWishlistProduct from './product';

const styles = require('./index.scss');

@localized
@connect(userProfileDetailsSelector, (dispatch) => ({
  loadUserWishlist: bindActionCreators(actions.loadUserWishlist, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserWishlist extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadUserWishlist: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    userProfile: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadUserWishlist({ uuid: this.props.params.userId });
  }

  render () {
    const { userProfile, location } = this.props;

    return (
      <div styleName='wishlists'>
        {userProfile.getIn([ 'wishlist', 'data' ]) && userProfile.getIn([ 'wishlist', 'data' ]).map((item, index) =>
          <NewUserWishlistProduct item={item} key={`wishlist_product_${index}_${item.get('uuid')}`} location={location}/>
        )}
      </div>
    );
  }
}
