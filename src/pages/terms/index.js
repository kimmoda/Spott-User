import React, { Component, PropTypes } from 'react';
import localized from '../_common/localized';

require('./terms.scss');

@localized
export default class Terms extends Component {
  static propTypes = {
    getLocalizedResource: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='container'>
        <section className='terms'>

          <div className='wrapper wrapper--small' dangerouslySetInnerHTML={{ __html: this.props.getLocalizedResource('terms') }} />

        </section>
      </div>
    );
  }
}
