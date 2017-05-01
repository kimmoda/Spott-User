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
    this.props.loadUserLovedPosts({ uuid: this.props.params.userId });
  }

  render () {
    const { userProfile } = this.props;

    return (
      <div styleName='loves'>
        {userProfile.getIn([ 'lovedPosts', 'data' ]) && <Cards items={userProfile.get('lovedPosts')}/>}
      </div>
    );
  }
}
