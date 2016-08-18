import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Hero from './_hero';
import { loadMedium } from '../actions';

@connect(null, (dispatch) => ({
  loadMedium: bindActionCreators(loadMedium, dispatch)
}))
export default class Medium extends Component {

  static propTypes = {
    loadMedium: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    main: PropTypes.node,
    nav: PropTypes.node,
    params: PropTypes.shape({
      mediumId: PropTypes.string.isRequired
    }).isRequired,
    route: PropTypes.shape({
      mediumType: PropTypes.string.isRequired
    }).isRequired
  };

  componentWillMount () {
    this.props.loadMedium(this.props.route.mediumType, this.props.params.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.mediumId !== nextProps.params.mediumId) {
      this.props.loadMedium(this.props.route.mediumType, nextProps.params.mediumId);
    }
  }

  render () {
    const { location, params: { mediumId } } = this.props;
    return (
      <div>
        <Hero children={this.props.nav} currentPathname={location.pathname} mediumId={mediumId} />
        {this.props.main}
      </div>
    );
  }

}
