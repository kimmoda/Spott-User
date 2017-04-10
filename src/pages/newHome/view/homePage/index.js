/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';
import Topics from '../topics';
import Cards from '../cards';
import * as actions from '../../actions';
import { newHomeSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(newHomeSelector, (dispatch) => ({
  loadSpottsList: bindActionCreators(actions.loadSpottsList, dispatch),
  loadTrendingTopics: bindActionCreators(actions.loadTrendingTopics, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewHome extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadSpottsList: PropTypes.func.isRequired,
    loadTrendingTopics: PropTypes.func.isRequired,
    spotts: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    trendingTopics: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.loadSpottsList();
    this.props.loadTrendingTopics();
  }

  render () {
    const { trendingTopics, spotts } = this.props;
    return (
      <section styleName='wrapper'>
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Trending Topics</div>
            <Topics items={trendingTopics} />
          </div>
        </div>
        <div styleName='cards'>
          <Cards items={spotts}/>
        </div>
      </section>
    );
  }
}
