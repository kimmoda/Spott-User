/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Topics from '../topics';
import Cards from '../cards';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class NewHome extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <section styleName='wrapper'>
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Trending Topics</div>
            <Topics />
          </div>
        </div>
        <Cards/>
      </section>
    );
  }
}
