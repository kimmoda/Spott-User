/* eslint-disable no-return-assign */
import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

require('react-simple-dropdown/styles/Dropdown.css');

export const ourDropdownStyles = {
  container: {
    position: 'relative',
    userSelect: 'none',
    zIndex: 10,
    display: 'inline-flex'
  },
  trigger: {
    display: 'inline-block',
    textDecoration: 'none'
  },
  content: {
    right: 0
  }
};

export default class OurDropdown extends Component {

  static propTypes = {
    button: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    contentStyle: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  onClick () {
    this.dropdown.hide();
  }

  render () {
    const { button, children, contentStyle } = this.props;
    return (
      <Dropdown ref={(dd) => this.dropdown = dd} style={ourDropdownStyles.container} >
        <DropdownTrigger style={ourDropdownStyles.trigger}>{button}</DropdownTrigger>
        <DropdownContent style={{ ...ourDropdownStyles.content, ...(contentStyle || {}) }} onClick={this.onClick}>
          {children}
        </DropdownContent>
      </Dropdown>
    );
  }

}
