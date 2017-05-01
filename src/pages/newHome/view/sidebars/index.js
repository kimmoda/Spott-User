/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Sidebar from '../sidebar/index';
import CustomScrollbars from '../customScrollbars';
import * as actions from '../../actions';
import { sidebarProductsSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(sidebarProductsSelector, (dispatch) => ({
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  removeSidebarProduct: bindActionCreators(actions.removeSidebarProduct, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Sidebars extends Component {
  static propTypes = {
    loadSidebarProduct: PropTypes.func.isRequired,
    removeSidebarProduct: PropTypes.func.isRequired,
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

  async onBackClick (productId) {
    await this.props.removeSidebarProduct({ uuid: productId });
    if (!this.props.sidebarProducts.get('data').size) {
      this.props.onSidebarClose();
    }
  }

  onProductClick (productId) {
    this.props.loadSidebarProduct({ uuid: productId });
  }

  render () {
    const { sidebarProducts, singleMode } = this.props;

    return (
    <div className={!singleMode && (sidebarProducts.get('data').size ? styles['sidebars-active'] : styles['sidebars-inactive'])} styleName='sidebars'>
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
                product={product}
                onBackClick={this.onBackClick}
                onProductClick={this.onProductClick}/>
            </CustomScrollbars>
          )}
        </ReactCSSTransitionGroup>
    </div>
    );
  }
}
