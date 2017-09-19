/* eslint-disable react/no-set-state */
/* eslint-disable react/jsx-indent-props */
import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import { IconClose } from '../icons';
import SpottDetails from '../spott/index';
import Sidebars from '../sidebars/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import localized from '../_common/localized';
import * as actions from '../actions';
import { spottDetailsSelector } from '../selectors';
import { getDetailsDcFromLinks, getPath, getPathnameBegin, isModal } from '../../utils';
import withLoginDialog from '../_common/withLoginDialog';
import CSSModules from 'react-css-modules';

const styles = require('./index.scss');

@localized
@withLoginDialog
@connect(spottDetailsSelector, (dispatch) => ({
  clearSidebarProducts: bindActionCreators(actions.clearSidebarProducts, dispatch),
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  loadSpottAndSidebarProduct: bindActionCreators(actions.loadSpottAndSidebarProduct, dispatch),
  loadSpottDetails: bindActionCreators(actions.loadSpottDetails, dispatch),
  removeSidebarProduct: bindActionCreators(actions.removeSidebarProduct, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  trackSpottView: bindActionCreators(actions.trackSpottView, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SpottDetailsContainer extends Component {
  static propTypes = {
    clearSidebarProducts: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    isLoginShown: PropTypes.bool,
    loadSidebarProduct: PropTypes.func.isRequired,
    loadSpottAndSidebarProduct: PropTypes.func.isRequired,
    loadSpottDetails: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string,
        productRelevance: PropTypes.any,
        dc: PropTypes.any,
        spottDc: PropTypes.any
      })
    }).isRequired,
    params: PropTypes.shape({
      spottId: PropTypes.string,
      spottTitle: PropTypes.string,
      productId: PropTypes.string,
      productTitle: PropTypes.string
    }).isRequired,
    removeSidebarProduct: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    showLoginDialog: PropTypes.func,
    sidebarProducts: PropTypes.any.isRequired,
    spott: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    trackSpottView: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseHandler = ::this.onCloseHandler;
    this.onSidebarClose = ::this.onSidebarClose;
    this.onProductClick = ::this.onProductClick;
    this.getModalContent = ::this.getModalContent;
    this.getEmbeddedContent = ::this.getEmbeddedContent;

    this.isModal = isModal(this.props);
  }

  componentDidMount () {
    const { params, loadSpottDetails, loadSpottAndSidebarProduct, location, trackSpottView } = this.props;
    const spottDc = location.state && location.state.spottDc || '';
    if (params.productId) {
      loadSpottAndSidebarProduct({ spottId: params.spottId, productId: params.productId, spottDc, isModal: this.isModal });
    } else {
      loadSpottDetails({ uuid: params.spottId, dc: spottDc, isModal: this.isModal });
    }
    trackSpottView({ uuid: params.spottId, dc: spottDc });

    this._originalOverflowX = document.body.style.overflowX;
    this._originalOverflowY = document.body.style.overflowY;

    if (this.isModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    }
  }

  componentWillReceiveProps (nextProps) {
    const { params, loadSidebarProduct, loadSpottDetails, clearSidebarProducts, sidebarProducts, removeSidebarProduct, loadSpottAndSidebarProduct, trackSpottView } = this.props;
    const spottDc = nextProps.location.state && nextProps.location.state.spottDc || '';
    if (params.spottId !== nextProps.params.spottId) {
      clearSidebarProducts(params.spottId);
      if (nextProps.params.productId) {
        loadSpottAndSidebarProduct({
          spottId: nextProps.params.spottId,
          productId: nextProps.params.productId,
          spottDc,
          isModal: this.isModal
        });
      } else {
        loadSpottDetails({
          uuid: nextProps.params.spottId,
          dc: spottDc,
          isModal: this.isModal
        });
      }
      trackSpottView({ uuid: nextProps.params.spottId, dc: spottDc });
    } else if (params.productId !== nextProps.params.productId) {
      if (!nextProps.params.productId) {
        clearSidebarProducts(params.spottId);
      } else if (sidebarProducts.getIn([ 'data', -2, 'uuid' ], null) === nextProps.params.productId && params.productId) {
        removeSidebarProduct({ uuid: params.productId, spottUuid: params.spottId });
      } else {
        loadSidebarProduct({
          uuid: nextProps.params.productId,
          spottUuid: nextProps.params.spottId,
          relevance: nextProps.location.state && nextProps.location.state.productRelevance,
          dc: nextProps.location.state && nextProps.location.state.dc
        });
      }
    }
  }

  componentWillUnmount () {
    document.body.style.overflowX = this._originalOverflowX;
    document.body.style.overflowY = this._originalOverflowY;
    this.props.clearSidebarProducts(this.props.params.spottId);
  }

  getModalContent () {
    const { sidebarProducts, location, params } = this.props;
    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onCloseHandler}>
        <div className={sidebarProducts.get('data').size ? styles['main-sidebar-active'] : styles['main-sidebar-inactive']}
             styleName='main'>
          <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
          <div className={sidebarProducts.get('data').size ? styles['main-sidebar-wrapper-active'] : styles['main-sidebar-wrapper-inactive']}
               styleName='main-sidebar-wrapper'>
            <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
            {!this.props.isLoginShown &&
              <div styleName='modal-close' onClick={this.onCloseHandler}>
                <i><IconClose/></i>
              </div>
            }
            <SpottDetails location={location} params={params} onProductClick={this.onProductClick}/>
          </div>
        </div>

        <Sidebars location={location} params={params} onSidebarClose={this.onSidebarClose}/>
      </ReactModal>
    );
  }

  getEmbeddedContent () {
    const { sidebarProducts, location, params } = this.props;

    return (
      <div styleName='embedded-content'>
        <div className={sidebarProducts.get('data').size ? styles['main-sidebar-active'] : styles['main-sidebar-inactive']}
             styleName='embedded-container'>
          <div className={sidebarProducts.get('data').size ? styles['main-sidebar-wrapper-active'] : styles['main-sidebar-wrapper-inactive']}
               styleName='embedded-details'>
            <SpottDetails location={location} params={params} onProductClick={this.onProductClick}/>
          </div>
          <Sidebars classes={styles['embedded-sidebar']} location={location} params={params} onSidebarClose={this.onSidebarClose}/>
        </div>
      </div>
    );
  }

  onCloseHandler () {
    const { location, routerPush: routePush, sidebarProducts, spott } = this.props;
    if (sidebarProducts && sidebarProducts.get('data').size) {
      this.props.routerPush({
        pathname: `${getPathnameBegin(this.props)}/${getPath(spott.get('shareUrl'))}`,
        state: {
          modal: this.isModal,
          returnTo: (location.state && location.state.returnTo) || '/',
          spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
        }
      });
    } else {
      routePush((location.state && location.state.returnTo) || '/');
    }
  }

  onProductClick (marker) {
    const { location, spott } = this.props;
    this.props.routerPush({
      pathname: `${getPathnameBegin(this.props)}/${getPath(marker.getIn([ 'product', 'shareUrl' ]))}`,
      state: {
        modal: this.isModal,
        returnTo: location.state && location.state.returnTo || '/',
        productRelevance: marker.get('relevance'),
        dc: getDetailsDcFromLinks(marker.getIn([ 'product', 'links' ]).toJS()),
        spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
      }
    });
  }

  onSidebarClose () {
    const { location, spott, params } = this.props;
    this.props.routerPush({
      pathname: `${getPathnameBegin(this.props)}/${getPath(spott.get('shareUrl'))}`,
      state: {
        modal: this.isModal,
        returnTo: ((location.state && params.productId ? location.state.returnTo : location.pathname) || '/'),
        spottDc: getDetailsDcFromLinks(spott.get('links').toJS())
      }
    });
  }

  render () {
    return this.isModal ? this.getModalContent() : this.getEmbeddedContent();
  }
}
