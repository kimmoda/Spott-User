import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { currentLocaleSelector } from '../app/selector';
import translations from '../../lang/index';

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

      // Example: _indexObject(obj, 'prop[idx].subprop');
      // Based upon: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
      _nestedIndexing (obj, str) {
        // Split string to array
        const keys = str.replace(/\[(\w+)\]/g, '.$1') // Convert indices to properties
          .replace(/^\./, '')                         // Strip a leading dot
          .split('.');
        // Nested lookup
        let current = obj;
        while (keys.length) {
          const n = keys.shift(); // Eat key destructively
          if (n in current) {
            current = current[n];
            continue;
          }
          return str; // Translation not found, return the key for informative purposes.
        }
        return current;
      }

      _t (key) {
        // If key is a string we want a normal internal translation
        return this._nestedIndexing(translations[this.props.currentLocale], key);
      }

      render () {
        return <WrappedComponent {...this.props} t={this._t} />;
      }
    }
  );
}
