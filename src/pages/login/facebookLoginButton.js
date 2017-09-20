/* global FB */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../app/actions';
import { facebookAppIdSelector } from '../app/selector';
import localized from '../_common/localized';

const styles = require('./index.scss');

@localized
@connect((state) => ({
  facebookAppId: facebookAppIdSelector(state)
}))
@CSSModules(styles, { allowMultiple: true })
class FacebookLoginButton extends Component {

  static propTypes = {
    facebookAppId: PropTypes.string.isRequired,
    loginFacebook: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { facebookAppId } = this.props;
    window.fbAsyncInit = () => {
      FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v2.10'
      });
    };

    /* eslint-disable */
    //sdk
    (function(d, s, id) {
      var element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* eslint-enable */
  }

  fetchUser (facebookAccessToken) {
    FB.api('/me', async (response) => {
      await this.props.loginFacebook({ facebookAccessToken });
      this.props.onClose();
    });
  }

  // handle fb button click
  handleClick (e) {
    FB.login((response) => {
      if (response.authResponse) {
        // user authorized
        // get user data
        this.fetchUser(response.authResponse.accessToken);
      }
    });
    e.preventDefault();
  }

  render () {
    const { t } = this.props;
    return (
      <button className='form-facebook-btn' type='button' onClick={::this.handleClick}>
        <svg height='22' viewBox='0 0 22 22' width='22' xmlns='http://www.w3.org/2000/svg' >
          <path d='M20.51 0H1.404C.63 0 0 .63 0 1.405V20.51c0 .775.63 1.404 1.405 1.404h10.267v-8.476h-2.86v-3.324h2.834s.05-1.16.05-2.962c0-1.804 1.34-3.04 1.96-3.35.618-.308 1.57-.54 2.55-.49.98.053 2.24.182 2.24.182L18.5 6.38s-1.573.025-2.165.05c-.593.026-1.237.335-1.237 1.417v2.242h3.324l-.464 3.322h-2.834v8.502h5.385c.775 0 1.404-.63 1.404-1.405V1.404C21.914.63 21.284 0 20.51 0' fill='#FFF' fillRule='evenodd' />
        </svg>
        <span>
          {t('login.logInWithFacebook')}
        </span>
      </button>
    );
  }

}

export default connect(null, (dispatch) => ({
  loginFacebook: bindActionCreators(actions.doLoginFacebook, dispatch)
}))(FacebookLoginButton);
