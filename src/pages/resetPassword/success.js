import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buttonStyle, colors, fontWeights, makeTextStyle, pinkButtonStyle, Modal } from '../_common/buildingBlocks';
import selector from './selector';
import { push as routerPush } from 'react-router-redux';
import localized from '../_common/localized';

@connect(selector, (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@localized
export default class ResetPassword extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string
      })
    }).isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onClose = ::this.onClose;
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || '/');
  }

  static styles = {
    button: {
      marginBottom: '0.625em',
      marginTop: '2.5em',
      width: '100%',
      padding: '1.1em'
    },
    container: {
      padding: '1.813em 1.875em',
      maxWidth: '26.25em',
      margin: '0 auto'
    },
    title: {
      ...makeTextStyle(fontWeights.light, '1.875em'),
      color: colors.dark,
      paddingBottom: '0.9333em',
      textAlign: 'center'
    },
    text: {
      ...makeTextStyle(fontWeights.bold, '0.938em'),
      color: colors.slateGray,
      display: 'block',
      textAlign: 'center'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;

    const content =
      <section style={styles.container}>
        <h2 style={styles.title}>{t('resetPasswordSuccess.title')}</h2>
        <p style={styles.text}>{t('resetPasswordSuccess.text')}</p>
        <button style={{ ...buttonStyle, ...pinkButtonStyle, ...styles.button }} onClick={this.onClose}>
          {t('resetPasswordSuccess.submitButton')}
        </button>
      </section>;

    if (this.props.location.state && this.props.location.state.modal) {
      return (
        <Modal
          isOpen
          onClose={this.onClose}>
          {content}
        </Modal>
      );
    }
    return content;
  }
}
