import React, { Component, PropTypes } from 'react';
import localized from '../_common/localized';

require('./privacy.scss');

@localized
export default class Privacy extends Component {

  static propTypes = {
    getLocalizedResource: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div className='container'>
        <section className='privacy'>

          <div className='wrapper wrapper--small' dangerouslySetInnerHTML={{ __html: this.props.getLocalizedResource('privacy') }} />

        </section>
      </div>
    );
  }
}
