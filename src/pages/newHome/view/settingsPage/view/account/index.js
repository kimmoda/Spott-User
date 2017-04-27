/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { topicDetailsSelector } from '../../../../selectors';
import { validateAccountForm } from '../../validateForm';
import { FormSelect, FormCheckbox } from '../../../form';

const styles = require('./index.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch)
}))
@reduxForm({
  form: 'userAccountForm',
  validate: validateAccountForm
})
@CSSModules(styles, { allowMultiple: true })
export default class NewUserAccount extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { submitFailed, submitting } = this.props;

    return (
      <div styleName='account'>
        <h2 styleName='title'>Account</h2>
        <form className='form' styleName='form'>
          <div styleName='blocks'>
            <div styleName='block'>
              <div styleName='form-row'>
                <label className='form-label form-label-required'>Email Address</label>
                <div styleName='email'>
                  <div styleName='email-text'>daniel.goyvaerts@gmail.com</div>
                  <div styleName='email-change'>Change email</div>
                </div>
              </div>
              <div styleName='form-row'>
                <label className='form-label'>Password</label>
                <button styleName='password-change'>Change...</button>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>Localization</h3>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Primary Language</label>
                <Field
                  component={FormSelect}
                  name='language'
                  options={[ { value: 'nl', label: 'Dutch' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'French' } ]}
                  submitFailed={submitFailed}/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Currency</label>
                <Field
                  component={FormSelect}
                  name='currency'
                  options={[ { value: 'eur', label: 'Euro € (EUR)' } ]}
                  submitFailed={submitFailed}/>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>Content Regions</h3>
              <div styleName='form-row'>
                <label className='form-label'>International Content</label>
                <div className='form-checkbox'>
                  <Field
                    component={FormCheckbox}
                    label={"I'm interested in international content"}
                    name='intcontent'
                    submitFailed={submitFailed}/>
                </div>
              </div>
              <div styleName='form-row'>
                <label className='form-label'>Local Content</label>
                <Field
                  component={FormSelect}
                  name='content'
                  options={[ { value: 'nl', label: 'Dutch' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'French' } ]}
                  submitFailed={submitFailed}/>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>Shop Regions</h3>
              <div styleName='form-row'>
                <label className='form-label'>Preferred Shopping Regions</label>
                <Field
                  component={FormSelect}
                  name='shopContent'
                  options={[ { value: 'nl', label: 'Dutch' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'French' } ]}
                  submitFailed={submitFailed}/>
              </div>
            </div>
          </div>
          <div styleName='form-submit'>
            <button disabled={submitting} styleName='form-submit-btn' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
