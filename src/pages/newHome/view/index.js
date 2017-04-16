/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../_common/localized';
import Footer from './footer';
import Header from './header';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class New extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { children, location } = this.props;

    return (
      <div styleName='wrapper'>
        <Header location={location}/>
        <section styleName='content'>
          {children}
        </section>
        <Footer/>
      </div>
    );
  }
}
