import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Hero from './hero';
import { mediumSelector } from '../selector';
import { loadMedium } from '../actions';

@connect(mediumSelector, (dispatch) => ({
  loadCharacter: bindActionCreators(loadMedium, dispatch)
}))
export default class Character extends Component {

  static propTypes = {
    children: PropTypes.node,
    loadCharacter: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    medium: ImmutablePropTypes.map.isRequired,
    params: PropTypes.shape({
      characterId: PropTypes.string.isRequired
    }).isRequired
  };

  componentWillMount () {
    this.props.loadCharacter(this.props.params.characterId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.characterId !== nextProps.params.characterId) {
      this.props.loadMedium(this.props.route.mediumType, nextProps.params.characterId);
    }
  }

  render () {
    const { character, location: { pathname }, params: { characterId } } = this.props;
    return (
      <div>
        <Hero character={character} characterId={characterId} currentPathname={pathname} />
        {this.props.children}
      </div>
    );
  }

}
