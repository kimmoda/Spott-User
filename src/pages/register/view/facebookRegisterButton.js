/* eslint-disable react/no-set-state */
/* global FB */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import { registerWithFacebook } from '../actions';
import { facebookAppIdSelector } from '../../app/selector';
import localized from '../../_common/localized';

@localized
@connect((state) => ({
  facebookAppId: facebookAppIdSelector(state)
}))
class FacebookLoginButton extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    facebookAppId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onProcessStart: PropTypes.func,
    onRegisterWithFacebook: PropTypes.func.isRequired
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
    FB.api('/me', { fields: 'email,first_name,last_name,locale,birthday,gender' }, async (response) => {
      const { email, first_name: firstname, last_name: lastname, id: facebookId, birthday, gender } = response;
      let res;
      if (email && birthday && birthday.length === 10) {
        const formattedBirthday = moment(birthday, 'MM/DD/YYYY').toISOString();
        res = await this.props.onRegisterWithFacebook({ email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth: formattedBirthday, gender });
      } else {
        res = await this.props.onRegisterWithFacebook({ email, firstname, lastname, facebookAccessToken, facebookId, gender });
      }
      if (res.error) {
        const { error } = res;
        this.setState({ ...this.state, error }); // eslint-disable-line
      } else {
        this.props.onClose();
      }
    });
  }

  // handle fb button click
  handleClick (e) {
    if (this.props.onProcessStart) {
      this.props.onProcessStart();
    }
    FB.login((response) => {
      if (response.authResponse) {
        // user authorized
        // get user data
        this.fetchUser(response.authResponse.accessToken);
      }
    }, { scope: 'email,user_birthday', return_scopes: true, auth_type: 'rerequest' }); // eslint-disable-line
    e.preventDefault();
  }

  static styles = {
    facebookButton: {
      position: 'relative',
      ...makeTextStyle(fontWeights.regular, '0.875em', '0.025em', '1em'),
      backgroundImage: 'linear-gradient(to bottom, #526ea8, #3b5998)',
      border: 'none',
      borderRadius: '0.125em',
      color: 'white',
      padding: '0.625em 0',
      height: '2.5em',
      width: '100%',
      marginTop: '1.75em'
    },
    facebookIcon: {
      position: 'absolute',
      left: '0.786em',
      height: '1em'
    }
  }

  render () {
    const { styles } = this.constructor;
    const { disabled, t } = this.props;
    return (
      <button disabled={disabled} style={styles.facebookButton} type='button' onClick={::this.handleClick}>
        <svg height='22' style={styles.facebookIcon} viewBox='0 0 22 22' width='22' xmlns='http://www.w3.org/2000/svg' >
          <path d='M20.51 0H1.404C.63 0 0 .63 0 1.405V20.51c0 .775.63 1.404 1.405 1.404h10.267v-8.476h-2.86v-3.324h2.834s.05-1.16.05-2.962c0-1.804 1.34-3.04 1.96-3.35.618-.308 1.57-.54 2.55-.49.98.053 2.24.182 2.24.182L18.5 6.38s-1.573.025-2.165.05c-.593.026-1.237.335-1.237 1.417v2.242h3.324l-.464 3.322h-2.834v8.502h5.385c.775 0 1.404-.63 1.404-1.405V1.404C21.914.63 21.284 0 20.51 0' fill='#FFF' fillRule='evenodd' />
        </svg>
        {t('register.registerWithFacebookButton')}
      </button>
    );
  }

}

export default connect(null, (dispatch) => ({
  onRegisterWithFacebook: bindActionCreators(registerWithFacebook, dispatch)
}))(FacebookLoginButton);
