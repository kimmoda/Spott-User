/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import moment from 'moment';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userSettingsDetailsSelector } from '../../../../selectors';
import { validateUserForm } from '../../validateForm';
import { FormInput, FormRadio, FormSelect } from '../../../form';

const styles = require('./index.scss');

@localized
@connect(userSettingsDetailsSelector, (dispatch) => ({
  updateUserAvatar: bindActionCreators(actions.updateUserAvatar, dispatch),
  updateUserBackground: bindActionCreators(actions.updateUserBackground, dispatch),
  updateUserProfile: bindActionCreators(actions.updateUserProfileWrapper, dispatch)
}))
@reduxForm({
  form: 'userSettingsForm',
  validate: validateUserForm
})
@CSSModules(styles, { allowMultiple: true })
export default class NewUserSettings extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserProfile: PropTypes.any.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.any.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    updateUserAvatar: PropTypes.func.isRequired,
    updateUserBackground: PropTypes.func.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
    this.onAvatarChange = ::this.onAvatarChange;
    this.onBackgroundChange = ::this.onBackgroundChange;

    this.state = {
      avatarFile: null,
      avatarPreviewUrl: this.props.currentUserProfile.getIn([ 'avatar', 'url' ]),
      backgroundFile: null,
      backgroundPreviewUrl: this.props.currentUserProfile.getIn([ 'picture', 'url' ])
    };
  }

  async onSubmit (values) {
    const data = {
      profile: {
        email: this.props.currentUserProfile.get('email'),
        firstName: values.get('firstName'),
        lastName: values.get('lastName'),
        description: values.get('description'),
        gender: values.get('gender'),
        dateOfBirth: moment(`${values.get('yearOfBirth')} ${parseInt(values.get('monthOfBirth'), 10) + 1} ${values.get('dayOfBirth')} 0:00 +0000`, 'YYYY M D HH:mm Z')
      }
    };
    try {
      if (this.state.avatarFile) {
        await this.props.updateUserAvatar({ uuid: this.props.userId, data: { data: this.state.avatarFile } });
      }
      if (this.state.backgroundFile) {
        await this.props.updateUserBackground({ uuid: this.props.userId, data: { data: this.state.backgroundFile } });
      }
      this.props.updateUserProfile({ uuid: this.props.userId, data });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  onAvatarChange (e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatarFile: reader.result.split(',')[1],
        avatarPreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  onBackgroundChange (e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        backgroundFile: reader.result.split(',')[1],
        backgroundPreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render () {
    const { submitFailed, submitting, handleSubmit } = this.props;
    const { avatarPreviewUrl, backgroundPreviewUrl } = this.state;

    return (
      <div styleName='content-profile'>
        <h2 styleName='content-title'>Profile</h2>
        <div styleName='user-photos'>
          <div styleName='user-avatar'>
            <div style={{ backgroundImage: `url(${avatarPreviewUrl})` }} styleName='avatar-image'/>
            <label styleName='avatar-link'>
              Change photo
              <input type='file' onChange={this.onAvatarChange}/>
            </label>
          </div>
          <div styleName='user-bg'>
            <div style={{ backgroundImage: `url(${backgroundPreviewUrl})` }} styleName='bg-image'/>
            <label styleName='bg-link'>
              Change background
              <input type='file' onChange={this.onBackgroundChange}/>
            </label>
          </div>
        </div>
        <form className='form' styleName='user-form' onSubmit={handleSubmit(this.onSubmit)}>
          <div styleName='user-form-wrapper'>
            <div styleName='user-form-row'>
              <label className='form-label form-label-required'>Name</label>
              <div className='form-join-fields'>
                <Field
                  component={FormInput}
                  name='firstName'
                  placeholder='First name'
                  submitFailed={submitFailed}
                  type='text'/>
                <Field
                  component={FormInput}
                  name='lastName'
                  placeholder='Last name'
                  submitFailed={submitFailed}
                  type='text'/>
              </div>
            </div>
            <div styleName='user-form-row'>
              <label className='form-label form-label-required'>Bio</label>
              <Field
                component={FormInput}
                name='description'
                placeholder='About you...'
                submitFailed={submitFailed}
                type='text'/>
            </div>
            <div styleName='user-form-high-row'>
              <label className='form-label'>Gender</label>
              <div className='form-radios'>
                <Field
                  component={FormRadio}
                  label='Male'
                  name='gender'
                  submitFailed={submitFailed}
                  type='radio'
                  value='MALE'/>
                <Field
                  component={FormRadio}
                  label='Female'
                  name='gender'
                  submitFailed={submitFailed}
                  type='radio'
                  value='FEMALE'/>
                <Field
                  component={FormRadio}
                  label='Unspecified'
                  name='gender'
                  submitFailed={submitFailed}
                  type='radio'
                  value='UNKNOWN'/>
              </div>
            </div>
            <div styleName='user-form-row'>
              <label className='form-label'>Date of birth</label>
              <div className='form-join-3-fields'>
                <Field
                  component={FormSelect}
                  emptyOption
                  name='dayOfBirth'
                  options={new Array(31).fill(1).map((item, index) => {
                    return { value: index + 1, label: index + 1 };
                  })}
                  submitFailed={submitFailed}/>
                <Field
                  component={FormSelect}
                  emptyOption
                  name='monthOfBirth'
                  options={moment.months().map((item, index) => {
                    return { value: index, label: item };
                  })}
                  submitFailed={submitFailed}/>
                <Field
                  component={FormSelect}
                  emptyOption
                  name='yearOfBirth'
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
