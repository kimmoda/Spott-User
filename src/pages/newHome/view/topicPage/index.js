/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import Topics from '../topics';
import Cards from '../cards';
import { IconForward } from '../icons';
const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class NewTopic extends Component {

  constructor (props) {
    super(props);

    this.infoImage = 'https://spott-ios-rest-prd.appiness.mobi/spott/rest/v003/image/images/5b447383-ed89-40e7-a71a-a19788a00406?height=72&width=48';
  }

  render () {
    return (
      <section styleName='wrapper'>
        <div styleName='poster'/>
        <div styleName='info'>
          <div styleName='info-content'>
            <div styleName='info-left'>
              <div style={{ backgroundImage: `url('${this.infoImage}')` }} styleName='info-image'/>
              <div styleName='info-header'>
                <h2 styleName='info-title'>Suits</h2>
                <div styleName='info-type'>Tv Series</div>
              </div>
            </div>
            <div styleName='info-subscribers'>
              <div styleName='info-subscribers-count'>856</div>
              <div styleName='info-subscribers-text'>Subscribers</div>
            </div>
            <div styleName='info-subscribe-btn'>Subscribed</div>
            <div styleName='info-share'>
              <i><IconForward/></i>
            </div>
          </div>
        </div>
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Related Topics</div>
            <Topics />
          </div>
        </div>
        <Cards/>
      </section>
    );
  }
}
