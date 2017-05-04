/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userAccountDetailsSelector } from '../../../../selectors';
import { validateAccountForm } from '../../validateForm';
import { FormSelect, FormCheckbox, FormInput } from '../../../form';

const styles = require('./index.scss');

@localized
@connect(userAccountDetailsSelector, (dispatch) => ({
  updateUserPassword: bindActionCreators(actions.updateUserPassword, dispatch)
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
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.onSubmit = ::this.onSubmit;
    this.onPasswordChangeClick = ::this.onPasswordChangeClick;

    this.state = {
      passwordInputVisible: false
    };
  }

  async onSubmit (values) {
    try {
      if (values.get('newPassword')) {
        // this.props.updateUserPassword({ password: values.get('newPassword'), token: this.props.token });
        console.log('test');
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  onPasswordChangeClick () {
    this.setState({
      passwordInputVisible: !this.state.passwordInputVisible
    });
  }

  render () {
    const { submitFailed, submitting, currentUserProfile, handleSubmit } = this.props;
    const { passwordInputVisible } = this.state;

    return (
      <div styleName='account'>
        <h2 styleName='title'>Account</h2>
        <form className='form' styleName='form' onSubmit={handleSubmit(this.onSubmit)}>
          <div styleName='blocks'>
            <div styleName='block'>
              <div styleName='form-row'>
                <label className='form-label form-label-required'>Email Address</label>
                <div styleName='email'>
                  <div styleName='email-text'>{currentUserProfile.get('username')}</div>
                  <div styleName='email-change'>Change email</div>
                </div>
              </div>
              <div styleName='form-row form-row-shrink'>
                <label className='form-label'>Password</label>
                <div style={{ display: passwordInputVisible ? 'block' : 'none' }} styleName='password-input'>
                  <Field
                    component={FormInput}
                    name='newPassword'
                    placeholder='Type new password'
                    submitFailed={submitFailed}
                    type='text'/>
                </div>
                <div
                  style={{ display: passwordInputVisible ? 'none' : 'block' }}
                  styleName='password-change'
                  onClick={this.onPasswordChangeClick}>
                  Change...
                </div>
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
