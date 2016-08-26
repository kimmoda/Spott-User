import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Hero from './hero';

import { loadCharacter } from '../actions';

@connect(null, (dispatch) => ({
  loadCharacter: bindActionCreators(loadCharacter, dispatch)
}))
export default class Character extends Component {

  static propTypes = {
    children: PropTypes.node,
    loadCharacter: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    params: PropTypes.shape({
      characterId: PropTypes.string.isRequired
    }).isRequired
  };

  componentWillMount () {
    this.props.loadCharacter(this.props.params.characterId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.characterId !== nextProps.params.characterId) {
      this.props.loadCharacter(nextProps.params.characterId);
    }
  }

  render () {
    const { location: { pathname } } = this.props;
    return (
      <div>
        <Hero currentPathname={pathname} />
        {this.props.children}
      </div>
    );
  }

}
