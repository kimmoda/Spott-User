/* eslint-disable react/no-set-state */
/* eslint-disable react/jsx-indent-props */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import localized from '../../../_common/localized';
import Sidebars from '../sidebars';
import * as actions from '../../actions';

const styles = require('./index.scss');

@localized
@connect(null, (dispatch) => ({
  clearSidebarProducts: bindActionCreators(actions.clearSidebarProducts, dispatch),
  loadSidebarProduct: bindActionCreators(actions.loadSidebarProduct, dispatch),
  trackProductImpression: bindActionCreators(actions.trackProductImpression, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class ProductModal extends Component {
  static propTypes = {
    clearSidebarProducts: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    loadSidebarProduct: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    productId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    trackProductImpression: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onCloseHandler = ::this.onCloseHandler;
  }

  async componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    await this.props.loadSidebarProduct({ uuid: this.props.productId });
    this.props.trackProductImpression({ uuid: this.props.productId });
  }

  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
    this.props.clearSidebarProducts();
  }

  onCloseHandler () {
    this.props.onClose();
    this.props.clearSidebarProducts();
  }

  render () {
    const { location } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={this.onCloseHandler}>
        <div styleName='modal-close-layer' onClick={this.onCloseHandler}/>
        <Sidebars location={location} singleMode onSidebarClose={this.onCloseHandler}/>
      </ReactModal>
    );
  }
}
