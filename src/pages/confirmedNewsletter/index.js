import React, { Component, PropTypes } from 'react';
import localized from '../_common/localized';

const appStoreImage = require('./appStore.svg');
require('./confirm.scss');

@localized
class Confirm extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  };

  render () {
    const { t } = this.props;
    return (
      <div className='container'>
        <div className='container__wrapper'>
          <section className='confirm'>
            <div className='confirm__textwrapper wrapper wrapper--small'>
              <h1>{t('confirmedNewsletter.title')}</h1>
              <p><span dangerouslySetInnerHTML={{ __html: t('confirmedNewsletter.thankYou').replace('[[', '<a href="https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8" target="_blank">').replace(']]', '</a>') }} /><br/><br/></p>
              <p>{t('confirmedNewsletter.enjoy')}</p>
              <p>{t('confirmedNewsletter.spottTeam')}</p>
              <div className='confirm__badge'>
                <a href='https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8' target='_blank'>
                  <img src={appStoreImage} />
                </a>
              </div>
            </div>
          </section>
          <div className='push'></div>
        </div>
      </div>
    );
  }

}

export default Confirm;
