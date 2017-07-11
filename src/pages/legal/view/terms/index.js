import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import LegalPages from '../index';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Privacy extends Component {

  static propTypes = {
    getLocalizedResource: PropTypes.func.isRequired,
    history: PropTypes.object,
    location: PropTypes.object.isRequired
  }

  render () {
    const { location, history } = this.props;

    return (
      <LegalPages history={history} location={location}>
        <section styleName='content'>
          <div dangerouslySetInnerHTML={{ __html: this.props.getLocalizedResource('terms') }}/>
        </section>
      </LegalPages>
    );
  }
}
