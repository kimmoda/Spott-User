/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Sidebar from '../sidebar/index';
import CustomScrollbars from '../customScrollbars';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Sidebars extends Component {
  static propTypes = {
    item: PropTypes.any,
    t: PropTypes.func.isRequired,
    onSidebarClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.onBackClick = ::this.onBackClick;
    this.onProductClick = ::this.onProductClick;
    this.state = {
      sidebarsList: this.props.item ? [ this.props.item ] : []
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState) => ({
      sidebarsList: nextProps.item ? [ nextProps.item ] : []
    }));
  }

  onBackClick (product) {
    const newSidebarsList = this.state.sidebarsList.filter((item) => item !== product);
    this.setState({
      sidebarsList: newSidebarsList
    });
    if (!newSidebarsList.length) {
      this.props.onSidebarClose();
    }
  }

  onProductClick (product) {
    this.setState((prevState) => ({
      sidebarsList: prevState.sidebarsList.concat(product)
    }));
  }

  render () {
    return (
    <div className={this.state.sidebarsList.length ? styles['sidebars-active'] : styles['sidebars-inactive']} styleName='sidebars'>
      <CustomScrollbars>
        <ReactCSSTransitionGroup
          transitionAppear
          transitionAppearTimeout={400}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={500}
          transitionName={{
            appear: styles['sidebar-appear'],
            appearActive: styles['sidebar-appear-active'],
            enter: styles['sidebar-enter'],
            enterActive: styles['sidebar-enter-active'],
            leave: this.state.sidebarsList.length ? styles['sidebar-leave'] : styles['sidebar-leave-all'],
            leaveActive: styles['sidebar-leave-active']
          }}>
          {this.state.sidebarsList.map((product, index) =>
            <Sidebar
              key={`sidebar_${index}`}
              product={product}
              onBackClick={this.onBackClick}
              onProductClick={this.onProductClick}/>
          )}
        </ReactCSSTransitionGroup>
      </CustomScrollbars>
    </div>
    );
  }
}
