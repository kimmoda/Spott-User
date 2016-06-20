import React, { Component, PropTypes } from 'react';
import Navbar from '../_common/navbar';
import Channels from './channels';
import $ from 'jquery';
import { cmsApiBaseUrlSelector } from '../../selectors';

const heroImage = require('./hero.jpg');
const deviceImage = require('./device.png');
const googlePlayImage = require('./googlePlay.svg');
const appStoreImage = require('./appStore.svg');
require('./medialaan.scss');

const iosUrl = 'https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8';
const androidUrl = 'https://play.google.com/store/apps/details?id=mobi.appiness.spott';

class Medialaan extends Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  static contextTypes = {
    store: PropTypes.any
  }

  componentDidMount () {
    const formMedia = $('form#medialaanForm');
    const email = this.getParam('email');
    formMedia.find('input#email_media').val(email);
    formMedia.on('submit', (e) => {
      e.preventDefault();
      if (this.validateInput(formMedia)) {
        $('.medialaan').removeClass('medialaan__error');
        this.send(formMedia);
      } else {
        $('.medialaan').removeClass('medialaan__success');
        $('.notification__error').html('Whoops! Er ging iets mis. Controleer je invoer.');
        $('.medialaan').addClass('medialaan__error');
        setTimeout(this.removeMessage, 4500);
      }
    });
  }

  getParam (param) {
    const qstring = window.location.hash.substring(1).split('&');

    for (let i = 0; i < qstring.length; i++) {
      const p = qstring[i].split('=');

      // if parameter contains /medialaan?
      if (p[0].indexOf('/medialaan?') > -1) {
        // replace with nothing
        const splitUtl = p[0].replace('/medialaan?', '');
        p[0] = splitUtl;
      }

      // if param is email, return value
      if (p[0] === param) {
        return p[1];
      }
    }
  }

  send (form) {
    const medialaan = $('.medialaan');
    const error = 'medialaan__error';
    const success = 'medialaan__success';
    const removeMessage = this.removeMessage;

    const email = form.find('input#email_media').val();
    const agreed = (form.find('input#agreed').is(':checked'));
    const link = this.linkToAppstore;

    if (agreed && /([a-z0-9\.\-_]+@[a-z\.]+\.[a-z]+)/i.test(email)) {
      $.ajax({
        method: form.attr('method'),
        url: form.attr('action'),
        data: JSON.stringify({
          email,
          source: 'medialaan'
        }),
        cache: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error () {
          // connection error
          medialaan.removeClass(success);
          if (!medialaan.hasClass(error)) {
            $('.notification__error').html('Whoops! Er ging iets mis. Probeer later opnieuw.');
            medialaan.addClass(error);
          }

          setTimeout(removeMessage, 4500);
        },
        success (data) {
          if (!('email' in data) || !('source' in data)) {
            // something went wrong
            medialaan.removeClass(success);
            if (!medialaan.hasClass(error)) {
              $('.notification__error').html('Whoops! Er ging iets mis. Controleer je invoer.');
              medialaan.addClass(error);
            }
            // redirect to home instead of settimeout
            // ...
            setTimeout(removeMessage, 4500);
          } else {
            medialaan.removeClass(error);
            if (!medialaan.hasClass(success)) {
              medialaan.addClass(success);
            }
            link();
            setTimeout(removeMessage, 4500);
          }
        }
      });
    } else {
      medialaan.removeClass(success);
      if (!medialaan.hasClass(error)) {
        $('.notification__error').html('Je moet akkoord gaan...');
        medialaan.addClass(error);
        setTimeout(removeMessage, 4500);
      }
    }
  }

  removeMessage () {
    const medialaan = $('.medialaan');
    const error = 'medialaan__error';
    const success = 'medialaan__success';
    if (medialaan.hasClass(error)) {
      medialaan.removeClass(error);
    }
    if (medialaan.hasClass(success)) {
      medialaan.removeClass(success);
    }
  }

  validateInput (form) {
    const emailRegex = /([a-z0-9\.\-_]+@[a-z\.]+\.[a-z]+)/i;
    const emailMedia = form.find('input#email_media');

    return (
      emailRegex.test(emailMedia.val())
    );
  }

  linkToAppstore () {
    if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
      setTimeout(() => {
        window.location.replace(iosUrl);
      }, 1000);
    } else if (navigator.userAgent.match(/Android/i)) {
      setTimeout(() => {
        window.location.replace(androidUrl);
      }, 1000);
    } else {
      const submit = $('form#medialaanForm input[type="submit"]');
      const androidLink = $(`<a href="${androidUrl}" class="medialaan__linktostore"><img src=${googlePlayImage}></a>`);
      const iosLink = $(`<a href="${iosUrl}" class="medialaan__linktostore"><img src=${appStoreImage}></a>`);
      submit.replaceWith([ iosLink, androidLink ]);
    }
  }

  onInput () {
    const formMedia = $('form#medialaanForm');
    const agreed = (formMedia.find('input#agreed').is(':checked'));
    const email = (/([a-z0-9\.\-_]+@[a-z\.]+\.[a-z]+)/i.test(formMedia.find('input#email_media').val()));
    const submit = formMedia.find('input[type="submit"]');
    if (agreed && email) {
      submit.removeAttr('disabled');
    } else {
      submit.attr('disabled', 'disabled');
    }
  }

  render () {
    return (
      <div className='container'>
        <Navbar currentPathname={this.props.location.pathname} hideRightBar medialaanLogo />
        <section className='medialaan' style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
          <div className='overlay__header'></div>
          <div className='medialaan__container'>
            <div className='wrapper'>
              <img src={deviceImage} />
              <div className='medialaan__form'>
                <h1>Test nu Spott samen met MEDIALAAN.</h1>
                <h3>Spott is een innovatieve app die automatisch items op televisie kan herkennen en deze onmiddelijk linkt aan de juiste producten op webshops. Jouw TV wordt nu voor het eerst écht interactief!</h3>
                <form action={`${cmsApiBaseUrlSelector(this.context.store.getState())}/v003/user/emailRegistrations`} id='medialaanForm' method='POST'>
                  <div className='input__group'>
                    <input id='email_media' placeholder='E-mailadres' type='email' onInput={this.onInput.bind(this)} />
                    <p>E-mailadres waarop je jouw uitnodiging om te testen ontvangen hebt</p>
                  </div>
                  <div className='medialaan__notifications'>
                    <p className='notification__success'>
                      Succes! We sturen u binnenkort een link om te testen! <span className='heart'></span>
                    </p>
                    <p className='notification__error'>
                      Whoops! Er ging iets mis. Controleer je invoer.
                    </p>
                  </div>
                  <div className='input__group'>
                    <input id='agreed' name='agreed' type='checkbox' onChange={this.onInput.bind(this)} />
                    <label htmlFor='agreed'>Ik ga ermee akkoord dat Spott mijn persoonsgegevens deelt met MEDIALAAN. MEDIALAAN zal deze persoonsgegevens verwerken in overeenstemming met haar privacy disclaimer die <a href='http://medialaan.be/privacy' target='_blank'>hier</a> kan worden geraadpleegd.</label>
                  </div>
                  <div className='input__group'>
                    <input disabled name='submit' type='submit' value='Ja, ik test Spott mee!'/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Channels/>
      </div>
    );
  }
}

export default Medialaan;
