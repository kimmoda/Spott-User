/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { Link } from 'react-router';
import { List } from 'immutable';
import localized from '../../../_common/localized';
import SEOWidget from '../../../_common/seoWidget';
import * as actions from '../../../actions';
import { userAccountDetailsSelector } from '../../../selectors';
import { validateAccountForm } from '../../validateForm';
import { FormSelect, FormInput } from '../../../form';
import Notifier from '../../../alert';

const styles = require('./index.scss');

@localized
@connect(userAccountDetailsSelector, (dispatch) => ({
  loadProfileFormValues: bindActionCreators(actions.loadProfileFormValues, dispatch),
  loadUserProfileAccount: bindActionCreators(actions.loadUserProfileAccountWrapper, dispatch),
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
    loadUserProfileAccount: PropTypes.func.isRequired,
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
    token: PropTypes.string,
    updateUserProfile: PropTypes.func.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
  }

  async componentDidMount () {
    if (this.props.userId) {
      await this.props.loadProfileFormValues();
      this.props.loadUserProfileAccount({ uuid: this.props.userId });
    }
  }

  async onSubmit (values) {
    const primaryLanguage = [ { uuid: values.get('languageForm') } ];
    const otherLanguages = values.get('languagesForm')
      .map((item) => { return { uuid: item }; })
      .filter((item) => item.uuid !== values.get('languageForm'));
    const allLanguages = primaryLanguage.concat(otherLanguages);

    const data = {
      profile: {
        email: values.get('email'),
        firstName: values.get('firstName'),
        lastName: values.get('lastName'),
        description: values.get('description'),
        gender: values.get('gender'),
        dateOfBirth: this.props.currentUserProfile.get('dateOfBirth'),
        languages: allLanguages,
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
      this.alert.success('success', 'Your account was saved.');
    } catch (e) {
      console.log(e);
      this.alert.success('error', 'Your account was NOT saved.');
      throw e;
    }
  }

  render () {
    const { submitFailed, submitting, handleSubmit, currentLocale, location, systemContentRegions, systemCountries, systemLanguages, systemCurrencies, t } = this.props;

    return (
      <div styleName='account'>
        <Notifier ref={(ref) => { this.alert = ref; }}/>
        <h2 styleName='title'>{t('common.account')}</h2>
        <form className='form' styleName='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div styleName='blocks'>
            <div styleName='block'>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>{t('common.emailAddress')}</label>
                <Field
                  component={FormInput}
                  name='email'
                  placeholder={t('common.yourEmail')}
                  submitFailed={submitFailed}
                  type='email'/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label'>{t('common.password')}</label>
                <Link
                  styleName='password-change'
                  to={{ pathname: `/${currentLocale}/resetpassword`, state: { modal: true, returnTo: location.pathname } }}>
                  {t('common.change')}...
                </Link>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>{t('common.localization')}</h3>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>{t('userSettings.primaryLanguage')}</label>
                <Field
                  component={FormSelect}
                  name='languageForm'
                  options={systemLanguages.get('data', List()).toJS().map((item) => { return { value: item.uuid, label: item.name }; })}
                  required
                  submitFailed={submitFailed}/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label'>{t('userSettings.otherLanguages')}</label>
                <Field
                  component={FormSelect}
                  multiple
                  name='languagesForm'
                  options={systemLanguages.get('data', List()).toJS().map((item) => { return { value: item.uuid, label: item.name }; })}
                  submitFailed={submitFailed}/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>{t('common.currency')}</label>
                <Field
                  component={FormSelect}
                  name='currencyForm'
                  options={systemCurrencies.get('data', List()).toJS().map((item) => {
                    return {
                      value: item.code,
                      label: `${item.description} (${item.symbol})`
                    };
                  })}
                  required
                  submitFailed={submitFailed}/>
              </div>
            </div>
            <div styleName='block'>
              <h3 styleName='block-title'>{t('userSettings.contentRegions')}</h3>
              <div styleName='form-row'>
                <label className='form-label'>{t('userSettings.localContent')}</label>
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
              <h3 styleName='block-title'>{t('userSettings.shopRegions')}</h3>
              <div styleName='form-row'>
                <label className='form-label'>{t('userSettings.preferredShoppingRegions')}</label>
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
              {t('common.save')}
            </button>
          </div>
        </form>
        <SEOWidget description={t('seo.account.description')} title={`${t('seo.title')} - ${t('seo.account.title')}`}/>
      </div>
    );
  }
}
