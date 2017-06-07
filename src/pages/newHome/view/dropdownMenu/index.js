/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import localized from '../../../_common/localized';
import { IconArrow3 } from '../icons';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class OurDropdownMenu extends Component {

  static propTypes = {
    alignLeft: PropTypes.bool,
    alignTop: PropTypes.bool,
    children: PropTypes.node.isRequired,
    trigger: PropTypes.node.isRequired
  };

  constructor (props) {
    super(props);
    this.toggle = ::this.toggle;
    this.close = ::this.close;
    this.state = {
      isMenuOpen: false
    };
  }

  toggle () {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close () {
    this.setState({ isMenuOpen: false });
  }

  render () {
    const { children, trigger, alignLeft, alignTop } = this.props;
    const cx = alignLeft && styles['dropdown-container-left'] ||
      alignTop && styles['dropdown-container-top'] ||
      styles['dropdown-container'];

    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      className: cx,
      toggle: <div onClick={this.toggle}>{trigger}</div>,
      enterTimeout: 1,
      leaveTimeout: 1
    };

    return (
      <DropdownMenu {...menuOptions}>
        <div className={styles['dropdown-content']}>
          {children}
        </div>
      </DropdownMenu>
    );
  }
}

@localized
@CSSModules(styles, { allowMultiple: true })
export class DropdownNested extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    triggerText: PropTypes.string.isRequired
  };

  render () {
    const { children, triggerText } = this.props;

    const nestedProps = {
      toggle: <div>{triggerText}<i><IconArrow3/></i></div>
    };

    return (
      <NestedDropdownMenu {...nestedProps}>
        <div className={styles['dropdown-nested']}>
          {children}
        </div>
      </NestedDropdownMenu>
    );
  }
}

@CSSModules(styles, { allowMultiple: true })
export class DropdownDivider extends Component {
  render () {
    return (
      <span styleName='dropdown-divider'/>
    );
  }
}
