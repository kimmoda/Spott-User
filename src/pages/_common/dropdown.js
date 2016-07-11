import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

require('react-simple-dropdown/styles/Dropdown.css');

export default class OurDropdown extends Component {

  static propTypes = {
    button: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
  }

  render () {
    const { button, children } = this.props;
    return (
      <Dropdown>
        <DropdownTrigger style={{ display: 'inline-block', textDecoration: 'none' }}>{button}</DropdownTrigger>
        <DropdownContent>
          {children}
        </DropdownContent>
      </Dropdown>
    );
  }

}
