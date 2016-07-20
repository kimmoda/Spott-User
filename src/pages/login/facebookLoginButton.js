/* global FB */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fontWeights, makeTextStyle } from '../_common/buildingBlocks';
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
      ...makeTextStyle(fontWeights.regular, '0.875em', '0.025em', '1em'),
      backgroundImage: 'linear-gradient(to bottom, #526ea8, #3b5998)',
      border: 'none',
      borderRadius: '0.125em',
      color: 'white',
      padding: '0.625em 0',
      height: '2.5em',
      width: '100%',
      marginTop: '1.75em'
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
