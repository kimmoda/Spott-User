import React, { Component } from 'react';

const $ = require('jquery');
const Slider = require('react-slick');
const Tweet = require('./Tweet').default;
const twitterFetcher = require('twitter-fetcher');

require('./twitterFeed.scss');

const twImage = require('./twitter.svg');

const twitterid = 717701981037584384;

class TwitterFeed extends Component {
  constructor (props) {
    super(props);
    this.state = { tweets: null };
  }
  componentDidMount () {
    $(window).on('resize', this.resizeTweets);
    this.fetchTweets();
  }

  componentDidUpdate () {
    setTimeout(this.resizeTweets);
  }

  fetchTweets () {
    const config = {
      id: twitterid,
      maxTweets: 3,
      customCallback: (tweets) => {
        this.setState({ tweets }); // eslint-disable-line react/no-set-state
      },
      dataOnly: true
    };
    twitterFetcher.fetch(config);
  }

  resizeTweets () {
    const tiles = $('.twitter__tile');
    let size = 0;
    $(tiles).css('height', 'initial');
    $(tiles).each((index, obj) => {
      if ($(obj).outerHeight() > size) {
        size = $(obj).outerHeight();
      }
    });
    $(tiles).css('height', `${size}px`);
  }

  renderTweets () {
    const arr = [];
    for (let k in this.state.tweets) {
      arr.push(
        <div
          className='twitter__tile-container'
          key={k}>
          <Tweet
            image={this.state.tweets[k].image}
            link={this.state.tweets[k].permalinkURL}
            text={this.state.tweets[k].tweet}
            twitterlogo={twImage} />
        </div>
      );
    }
    return arr;
  }

  render () {
    const sliderSettings = {
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      // adaptiveHeight: true,
      centerMode: true,
      dots: true,
      draggable: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // centerPadding: true,
      initialSlide: 0,
      responsive: [
        { breakpoint: 768, settings: { autoplaySpeed: 5000, slidesToShow: 1, slidesToScroll: 1, dots: true, autoplay: false } },
        { breakpoint: 100000, settings: 'unslick' }
      ]
    };
    const slides = this.renderTweets();
    if (!this.state.tweets || !this.state.tweets.length) {
      return null;
    }

    return (
      <section className='twitterfeed'>
        <div className='wrapper'>
          <h2>Things we say on Twitter</h2>
          <div className='twitter__feed cf'>
            <Slider {...sliderSettings}>
              {slides}
            </Slider>
          </div>
          <a className='twitter__button' href='https://twitter.com/SPOTT_it' target='_blank'>Follow us on Twitter</a>
        </div>
      </section>
    );
  }
}

export default TwitterFeed;
