import React, { Component, PropTypes } from 'react';
import localized from '../_common/localized';

require('./cookies.scss');

@localized
export default class Cookies extends Component {
  static propTypes = {
    getLocalizedResource: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container'>
        <section className='cookies'>
          <div className='wrapper wrapper--small' dangerouslySetInnerHTML={{ __html: this.props.getLocalizedResource('cookies') }} />
        </section>
      </div>
    );
  }
}
