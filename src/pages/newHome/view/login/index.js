/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import ReactModal from 'react-modal';
import localized from '../../../_common/localized';
import * as actions from '../../../app/actions';
import { authenticationErrorSelector, authenticationIsLoadingSelector } from '../../../app/selector';

const styles = require('./index.scss');

@localized
@connect((state, ownProps) => ({
  error: authenticationErrorSelector(state),
  isLoading: authenticationIsLoadingSelector(state)
}),
(dispatch) => ({
  submit: bindActionCreators(actions.doLogin, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewLogin extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    routerPush: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClose = ::this.onClose;
  }

  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || `/${this.props.currentLocale}/new/home`);
  }

  render () {
    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onClose}>
        <section styleName='wrapper'>
          TEST
        </section>
      </ReactModal>
    );
  }
}
