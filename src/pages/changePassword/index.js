import React, { Component, PropTypes } from 'react';
import { apiBaseUrlSelector } from '../app/selector';
import Navbar from '../_common/navbar/';
import localized from '../_common/localized';
require('./changePassword.scss');

const $ = require('jquery');

@localized
class ChangePassword extends Component {

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.object.isRequired,
      pathname: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.any
  }

  componentDidMount () {
    const { t } = this.props;
    $('#resetForm').submit((event) => {
      // Stop form from submitting normally
      event.preventDefault();

      const password = $('#resetForm').find('input[name="password"]').val();
      const confirmPassword = $('#resetForm').find('input[name="confirm-password"]').val();
      const token = this.getParam('token');
      if (this.validatePassword(password) && this.confirmPassword(password, confirmPassword)) {
        // Send the data using post
        const baseUrl = apiBaseUrlSelector(this.context.store.getState());
        const showError = this.showError.bind(this);
        const hideError = this.removeError.bind(this);
        $.ajax({
          url: `${baseUrl}/v003/user/users/register/changepassword`,
          type: 'POST',
          data: JSON.stringify({ token, password }),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success (data) {
            showError('changed', t('changePassword.successMessage'));
            setTimeout(() => {
              hideError('changed');
            }, 3500);
          },
          error (data) {
            showError('changed', t('changePassword.errorMessage'));
            setTimeout(() => {
              hideError('changed');
            }, 3500);
          }
        });
      }
    });
  }
  getParam (param) {
    console.log(this.props);
    const { location: { query } } = this.props;
    return query && query[param];
  }
  validatePassword (password) {
    return password.length >= 6;
  }
  confirmPassword (password, confirmPassword) {
    return password === confirmPassword;
  }
  isFilledIn (password) {
    return password !== '' && password !== null;
  }
  showError (name, errorMessage) {
    if (!$(`.change__password__error[data-name="${name}"]`).length) {
      $('.password__form__errors').append(`<p class="change__password__error" data-name="${name}">${errorMessage}</p>`);
      setTimeout(() => { $(`.change__password__error[data-name="${name}"]`).css('opacity', 1); }, 100);
    }
  }
  removeError (name) {
    $(`.change__password__error[data-name="${name}"]`).css('opacity', 0);
    setTimeout(() => { $(`.change__password__error[data-name="${name}"]`).remove(); }, 200);
  }
  render () {
    const { t } = this.props;
    return (
      <div className='container'>
        <div className='container__wrapper'>
          <Navbar currentPathname={this.props.location.pathname} hideRightBar />
          <section className='change__password'>
            <div className='wrapper wrapper--small'>
              <h1>{t('changePassword.title')}</h1>
              <form action='' className='change__password__form' id='resetForm'>
                <p className='input__group'>
                  <input
                    name='password' placeholder={t('changePassword.newPasswordPlaceholder')} required type='password'
                    onInput={(e) => {
                      if (this.passwordTimeout !== undefined) {
                        clearTimeout(this.passwordTimeout);
                      }
                      const target = e.target;
                      this.passwordTimeout = setTimeout(() => {
                        if (!this.validatePassword($(target).val()) && this.isFilledIn($(target).val())) {
                          this.showError('length', t('changePassword.passwordLengthError'));
                        } else {
                          this.removeError('length');
                        }
                      }, 750);
                    }}/>
                </p>
                <p className='input__group'>
                  <input
                    name='confirm-password' placeholder={t('changePassword.confirmPasswordPlaceholder')} required type='password'
                    onInput={(e) => {
                      if (this.confirmTimeout !== undefined) {
                        clearTimeout(this.confirmTimeout);
                      }
                      const target = e.target;
                      this.confirmTimeout = setTimeout(() => {
                        if (this.confirmPassword($(target).val(),
                          $(target).parents('form').find('input[name="password"]').val()) ||
                          !this.isFilledIn($(target).val())) {
                          this.removeError('confirm');
                        } else {
                          this.showError('confirm', t('changePassword.passwordMatchError'));
                        }
                      }, 750);
                    }}/>
                </p>
                <p className='input__group'>
                  <input name='submit' type='submit' value={t('changePassword.submitButton')}/>
                </p>
                <div style={{ clear: 'both' }}/>
                <div className='password__form__errors'>
                </div>
              </form>
            </div>
          </section>
          <div className='push'></div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
