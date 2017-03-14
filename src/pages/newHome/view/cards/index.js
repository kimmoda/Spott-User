/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Card from '../card';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Cards extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  render () {
    return (
      <div styleName='container'>
        <div styleName='cards'>
          <div styleName='cards-wrapper'>
            {new Array(16).fill(1).map((item, index) =>
              <Card key={`home_card_${index}`} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
