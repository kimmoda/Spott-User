import React, { Component, PropTypes } from 'react';
import Navbar from '../_common/navbar';
import localized from '../_common/localized';

require('./error404.scss');

@localized
export default class Error404 extends Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  };

  render () {
    const { t } = this.props;
    console.log(this.props);
    return (
      <div className='container'>
        <div className='container__wrapper'>
          <Navbar currentPathname={this.props.location.pathname} />
          <section className='error404'>
            <div className='error404__textwrapper'>
              <h1>{t('error404.title')}</h1>
              <p>
                {t('error404.somethingWentWrong')}<br/>
                {t('error404.pageDoesNotExist')}
              </p>
              <a href='/'>{t('error404.returnToSpott')}</a>
            </div>
          </section>
          <div className='push'></div>
        </div>
      </div>
    );
  }

}
