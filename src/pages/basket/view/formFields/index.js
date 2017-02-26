/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { st } from '../styles';
import creditcardutils from 'creditcardutils';
import MaskedInput from 'react-maskedinput';
import '../cardsIcons.css';

const RadiumMaskedInput = Radium(MaskedInput);

@Radium
export class CardNumber extends Component {
  static propTypes = {
    input: PropTypes.any.isRequired,
    meta: PropTypes.any.isRequired,
    submitFailed: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props);
    this.inputChange = ::this.inputChange;
    this.state = {
      cardType: null,
      cardMask: '1111 1111 1111 1111 111'
    };
    this.cardMasks = {
      default: '1111 1111 1111 1111 111',
      amex: '111 111111 111111',
      dinersclub: '1111 111111 1111'
    };
  }

  inputChange (e) {
    const { input: { onChange } } = this.props;
    const val = e.target.value;
    const type = creditcardutils.parseCardType(val);
    this.setState({ cardType: type });
    if (type) {
      this.setState({ cardMask: this.cardMasks[type] ? this.cardMasks[type] : this.cardMasks.default });
    } else {
      this.setState({ cardMask: this.cardMasks.default });
    }
    onChange(val);
  }

  render () {
    const { cardType, cardMask } = this.state;
    const { submitFailed } = this.props;
    const { touched, error } = this.props.meta;
    return (
      <div>
        <div style={st.ccNumInput}>
          <RadiumMaskedInput
            mask={cardMask}
            placeholderChar=' '
            required
            style={[ st.ccNumInput.field, submitFailed && touched && error && st.modal.input.error ]}
            type='text'
            {...this.props.input}
            onChange={this.inputChange}/>
          <div
            className={cardType ? `icon-${cardType}` : 'icon-placeholder'}
            style={st.ccNumInput.icon}/>
        </div>
        {submitFailed && touched && error && error !== 'err' && <div style={st.modal.error}>{error}</div>}
      </div>
    );
  }
}

@Radium
export class PhoneNumber extends Component {
  static propTypes = {
    input: PropTypes.any.isRequired,
    meta: PropTypes.any.isRequired,
    submitFailed: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props);
    this.inputChange = ::this.inputChange;
  }

  inputChange (e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.value);
  }

  render () {
    const { submitFailed } = this.props;
    const { touched, error } = this.props.meta;

    return (
      <RadiumMaskedInput
        mask='111 111 11111'
        placeholderChar=' '
        required
        style={[ st.modal.input, submitFailed && touched && error && st.modal.input.error ]}
        type='text'
        {...this.props.input}
        onChange={this.inputChange}/>
    );
  }
}

@Radium
export class CvvNumber extends Component {
  static propTypes = {
    input: PropTypes.any.isRequired,
    meta: PropTypes.any.isRequired,
    submitFailed: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props);
    this.inputChange = ::this.inputChange;
  }

  inputChange (e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.value);
  }

  render () {
    const { submitFailed } = this.props;
    const { touched, error } = this.props.meta;

    return (
      <input
        required
        style={[ st.modal.input, submitFailed && touched && error && st.modal.input.error ]}
        type='text'
        {...this.props.input}
        onChange={this.inputChange}/>
    );
  }
}
