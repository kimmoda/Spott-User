/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import localized from '../../../_common/localized';
import Card from '../card';

@localized
export default class Cards extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    items: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired
  };

  render () {
    const { items } = this.props;

    return (
      <div>
        {items.get('data') && items.get('data').map((item, index) =>
          <Card item={item} key={`home_card_${index}`} spottId={item.get('uuid')} />
        )}
      </div>
    );
  }
}
