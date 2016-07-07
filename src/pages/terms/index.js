import React, { Component, PropTypes } from 'react';
import Navbar from '../_common/navbar/';
import localized from '../_common/localized';

require('./terms.scss');

@localized
export default class Terms extends Component {
  static propTypes = {
    getLocalizedResource: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    return (
      <div className='container'>
        <Navbar currentPathname={this.props.location.pathname} />
        <section className='terms'>

          <div className='wrapper wrapper--small' dangerouslySetInnerHTML={{ __html: this.props.getLocalizedResource('privacy') }} />

        </section>
      </div>
    );
  }
}
