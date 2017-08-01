/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../_common/localized';
import * as actions from '../actions';
import { newHomeSelector } from '../selectors';

const styles = require('./index.scss');

@localized
@connect(newHomeSelector, (dispatch) => ({
  loadSpottsList: bindActionCreators(actions.loadSpottsListWrapper, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class PromoPage extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.string,
    params: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    // this.loadData(this.props);
  }

  render () {
    return (
      <section styleName='wrapper'>
        <div styleName='header'>
          <div styleName='header-logo1'/>
          <div styleName='header-logo2'/>
        </div>
        <div styleName='banner'>
          <div styleName='banner-image'>
            <div styleName='banner-hero'>
              <div styleName='banner-logo'/>
              <div styleName='banner-text'>
                <b>1 LIKE</b>
                <i>=</i>
                <b>2 KOPJES</b>
                <span>SCHENKEN</span>
              </div>
              <div styleName='banner-logo2'/>
            </div>
          </div>
        </div>
        <div styleName='content'>
          <div styleName='content-title'>
            Like en schenk een kopje koffie
          </div>
          <div styleName='content-dscr'>
            Like de actie Koffie voor ledereen en schenk zo 2<br/>
            kopjes koffie aan minderbedeelden.
          </div>
          <div styleName='form'>
            <div styleName='form-row'>
              <label>Voornaam</label>
              <input defaultValue='Adam' type='text'/>
            </div>
            <div styleName='form-row'>
              <label>Naam</label>
              <input defaultValue='Moreno' type='text'/>
            </div>
            <div styleName='form-row'>
              <label>Email</label>
              <input defaultValue='adam.moreno@gmail.com' type='text'/>
            </div>
            <div styleName='form-checkbox'>
              <input id='chk' type='checkbox'/>
              <label htmlFor='chk'>
                Ik geef hierbij toelating om bovenstaande gegevens te delen met Jacobs Douwe Egberts
                BE BVBA, enkel en alleen voor de opvolging van
              </label>
            </div>
            <div styleName='form-button'>
              Verzenden
            </div>
          </div>
        </div>
        <footer styleName='footer'>
          <div styleName='footer-logo1'/>
          <div styleName='footer-logo2'/>
        </footer>
      </section>
    );
  }
}
