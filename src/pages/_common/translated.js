import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { currentLocaleSelector } from '../app/selector';
import counterpart from 'counterpart';
import allLocaleData from '../../lang/index';

// Register counterpart locales
Object.keys(allLocaleData).forEach((locale) => {
  const localeData = allLocaleData[locale];
  counterpart.registerTranslations(locale, localeData);
});

/**
  * Decorator which adds a prop 't' (a function).
  * Each time the language changes the component will be rerendered.
  * The function 't', translates a given key to the current language.
  */
export default function translated (WrappedComponent) {
  return (
    @connect(createStructuredSelector({ currentLocale: currentLocaleSelector }))
    class Translated extends Component {

      static propTypes = {
        currentLocale: PropTypes.string.isRequired
      };

      constructor (props, context) {
        super(props, context);
        this._t = ::this._t;
      }

      _t (key, interpolationValues) {
        // If key is a string we want a normal internal translation
        return counterpart(key, { locale: this.props.currentLocale, ...interpolationValues });
      }

      render () {
        return <WrappedComponent {...this.props} t={this._t} />;
      }
    }
  );
}
