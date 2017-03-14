import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Topic from '../topic';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Topics extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  render () {
    return (
      <div styleName='topics-list'>
        {new Array(7).fill(1).map((item, index) =>
          <Topic key={`topic_${index}`}/>
        )}
      </div>
    );
  }
}
