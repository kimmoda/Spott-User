import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Hero from './_hero';
import { seriesSelector } from '../selector';
import { loadSeries } from '../actions';

@connect(seriesSelector, (dispatch) => ({
  loadSeries: bindActionCreators(loadSeries, dispatch)
}))
export default class Series extends Component {

  static propTypes = {
    children: PropTypes.node,
    loadSeries: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    params: PropTypes.shape({
      seriesId: PropTypes.string.isRequired
    }).isRequired,
    series: ImmutablePropTypes.map.isRequired
  };

  componentWillMount () {
    this.props.loadSeries(this.props.params.seriesId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.seriesId !== nextProps.params.seriesId) {
      this.props.loadSeries(nextProps.params.seriesId);
    }
  }

  render () {
    const { location, params: { seriesId }, series } = this.props;
    return (
      <div>
        <Hero currentPathname={location.pathname} series={series} seriesId={seriesId} />
        {this.props.children}
      </div>
    );
  }

}
