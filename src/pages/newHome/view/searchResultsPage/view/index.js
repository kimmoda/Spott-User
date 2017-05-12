/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import localized from '../../../../_common/localized';
import Topics from '../../topics';
import * as actions from '../../../actions';
import { searchResultsSelector } from '../../../selectors';

const styles = require('./index.scss');

@localized
@connect(searchResultsSelector, (dispatch) => ({
  loadSearchTopics: bindActionCreators(actions.loadSearchTopics, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SearchResults extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    loadSearchTopics: PropTypes.func.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        q: PropTypes.string
      })
    }),
    persons: PropTypes.any.isRequired,
    posts: PropTypes.any.isRequired,
    topics: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadSearchTopics({ searchString: this.props.location.query.q });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.query.q !== nextProps.location.query.q) {
      this.props.loadSearchTopics({ searchString: nextProps.location.query.q });
    }
  }

  render () {
    const { topics, currentLocale, children, location } = this.props;

    return (
      <section styleName='wrapper'>
        {Boolean(topics.get('data') && topics.get('data').size) &&
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Related Topics</div>
            <Topics items={topics} />
          </div>
        </div>}
        <div styleName='nav-wrapper'>
          <div styleName='nav'>
            <Link
              activeClassName={styles['nav-item-active']}
              styleName='nav-item'
              to={`/${currentLocale}/search/posts?q=${location.query.q}`}>
              Posts
            </Link>
            <Link
              activeClassName={styles['nav-item-active']}
              styleName='nav-item'
              to={`/${currentLocale}/search/people?q=${location.query.q}`}>
              People
            </Link>
          </div>
        </div>
        {children}
      </section>
    );
  }
}
