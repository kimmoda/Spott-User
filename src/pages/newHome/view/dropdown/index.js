/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import localized from '../../../_common/localized';
import { IconArrow3 } from '../icons';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class OurDropdown extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    triggerText: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.onClick = ::this.onClick;
    this.state = {
      loaded: false
    };
  }

  onClick () {
    this.dropdown.hide();
  }

  render () {
    const { triggerText, children } = this.props;

    return (
      <Dropdown className={styles['dropdown-container']} ref={(dd) => { this.dropdown = dd; }}>
        <DropdownTrigger className={styles['dropdown-trigger']}>
          <div>{triggerText}</div>
          <i><IconArrow3/></i>
        </DropdownTrigger>
        <DropdownContent className={styles['dropdown-content']} onClick={this.onClick}>
          {children}
        </DropdownContent>
      </Dropdown>
    );
  }
}
