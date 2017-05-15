/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../../../_common/localized';
import Cards from '../../../cards';
import { searchResultsSelector } from '../../../../selectors';
import * as actions from '../../../../actions';

const styles = require('../index.scss');

@localized
@connect(searchResultsSelector, (dispatch) => ({
  loadSearchPosts: bindActionCreators(actions.loadSearchPosts, dispatch),
  loadSearchPostsMore: bindActionCreators(actions.loadSearchPostsMore, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SearchResultsPosts extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadSearchPosts: PropTypes.func.isRequired,
    loadSearchPostsMore: PropTypes.func.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        q: PropTypes.string
      })
    }),
    posts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.loadMore = ::this.loadMore;
  }

  componentDidMount () {
    this.props.loadSearchPosts({ searchString: this.props.location.query.q, page: this.props.posts.get('page') || 0 });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.query.q !== nextProps.location.query.q) {
      this.props.loadSearchPosts({ searchString: nextProps.location.query.q, page: this.props.posts.get('page') || 0 });
    }
  }

  loadMore (page) {
    this.props.loadSearchPostsMore({ searchString: this.props.location.query.q, page });
  }

  render () {
    const { posts, location } = this.props;

    return (
      <div styleName='cards-wrapper'>
        <div styleName='cards'>
          <Cards loadMore={this.loadMore} location={location} spotts={posts}/>
        </div>
      </div>
    );
  }
}
