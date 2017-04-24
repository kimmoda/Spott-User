/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import moment from 'moment';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { topicDetailsSelector } from '../../../../selectors';
import { validateUserForm } from '../../validateForm';
import { FormInput, FormRadio, FormSelect } from '../../../form';

const styles = require('./index.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch)
}))
@reduxForm({
  form: 'userProfileForm',
  validate: validateUserForm
})
@CSSModules(styles, { allowMultiple: true })
export default class NewUserProfile extends Component {
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
      <div styleName='content-profile'>
        <h2 styleName='content-title'>Profile</h2>
        <div styleName='user-photos'>
          <div styleName='user-avatar'>
            <div styleName='avatar-image'/>
            <div styleName='avatar-link'>Change photo</div>
          </div>
          <div styleName='user-bg'>
            <div styleName='bg-image'/>
            <div styleName='bg-link'>Change background</div>
          </div>
        </div>
        <form className='form' styleName='user-form'>
          <div styleName='user-form-wrapper'>
            <div styleName='user-form-row'>
              <label className='form-label form-label-required'>Name</label>
              <div className='form-join-fields'>
                <Field
                  component={FormInput}
                  name='firstname'
                  placeholder='First name'
                  submitFailed={submitFailed}
                  type='text'/>
                <Field
                  component={FormInput}
                  name='lastname'
                  placeholder='Last name'
                  submitFailed={submitFailed}
                  type='text'/>
              </div>
            </div>
            <div styleName='user-form-row'>
              <label className='form-label form-label-required'>Bio</label>
              <Field
                component={FormInput}
                name='bio'
                placeholder='About you...'
                submitFailed={submitFailed}
                type='email'/>
            </div>
            <div styleName='user-form-high-row'>
              <label className='form-label'>Gender</label>
              <div className='form-radios'>
                <Field
                  component={FormRadio}
                  label='Male'
                  name='gender'
                  submitFailed={submitFailed}
                  value='0'/>
                <Field
                  component={FormRadio}
                  label='Female'
                  name='gender'
                  submitFailed={submitFailed}
                  value='1'/>
                <Field
                  component={FormRadio}
                  label='Unspecified'
                  name='gender'
                  submitFailed={submitFailed}
                  value='2'/>
              </div>
            </div>
            <div styleName='user-form-row'>
              <label className='form-label'>Date of birth</label>
              <div className='form-join-3-fields'>
                <Field
                  component={FormSelect}
                  emptyOption
                  name='day'
                  options={new Array(31).fill(1).map((item, index) => {
                    return { value: index + 1, label: index + 1 };
                  })}
                  submitFailed={submitFailed}/>
                <Field
                  component={FormSelect}
                  emptyOption
                  name='month'
                  options={moment.months().map((item, index) => {
                    return { value: index + 1, label: item };
                  })}
                  submitFailed={submitFailed}/>
                <Field
                  component={FormSelect}
                  emptyOption
                  name='year'
                  options={new Array(moment().format('YYYY') - 1920 + 1).fill(1).map((item, index) => {
                    return { value: 1920 + index, label: 1920 + index };
                  })}
                  submitFailed={submitFailed}/>
              </div>
            </div>
          </div>
          <div styleName='user-form-submit'>
            <button disabled={submitting} styleName='user-form-submit-btn' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
