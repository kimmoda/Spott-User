import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Hero from './_hero';

export default class Series extends Component {

  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.shape({
      seriesId: PropTypes.string.isRequired
    }).isRequired,
    series: ImmutablePropTypes.map.isRequired
  };

  componentDidMount () {
    this.props.loadSeries(this.props.params.seriesId);
  }

  render () {
    const { params: { seriesId }, series } = this.props;
    return (
      <div>
        <Hero seriesId={seriesId} />
        {/*{this.props.children}*/}
      </div>
    );
  }

}
