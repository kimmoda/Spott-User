/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { Link } from 'react-router';
import { List } from 'immutable';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userAccountDetailsSelector } from '../../../../selectors';
import { validateAccountForm } from '../../validateForm';
import { FormSelect, FormInput } from '../../../form';

const styles = require('./index.scss');

@localized
@connect(userAccountDetailsSelector, (dispatch) => ({
  loadProfileFormValues: bindActionCreators(actions.loadProfileFormValues, dispatch),
  updateUserProfile: bindActionCreators(actions.updateUserProfileWrapper, dispatch)
}))
@reduxForm({
  form: 'userAccountForm',
  validate: validateAccountForm
})
@CSSModules(styles, { allowMultiple: true })
export default class NewUserAccount extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserProfile: PropTypes.any.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    loadProfileFormValues: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    systemContentRegions: PropTypes.object.isRequired,
    systemCountries: PropTypes.object.isRequired,
    systemCurrencies: PropTypes.object.isRequired,
    systemLanguages: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
  }

  componentDidMount () {
    this.props.loadProfileFormValues();
  }

  async onSubmit (values) {
    const data = {
      profile: {
        email: values.get('email'),
        firstName: values.get('firstName'),
        lastName: values.get('lastName'),
        description: values.get('description'),
        gender: values.get('gender'),
        dateOfBirth: values.get('dateOfBirth'),
        language: [
          {
            uuid: values.get('languageForm')
          }
        ],
        languages: values.get('languagesForm').map((item) => { return { uuid: item }; }),
        currency: {
          code: values.get('currencyForm')
        },
        shoppingCountries: values.get('shoppingCountriesForm').map((item) => { return { uuid: item }; }),
        contentRegions: values.get('contentRegionsForm').map((item) => {
          return {
            country: { uuid: item.split('-')[0] },
            language: { uuid: item.split('-')[1] }
          };
        })
      }
    };
    try {
      await this.props.updateUserProfile({ uuid: this.props.userId, data });
      this.state = {
        emailInputVisible: false
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  render () {
    const { submitFailed, submitting, handleSubmit, currentLocale, location, systemContentRegions, systemCountries, systemLanguages, systemCurrencies } = this.props;

    return (
      <div styleName='account'>
        <h2 styleName='title'>Account</h2>
        <form className='form' styleName='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div styleName='blocks'>
            <div styleName='block'>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Email Address</label>
                <Field
                  component={FormInput}
                  name='email'
                  placeholder='Type new email'
                  submitFailed={submitFailed}
                  type='email'/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label'>Password</label>
                <Link
                  styleName='password-change'
                  to={{ pathname: `/${currentLocale}/resetpassword`, state: { modal: true, returnTo: location.pathname } }}>
                  Change...
                </Link>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>Localization</h3>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Primary Language</label>
                <Field
                  component={FormSelect}
                  name='languageForm'
                  options={systemLanguages.get('data', List()).toJS().map((item) => { return { value: item.uuid, label: item.name }; })}
                  submitFailed={submitFailed}/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Other languages</label>
                <Field
                  component={FormSelect}
                  multiple
                  name='languagesForm'
                  options={systemLanguages.get('data', List()).toJS().map((item) => { return { value: item.uuid, label: item.name }; })}
                  submitFailed={submitFailed}/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Currency</label>
                <Field
                  component={FormSelect}
                  name='currencyForm'
                  options={systemCurrencies.get('data', List()).toJS().map((item) => {
                    return {
                      value: item.code,
                      label: `${item.description} (${item.symbol})`
                    };
                  })}
                  submitFailed={submitFailed}/>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>Content Regions</h3>
              <div styleName='form-row'>
                <label className='form-label'>Local Content</label>
                <Field
                  component={FormSelect}
                  multiple
                  name='contentRegionsForm'
                  options={systemContentRegions.get('data', List()).toJS().map((item) => {
                    return {
                      value: `${item.country.uuid}-${item.language.uuid}`,
                      label: `${item.country.name} (${item.language.name})`
                    };
                  })}
                  submitFailed={submitFailed}/>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>Shop Regions</h3>
              <div styleName='form-row'>
                <label className='form-label'>Preferred Shopping Regions</label>
                <Field
                  component={FormSelect}
                  multiple
                  name='shoppingCountriesForm'
                  options={systemCountries.get('data', List()).toJS().map((item) => { return { value: item.uuid, label: item.name }; })}
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
