/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush, goBack as routerGoBack } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import localized from '../_common/localized';
import Sidebar from '../sidebar/index';
import CustomScrollbars from '../customScrollbars';
import * as actions from '../actions';
import { sidebarProductsSelector } from '../selectors';
import { getPath, getPathnameBegin, isModal } from '../../utils';

const styles = require('./index.scss');

@localized
@connect(sidebarProductsSelector, (dispatch) => ({
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  routerGoBack: bindActionCreators(routerGoBack, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  removeSidebarProduct: bindActionCreators(actions.removeSidebarProduct, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Sidebars extends Component {
  static propTypes = {
    classes: PropTypes.any,
    currentLocale: PropTypes.string.isRequired,
    loadSidebarProduct: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    params: PropTypes.shape({
      spottId: PropTypes.string,
      spottTitle: PropTypes.string,
      productId: PropTypes.string,
      productTitle: PropTypes.string
    }),
    removeSidebarProduct: PropTypes.func.isRequired,
    routerGoBack: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    sidebarProducts: PropTypes.any.isRequired,
    singleMode: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onSidebarClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: ''
  };

  constructor (props) {
    super(props);
    this.onBackClick = ::this.onBackClick;
    this.onProductClick = ::this.onProductClick;
    this.isModal = isModal(this.props);
  }

  closeSidebar () {
    this.props.onSidebarClose();
  }

  onBackClick () {
    const { location, params, sidebarProducts, onSidebarClose } = this.props;
    if (params && params.spottId) {
      const previousProduct = sidebarProducts.getIn([ 'data', -2 ], null);
      if (previousProduct && previousProduct.get('uuid') !== params.productId) {
        this.props.routerPush({
          pathname: `${getPathnameBegin(this.props)}/${getPath(previousProduct.get('shareUrl'))}`,
          state: {
            modal: this.isModal,
            returnTo: (location.state && location.state.returnTo) || '/',
            dc: location.state && location.state.dc
          }
        });
      } else {
        this.props.routerPush({
          pathname: `${getPathnameBegin(this.props)}/spott/${params.spottTitle}/${params.spottId}`,
          state: {
            modal: this.isModal,
            returnTo: (location.state && location.state.returnTo) || '/'
          }
        });
      }
    } else {
      onSidebarClose && onSidebarClose();
    }
  }

  onProductClick (product, dc = null) {
    const { currentLocale, location, singleMode } = this.props;
    if (singleMode) {
      this.props.routerPush({
        pathname: `/${currentLocale}/${getPath(product.get('shareUrl'))}`,
        state: {
          modal: this.isModal,
          returnTo: (location.state && location.state.returnTo) || '/'
        }
      });
    } else {
      this.props.routerPush({
        pathname: `/${currentLocale}/${getPath(product.get('shareUrl'))}`,
        state: {
          modal: this.isModal,
          returnTo: (location.state && location.state.returnTo) || '/',
          dc: (location.state && location.state.dc) || dc
        }
      });
    }
  }

  render () {
    const { classes, sidebarProducts, singleMode, location, params, onSidebarClose } = this.props;

    return (
      <div className={`${!singleMode && (sidebarProducts.getIn([ 'data', '0' ]) ? styles['sidebars-active'] : styles['sidebars-inactive'])} ${classes}`} styleName='sidebars'>
        <div styleName='overlay' onClick={this.closeSidebar.bind(this)}/>
        <div styleName='sidebars-content'>
          <ReactCSSTransitionGroup
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName={{
              appear: styles['sidebar-appear'],
              appearActive: styles['sidebar-appear-active'],
              enter: sidebarProducts.get('data').size > 1 ? styles['sidebar-enter'] : styles['sidebar-enter-first'],
              enterActive: styles['sidebar-enter-active'],
              leave: sidebarProducts.get('data').size ? styles['sidebar-leave'] : styles['sidebar-leave-all'],
              leaveActive: styles['sidebar-leave-active']
            }}>
            {sidebarProducts.getIn([ 'data', '0' ]) && sidebarProducts.get('data').map((product, index) =>
              <CustomScrollbars key={`scroll_sidebar_${index}`} style={{ position: 'absolute', top: 0, left: 0, zIndex: 300, width: '370px', overflow: 'visible' }}>
                <Sidebar
                  key={`sidebar_${index}`}
                  location={location}
                  params={params}
                  product={product}
                  onBackClick={this.onBackClick}
                  onProductClick={this.onProductClick}
                  onSidebarClose={onSidebarClose}/>
              </CustomScrollbars>
            )}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
