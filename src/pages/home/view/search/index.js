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

/* eslint-disable react/no-set-state */

const icon = require('./icon.svg');

@localized
@connect(searchSelector, (dispatch) => ({
  getSearchSuggestions: bindActionCreators(actions.getSearchSuggestions, dispatch),
  clearSearchSuggestions: bindActionCreators(actions.clearSearchSuggestions, dispatch)
}))
@Radium
export default class Search extends Component {

  static propTypes = {
    clearSearchSuggestions: PropTypes.func.isRequired,
    getSearchSuggestions: PropTypes.func.isRequired,
    searchSuggestions: PropTypes.object.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.getSuggestionValue = ::this.getSuggestionValue;
    this.onBlur = ::this.onBlur;
    this.onFocus = ::this.onFocus;
    this.onChange = ::this.onChange;
    this.onSuggestionsFetchRequested = slowdown(::this.onSuggestionsFetchRequested, 300);
    this.onSuggestionSelected = ::this.onSuggestionSelected;
    this.renderInputComponent = ::this.renderInputComponent;
    this.renderSectionTitle = ::this.renderSectionTitle;
    this.renderSuggestion = ::this.renderSuggestion;
    this.renderSuggestionsContainer = ::this.renderSuggestionsContainer;

    this.state = {
      searchValue: '',
      prevSearchValue: '',
      isInputFocused: false
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

  onFocus () {
    this.setState({ isInputFocused: true });
  }

  onBlur () {
    this.setState({ isInputFocused: false });
  }

  onSuggestionsFetchRequested ({ value }) {
    if (value !== this.state.prevSearchValue) {
      this.setState({ prevSearchValue: value });
      this.props.getSearchSuggestions({ searchString: value });
    }
  }

  onSuggestionsClearRequested = () => {

  };

  onSuggestionSelected () {
    this.props.clearSearchSuggestions();
  }

  static styles = {
    wrapper: {
      position: 'relative',
      backgroundColor: colors.whiteGray,
      zIndex: 1,
      transition: 'all 0.2s ease',
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
      transition: 'all 0.1s ease',
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
    },
    searchField: {
      borderRadius: '4px',
      display: 'block',
      width: '100%',
      height: '55px',
      paddingRight: '0.861em',
      backgroundImage: `url(${icon})`,
      backgroundRepeat: 'no-repeat',
      border: 'solid 1px #f9f9f9',
      color: colors.dark,
      transition: 'all 0.5s ease',
      boxShadow: '0 0.625em 0.75em 0 rgba(0, 0, 0, 0.3)',
      boxSizing: 'border-box',
      backgroundPosition: '83px',
      paddingLeft: '112px',
      ...makeTextStyle(fontWeights.normal, '18px'),
      focused: {
        backgroundPosition: '30px',
        paddingLeft: '64px',
        boxShadow: '0 0.325em 0.55em 0 rgba(0, 0, 0, 0.3)',
        [mediaQueries.mobile]: {
          backgroundPosition: '10px',
          paddingLeft: '35px'
        }
      }
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
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      placeholder: t('home.search.placeholder'),
      style: this.state.isInputFocused
        ? [ styles.searchField, styles.searchField.focused ]
        : [ styles.searchField, this.state.searchValue ? styles.searchField.focused : null ]
    };

    return (
      <div style={[
        styles.wrapper,
        style,
        {
          [mediaQueries.small]: {
            paddingTop: this.state.isInputFocused ? '0px' : '40px'
          },
          [mediaQueries.medium]: {
            paddingTop: this.state.isInputFocused ? '0px' : '80px'
          },
          [mediaQueries.large]: {
            paddingTop: this.state.isInputFocused ? '0px' : '100px'
          }
        }
      ]}>
        <Container>
          <h2 style={[
            styles.title,
            {
              opacity: this.state.isInputFocused ? '0' : '1',
              maxHeight: this.state.isInputFocused ? '0px' : '100%'
            }
          ]}>
            {t('home.search.title')}
          </h2>
          <div style={styles.subTitle}>{t('home.search.info')}</div>
          <div style={styles.searchFieldWrapper}>
            <Autosuggest
              alwaysRenderSuggestions={false}
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
