/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userProfileDetailsSelector } from '../../../../selectors';
import Cards from '../../../cards/index';

const styles = require('./index.scss');

@localized
@connect(userProfileDetailsSelector, (dispatch) => ({
  loadUserLovedPosts: bindActionCreators(actions.loadUserLovedPosts, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserLoves extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadUserLovedPosts: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    userProfile: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.loadMore = ::this.loadMore;
  }

  componentDidMount () {
    this.props.loadUserLovedPosts({ uuid: this.props.params.userId, page: this.props.userProfile.getIn([ 'lovedPosts', 'page' ]) || 0 });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.userId && nextProps.params.userId !== this.props.params.userId) {
      this.props.loadUserLovedPosts({ uuid: nextProps.params.userId, page: nextProps.userProfile.getIn([ 'lovedPosts', 'page' ]) || 0 });
    }
  }

  loadMore (page) {
    this.props.loadUserLovedPosts({ uuid: this.props.params.userId, page });
  }

  render () {
    const { userProfile, location } = this.props;

    return (
      <div styleName='loves-wrapper'>
        <div styleName='loves'>
          {userProfile.getIn([ 'lovedPosts', 'data' ]) && <Cards loadMore={this.loadMore} location={location} spotts={userProfile.get('lovedPosts')}/>}
        </div>
      </div>
    );
  }
}
