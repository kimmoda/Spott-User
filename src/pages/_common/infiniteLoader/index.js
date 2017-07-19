/**
 * @author Tomasz Czura (7/19/17)
 */
import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import CSSModules from 'react-css-modules';

const styles = require('./index.scss');

@CSSModules(styles, { allowMultiple: true })
export default class InifiteLoader extends Component {

  render () {
    return (
      <VisibilitySensor {...this.props}>
        <div styleName='loadIndicator'/>
      </VisibilitySensor>
    );
  }
}
