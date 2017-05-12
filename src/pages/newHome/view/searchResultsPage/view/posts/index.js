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
  loadSearchPosts: bindActionCreators(actions.loadSearchPosts, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SearchResultsPosts extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadSearchPosts: PropTypes.func.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        q: PropTypes.string
      })
    }),
    posts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadSearchPosts({ searchString: this.props.location.query.q });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.query.q !== nextProps.location.query.q) {
      this.props.loadSearchPosts({ searchString: nextProps.location.query.q });
    }
  }

  render () {
    const { posts } = this.props;

    return (
      <div styleName='cards'>
        <Cards items={posts}/>
      </div>
    );
  }
}
