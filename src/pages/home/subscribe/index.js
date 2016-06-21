import React, { Component } from 'react';

const $ = require('jquery');

require('./subscribe.scss');

class Subscribe extends Component {
  componentDidMount () {
    const form = $('form#mc-embedded-subscribe-form');
    const sectionSubscribe = $('.subscribe');
    const error = 'subscribe__error';
    const success = 'subscribe__success';

    // form action should use post-json and &c=? in subscribe link, change the request to GET
    form.find('input[type=\'submit\']').on('click', (e) => {
      e.preventDefault();

      // validation on our side first with regex
      if (this.validateInput(form)) {
        sectionSubscribe.removeClass(error);
        this.register(form);
      } else {
        sectionSubscribe.removeClass(success);
        sectionSubscribe.addClass(error);

        setTimeout(this.removeMessage, 4500);
      }
    });
  }

  validateInput (form) {
    const emailRegex = /([a-z0-9\.\-_]+@[a-z\.]+\.[a-z]+)/i;
    const nameRegex = /(^[A-Z][a-z]*(?:[ \-'][A-Z]?[a-z]*)*$)/i;
    const nameInput = form.find('input#mce-NAME');
    const emailInput = form.find('input#mce-EMAIL');

    return (
      emailRegex.test(emailInput.val()) && nameRegex.test(nameInput.val())
    );
  }

  clearInput () {
    const form = $('form#mc-embedded-subscribe-form');
    form.find('input[type=\'text\'], input[type=\'email\']').val('');
  }

  removeMessage () {
    const sectionSubscribe = $('.subscribe');
    const error = 'subscribe__error';
    const success = 'subscribe__success';

    if (sectionSubscribe.hasClass(error)) {
      sectionSubscribe.removeClass(error);
    }
    if (sectionSubscribe.hasClass(success)) {
      sectionSubscribe.removeClass(success);
    }
  }

  register (form) {
    const sectionSubscribe = $('.subscribe');
    const error = 'subscribe__error';
    const success = 'subscribe__success';
    const clearInput = this.clearInput;
    const removeMessage = this.removeMessage;

    // ajax call to regiser user to mailchimp list
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      error (e) {
        // connection error
        sectionSubscribe.removeClass(success);
        if (!sectionSubscribe.hasClass(error)) {
          sectionSubscribe.addClass(error);
        }

        setTimeout(removeMessage, 4500);
      },
      success (data) {
        if (data.result === 'success') {
          sectionSubscribe.removeClass(error);
          if (!sectionSubscribe.hasClass(success)) {
            sectionSubscribe.addClass(success);
          }

          clearInput();
          setTimeout(removeMessage, 4500);
        } else {
          // something went wrong
          sectionSubscribe.removeClass(success);
          if (!sectionSubscribe.hasClass(error)) {
            sectionSubscribe.addClass(error);
          }

          setTimeout(removeMessage, 4500);
        }
      }
    });
  }

  render () {
    return (
      <section className='subscribe' id='subscribe'>
        <div className='wrapper wrapper--small'>
          <div className='subscribe__headings'>
            <h1>Subscribe</h1>
            <h3>and get notified about our next updates</h3>
          </div>

          <div className='subscribe__form cf'>
            <div id='mc_embed_signup'>
              <form action='https://appiness.us11.list-manage.com/subscribe/post-json?u=9b6c24171d91a6426ac614bb1&amp;id=de1fc70f52&c=?' className='validate cf' id='mc-embedded-subscribe-form' method='GET' name='mc-embedded-subscribe-form'
                noValidate target='_blank'>
                <p className='input__group'>
                  <input className='required' id='mce-NAME' name='NAME' placeholder='Your name' type='text' />
                </p>
                <p className='input__group'>
                  <input className='required email' id='mce-EMAIL' name='EMAIL' placeholder='Your email address' type='email' />
                </p>

                <div aria-hidden='true' style={{ position: 'absolute', left: '-5000px' }}>
                  <input name='b_9b6c24171d91a6426ac614bb1_de1fc70f52' tabIndex='-1' type='text' value='' />
                </div>

                <p className='input__group'>
                  <input id='mc-embedded-subscribe' name='subscribe' type='submit' value='Submit'/>
                </p>
              </form>

              <div className='subscribe__notifications'>
                <p className='notification__success'>
                  Success! Please check your email to confirm your subscription! <span className='heart'></span>
                </p>
                <p className='notification__error'>
                  Whoops! Something went wrong, please check your input.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Subscribe;
