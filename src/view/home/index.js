import React, { Component, PropTypes } from 'react';
import Navbar from '../_common/navbar';
import Header from './header';
import Logos from './logos';
import MovieList from './movieList';
import Subscribe from './subscribe';
import TwitterFeed from './twitterFeed';
import Footer from '../_common/footer';

class Home extends Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    return (
      <div className='container'>
        <Navbar currentPathname={this.props.location.pathname} />
        <Header />
        <Logos />
        <MovieList />
        <Subscribe />
        <TwitterFeed />
        <Footer />
      </div>
    );
  }
}

export default Home;
