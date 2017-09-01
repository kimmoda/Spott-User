/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import NewLogin from '../login/index';

export default function withLoginDialog (WrappedComponent) {
  return (
    class Loggable extends Component {

      constructor (props) {
        super(props);
        this.onLoginCloseClick = ::this.onLoginCloseClick;
        this.showLoginDialog = ::this.showLoginDialog;
      }

      state = {
        showLogin: false
      };

      componentDidMount () {
        this._isMounted = true;
      }

      componentWillUnmount () {
        this._isMounted = false;
      }

      onLoginCloseClick () {
        if (this._isMounted) {
          this.setState({ showLogin: false });
        }
      }

      showLoginDialog (onLoginSuccess) {
        this.setState({ showLogin: true, onLoginSuccess });
      }

      static propTypes = {
        location: PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          state: PropTypes.shape({
            modal: PropTypes.bool,
            returnTo: PropTypes.string,
            productRelevance: PropTypes.any,
            dc: PropTypes.any,
            spottDc: PropTypes.any
          })
        }).isRequired
      };

      render () {
        return (
          <div style={{ width: '100%' }}>
            <WrappedComponent {...this.props} isLoginShown={this.state.showLogin} showLoginDialog={this.showLoginDialog}/>
            {this.state.showLogin &&
              <NewLogin location={this.props.location} onCloseClick={this.onLoginCloseClick} onLoginSuccess={this.state.onLoginSuccess}/>
            }
          </div>
        );
      }
    }
  );
}
