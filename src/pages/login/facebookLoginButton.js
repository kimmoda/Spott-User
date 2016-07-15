/* global FB */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../app/actions';
import { facebookAppIdSelector } from '../app/selector';
import localized from '../_common/localized';

@localized
@connect((state) => ({
  facebookAppId: facebookAppIdSelector(state)
}))
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
        version: 'v2.6'
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

  static styles = {
    facebookButton: {
      backgroundColor: '#3b5998',
      border: 'none',
      borderRadius: 2,
      color: 'white',
      fontFamily: 'ProximaNova-Light',
      fontSize: '14px',
      padding: '10px 0',
      width: '100%',
      margin: '5px 0'
    }
  }

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <button style={styles.facebookButton} type='button' onClick={::this.handleClick}>{t('login.logInWithFacebookButton')}</button>
    );
  }

}

export default connect(null, (dispatch) => ({
  loginFacebook: bindActionCreators(actions.doLoginFacebook, dispatch)
}))(FacebookLoginButton);
