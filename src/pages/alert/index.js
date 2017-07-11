/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const styles = require('./index.scss');

@CSSModules(styles, { allowMultiple: true })
export default class Notifier extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  success (type, message) {
    console.log(type);
    Alert.success(<div><p style={{ color: '#27AE60' }}>{type}</p><p>{message}</p></div>, {
      position: 'top',
      effect: 'scale',
      timeout: 3000,
      offset: 10
    });
  }

  error (type, message) {
    Alert.success(<div><p style={{ color: '#e74c3c' }}>{type}</p><p>{message}</p></div>, {
      position: 'top',
      effect: 'scale',
      timeout: 3000,
      offset: 10
    });
  }

  render () {
    return (
      <div styleName='alert-container'>
        <Alert stack={{ limit: 1 }} />
      </div>
    );
  }
}
