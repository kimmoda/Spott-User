/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Sidebar from '../sidebar/index';
import CustomScrollbars from '../customScrollbars';
import * as actions from '../../actions';
import { sidebarProductsSelector } from '../../selectors';
import { slugify } from '../../../../utils';

const styles = require('./index.scss');

@localized
@connect(sidebarProductsSelector, (dispatch) => ({
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  removeSidebarProduct: bindActionCreators(actions.removeSidebarProduct, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Sidebars extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadSidebarProduct: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string,
        sidebarMarker: PropTypes.any
      })
    }).isRequired,
    params: PropTypes.shape({
      spottId: PropTypes.string,
      spottTitle: PropTypes.string,
      productTitle: PropTypes.string,
      complexId: PropTypes.string
    }),
    removeSidebarProduct: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    sidebarProducts: PropTypes.any.isRequired,
    singleMode: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onSidebarClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onBackClick = ::this.onBackClick;
    this.onProductClick = ::this.onProductClick;
  }

  closeSidebar () {
    this.props.onSidebarClose();
  }

  async onBackClick (productId) {
    const { location } = this.props;
    await this.props.removeSidebarProduct({ uuid: productId });
    this.props.routerPush({
      pathname: (location.state && (location.state.returnToProduct || location.state.returnTo)) || '/',
      state: {
        modal: true,
        returnTo: (location.state && location.state.returnTo) || '/',
        returnToProduct: (location.state && location.state.returnToProduct) || '/'
      }
    });
  }

  onProductClick (productId, productName) {
    const { currentLocale, location, params } = this.props;
    this.props.loadSidebarProduct({ uuid: productId });
    const spottId = this.props.params.complexId.split('}{')[0].replace('{', '');
    this.props.routerPush({
      pathname: `/${currentLocale}/spott/${params.spottTitle}/${slugify(productName)}/{${spottId}}{${productId}}`,
      state: {
        modal: true,
        returnTo: (location.state && location.state.returnTo) || '/',
        returnToProduct: location.pathname
      }
    });
  }

  render () {
    const { sidebarProducts, singleMode, location, params } = this.props;

    return (
    <div className={!singleMode && (sidebarProducts.get('data').size ? styles['sidebars-active'] : styles['sidebars-inactive'])} styleName='sidebars'>
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
            {sidebarProducts.get('data') && sidebarProducts.get('data').map((product, index) =>
              <CustomScrollbars key={`scroll_sidebar_${index}`}>
                <Sidebar
                  key={`sidebar_${index}`}
                  location={location}
                  params={params}
                  product={product}
                  onBackClick={this.onBackClick}
                  onProductClick={this.onProductClick}/>
              </CustomScrollbars>
            )}
          </ReactCSSTransitionGroup>
        </div>
    </div>
    );
  }
}
