/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import moment from 'moment';
import { Link } from 'react-router';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userAccountDetailsSelector } from '../../../../selectors';
import { validateAccountForm } from '../../validateForm';
import { FormSelect, FormCheckbox, FormInput } from '../../../form';

const styles = require('./index.scss');

@localized
@connect(userAccountDetailsSelector, (dispatch) => ({
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
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.onSubmit = ::this.onSubmit;
    this.onEmailChangeClick = ::this.onEmailChangeClick;
    this.onPasswordChangeClick = ::this.onPasswordChangeClick;

    this.state = {
      emailInputVisible: false
    };
  }

  async onSubmit (values) {
    const data = {
      profile: {
        email: values.get('email'),
        firstName: values.get('firstName'),
        lastName: values.get('lastName'),
        description: values.get('description'),
        gender: values.get('gender'),
        dateOfBirth: moment(`${values.get('yearOfBirth')} ${parseInt(values.get('monthOfBirth'), 10) + 1} ${values.get('dayOfBirth')} 0:00 +0000`, 'YYYY M D HH:mm Z'),
        languages: [
          {
            uuid: values.get('language')
          }
        ],
        currency: {
          code: values.get('currency')
        }
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

  onEmailChangeClick () {
    this.setState({
      emailInputVisible: true
    });
  }

  onPasswordChangeClick () {
    this.setState({
      passwordInputVisible: !this.state.passwordInputVisible
    });
  }

  render () {
    const { submitFailed, submitting, currentUserProfile, handleSubmit, currentLocale, location } = this.props;
    const { emailInputVisible } = this.state;

    return (
      <div styleName='account'>
        <h2 styleName='title'>Account</h2>
        <form className='form' styleName='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div styleName='blocks'>
            <div styleName='block'>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Email Address</label>
                <div style={{ display: emailInputVisible ? 'block' : 'none' }} styleName='password-input'>
                  <Field
                    component={FormInput}
                    name='email'
                    placeholder='Type new email'
                    submitFailed={submitFailed}
                    type='email'/>
                </div>
                <div style={{ display: emailInputVisible ? 'none' : 'flex' }} styleName='email'>
                  <div styleName='email-text'>{currentUserProfile.get('email') || currentUserProfile.get('username')}</div>
                  <div styleName='email-change' onClick={this.onEmailChangeClick}>Change email</div>
                </div>
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
                  name='language'
                  options={[ { value: 'nl', label: 'Nederlands' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'Français' } ]}
                  submitFailed={submitFailed}/>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label form-label-required'>Currency</label>
                <Field
                  component={FormSelect}
                  name='currency'
                  options={[ { value: 'EUR', label: 'Euro € (EUR)' }, { value: 'USD', label: 'US Dollar $ (USD)' } ]}
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
                  options={[ { value: 'nl', label: 'Dutch' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'Français' } ]}
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
