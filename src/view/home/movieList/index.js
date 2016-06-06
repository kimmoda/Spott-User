import React, { Component } from 'react';

const Slider = require('react-slick');
const Slide = require('./SliderComponents/Slide').default;
const $ = require('jquery');

const familie = require('./familie.jpg');
const dkvs = require('./dkvs.jpg');
const dagelijkseKost = require('./dagelijkseKost.jpg');
const thuis = require('./thuis.jpg');
const modernFamily = require('./modernFamily.jpg');
const theBigBangTheory = require('./theBigBangTheory.jpg');
const xFiles = require('./xFiles.jpg');

require('./movielist.scss');

class MovieList extends Component {
  constructor (props) {
    super(props);
    this.slides = [];

    const images = [ familie, dkvs, dagelijkseKost, thuis, theBigBangTheory, modernFamily, xFiles ];

    for (const k in images) {
      this.slides.push({
        name: k,
        image: images[k]
      });
    }
  }

  componentDidMount () {
    $('.movielist__form').submit((e) => {
      e.preventDefault();
      const env = (window.location.hostname === 'spott.it') ? 'prd' : 'tst';
      const baseUrl = `https://spott-cms-rest-${env}.appiness.mobi/`;
      const requestUrl = 'rest/v002/request/votes';
      const url = baseUrl + requestUrl;
      const method = 'POST';
      const title = $('input[name=\'movie\']').val();
      const dataObj = { title: '' };
      let data = '';
      const removeMessage = this.removeMessage;
      const movielistForm = $('.movielist__form');
      const error = 'movielist__error';
      const success = 'movielist__success';
      if (title !== '' && title !== null && title.length >= 2) {
        movielistForm.removeClass(error);

        dataObj.title = title;
        data = JSON.stringify(dataObj);
        $.ajax({
          url,
          method,
          data,
          contentType: 'application/json; charset=utf-8',
          success () {
            movielistForm.removeClass(error);
            if (!movielistForm.hasClass(success)) {
              movielistForm.addClass(success);
            }
            setTimeout(removeMessage, 4500);
          },
          error () {
            movielistForm.removeClass(success);
            if (!movielistForm.hasClass(error)) {
              movielistForm.addClass(error);
            }
            setTimeout(removeMessage, 4500);
          }
        });
      } else {
        movielistForm.removeClass(success);
        movielistForm.addClass(error);
        setTimeout(removeMessage, 4500);
      }
    });
  }

  removeMessage () {
    const movielistForm = $('.movielist__form');
    const error = 'movielist__error';
    const success = 'movielist__success';
    if (movielistForm.hasClass(error)) {
      movielistForm.removeClass(error);
    }
    if (movielistForm.hasClass(success)) {
      movielistForm.removeClass(success);
    }
  }

  renderSlider () {
    const nSlides = this.slides.length;
    const sliderSettings = {
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      dots: false,
      draggable: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: (nSlides <= 5) ? nSlides : 5,
      initialSlide: (nSlides / 2),
      responsive: [
        {
          breakpoint: 480,
          settings: {
            draggable: true,
            slidesToShow: (nSlides <= 3) ? nSlides : 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            draggable: true,
            slidesToShow: (nSlides <= 3) ? nSlides : 3
          }
        },
        {
          breakpoint: 960,
          settings: {
            draggable: false,
            slidesToShow: (nSlides <= 3) ? nSlides : 3
          }
        },
        {
          breakpoint: 1200,
          settings: {
            draggable: false,
            slidesToShow: (nSlides <= 4) ? nSlides : 3
          }
        }
      ]
    };
    return (
      <div className='movielist__slider'>
        <Slider {...sliderSettings}>
          {this.renderSlides()}
        </Slider>
        <div className='movielist__gradient--left'/>
        <div className='movielist__gradient--right'/>

        <button
          className={(nSlides <= 4) ? 'movielist__slider-btn next movielist__slider-btn--nodisplay' : 'movielist__slider-btn next'}
          onClick={() => { $('.movielist .slick-next').trigger('click'); }}>
          <img src={require('./buttonRight.svg')}/>
        </button>
        <button
          className={(nSlides <= 4) ? 'movielist__slider-btn prev movielist__slider-btn--nodisplay' : 'movielist__slider-btn prev'}
          onClick={() => { $('.movielist .slick-prev').trigger('click'); }}>
          <img src={require('./buttonLeft.svg')}/>
        </button>
      </div>
    );
  }

  renderSlides () {
    const arr = [];
    for (let i = 0; i < this.slides.length; i++) {
      arr.push(
        <div key={this.slides[i].name}>
          <Slide
            image={this.slides[i].image}
            key={this.slides[i].name}/>
        </div>
      );
    }
    return arr;
  }

  render () {
    if (!this.slides || !this.slides.length) {
      return null;
    }
    return (
      <section className='movielist' id='content'>
        <div className='wrapper wrapper--small movielist__text movielist__text--top'>
          <h2>
            Spott recently added products to the following shows and movies
          </h2>
          <h3>
            and we are working around the clock to bring more content to more people.
          </h3>
        </div>
        <div className='movielist__gradient--left'/>
        <div className='movielist__gradient--right'/>
        {this.renderSlider()}
        <div className='wrapper wrapper--small movielist__text movielist__text--bot'>
          <form className='movielist__form'>
            <span>{'I\'d like to see'}</span>
            <span><input autoComplete='off' name='movie' placeholder='The walking dead' style={{ width: '200px' }} type='text'
              onInput={(e) => {
                const input = $(e.target);
                if (input.val()) {
                  $('body').append(`<span id='widthreadout'>${input.val()}</span>`);
                  let width = $('#widthreadout').outerWidth() + 20;
                  width = (width > $(window).width() * 0.8) ? $(window).width() * 0.8 : width;
                  input.css('width', `${width}px`);
                  return $('#widthreadout').remove();
                }
                input.css('width', '200px');
                // input.attr('size', input.val().length);
              }}/></span>
            <span>added to this list!</span>
            <button onClick={(e) => {
              e.preventDefault();
              $('.movielist__form').trigger('submit');
            }}>
              <img src={require('./buttonRightPink.svg')}/>
            </button>

            <div className='movielist__notifications'>
              <p className='notification__success'>
                Success! Your vote was added to the list.
              </p>
              <p className='notification__error'>
                Whoops! Something went wrong, please check your input.
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default MovieList;
