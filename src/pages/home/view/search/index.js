import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { colors, mediaQueries, Container, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import localized from '../../../_common/localized';
import { searchSelector } from '../../selectors';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';
import { slowdown } from '../../../../utils';
import AutocompleteListItem from './autocompleteListItem';
import AutocompleteInput from './autocompleteInput';
import { push as routerPush } from 'react-router-redux';

/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-set-state */

@localized
@connect(searchSelector, (dispatch) => ({
  getSearchSuggestions: bindActionCreators(actions.getSearchSuggestions, dispatch),
  clearSearchSuggestions: bindActionCreators(actions.clearSearchSuggestions, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@Radium
export default class Search extends Component {

  static propTypes = {
    clearSearchSuggestions: PropTypes.func.isRequired,
    getSearchSuggestions: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    searchSuggestions: PropTypes.object.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.getSuggestionValue = ::this.getSuggestionValue;
    this.onChange = ::this.onChange;
    this.onKeyDown = ::this.onKeyDown;
    this.onSuggestionsClearRequested = ::this.onSuggestionsClearRequested;
    this.onSuggestionsFetchRequested = slowdown(::this.onSuggestionsFetchRequested, 300);
    this.onSuggestionSelected = ::this.onSuggestionSelected;
    this.renderInputComponent = ::this.renderInputComponent;
    this.renderSectionTitle = ::this.renderSectionTitle;
    this.renderSuggestion = ::this.renderSuggestion;
    this.renderSuggestionsContainer = ::this.renderSuggestionsContainer;

    this.state = {
      searchValue: '',
      prevSearchValue: ''
    };
  }

  getSectionSuggestions = (section) => {
    return section.suggestions;
  };

  getSuggestionValue (suggestion) {
    return this.state.searchValue;
  }

  onChange (event, { newValue }) {
    this.setState({ searchValue: newValue });
  }

  onKeyDown (e) {
    if (e.keyCode === 13) {
      this.setState({ searchValue: this.state.prevSearchValue });
    }
  }

  onSuggestionsFetchRequested ({ value }) {
    if (value !== this.state.prevSearchValue) {
      this.setState({ prevSearchValue: value });
      this.props.getSearchSuggestions({ searchString: value });
    }
  }

  onSuggestionsClearRequested () {
  }

  onSuggestionSelected (event, { suggestion }) {
    this.props.routerPush(suggestion.shareUrl);
    this.props.clearSearchSuggestions();
  }

  static styles = {
    wrapper: {
      position: 'relative',
      backgroundColor: colors.whiteGray,
      zIndex: 1,
      transform: 'translate3d(0,0,0)',
      paddingTop: '20px',
      paddingBottom: '50px',
      [mediaQueries.small]: {
        paddingBottom: '70px'
      },
      [mediaQueries.medium]: {
        paddingBottom: '100px'
      },
      [mediaQueries.large]: {
        paddingBottom: '100px'
      }
    },
    title: {
      color: colors.dark,
      textAlign: 'center',
      maxHeight: '100%',
      ...makeTextStyle(fontWeights.light, '1.75em', '0.04375em'),
      [mediaQueries.small]: {
        ...makeTextStyle(fontWeights.light, '2em', '0.04375em')
      },
      [mediaQueries.medium]: {
        ...makeTextStyle(fontWeights.light, '2.55em', '0.04375em')
      },
      [mediaQueries.large]: {
        ...makeTextStyle(fontWeights.light, '2.75em', '0.04375em')
      }
    },
    subTitle: {
      color: colors.dark,
      opacity: 0.5,
      marginTop: '0.625em',
      ...makeTextStyle(fontWeights.regular, '1.4375em', '0.5px'),
      textAlign: 'center'
    },
    searchFieldWrapper: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '600px',
      borderRadius: '4px',
      position: 'relative',
      marginTop: '2.2em',
      [mediaQueries.small]: {
        marginTop: '3em'
      },
      [mediaQueries.medium]: {
        marginTop: '3.40625em'
      },
      [mediaQueries.large]: {
        marginTop: '3.40625em'
      }
    },
    sectionTitle: {
      height: '34px',
      borderTop: '1px solid',
      borderTopColor: colors.whiteThree,
      backgroundColor: colors.whiteGray,
      ...makeTextStyle(fontWeights.bold, '11px', '3.5px'),
      color: colors.slateGray,
      lineHeight: '34px',
      paddingLeft: '30px',
      paddingRight: '30px',
      boxSizing: 'border-box'
    },
    suggestionsContainer: {
      position: 'absolute',
      width: '100%',
      boxShadow: '0 0.625em 0.75em 0 rgba(0, 0, 0, 0.3)',
      marginTop: '-3px'
    }
  };

  renderInputComponent (inputProps) {
    return (
      <AutocompleteInput {...inputProps}/>
    );
  }

  renderSectionTitle (section) {
    const { styles } = this.constructor;

    return (
      <div style={styles.sectionTitle}>
        {section.title}
      </div>
    );
  }

  renderSuggestion (suggestion) {
    return (
      <AutocompleteListItem suggestion={suggestion}/>
    );
  }

  renderSuggestionsContainer ({ children, ...rest }) {
    const { styles } = this.constructor;

    return (
      <div {...rest} style={styles.suggestionsContainer}>
        {children}
      </div>
    );
  }

  render () {
    const { styles } = this.constructor;
    const { style, searchSuggestions, t } = this.props;
    const { searchValue } = this.state;
    const suggestions = searchSuggestions.get('items').toJS();

    const inputProps = {
      value: searchValue,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      placeholder: t('home.search.placeholder')
    };

    return (
      <div style={[
        styles.wrapper,
        style
      ]}>
        <Container>
          <h2 style={[
            styles.title
          ]}>
            {t('home.search.title')}
          </h2>
          <div style={styles.subTitle}>{t('home.search.info')}</div>
          <div style={styles.searchFieldWrapper}>
            <Autosuggest
              alwaysRenderSuggestions={false}
              focusFirstSuggestion={false}
              focusInputOnSuggestionClick={false}
              getSectionSuggestions={this.getSectionSuggestions}
              getSuggestionValue={this.getSuggestionValue}
              inputProps={inputProps}
              multiSection
              renderInputComponent={this.renderInputComponent}
              renderSectionTitle={this.renderSectionTitle}
              renderSuggestion={this.renderSuggestion}
              renderSuggestionsContainer={this.renderSuggestionsContainer}
              suggestions={suggestions}
              onSuggestionSelected={this.onSuggestionSelected}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} />
          </div>
        </Container>
      </div>
    );
  }

}
