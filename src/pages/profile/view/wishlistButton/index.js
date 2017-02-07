/* eslint-disable react/no-set-state */
/* eslint-disable react/jsx-indent-props*/
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { colors, mediaQueries } from '../../../_common/buildingBlocks';
import localized from '../../../_common/localized';
import { wishButtonSelector } from '../../selector';
import { loadWishlistsOfUser, loadUser, addProductToWishlist, createNewWishlist, removeProductFromWishlist } from '../../actions';
import { LOADED } from '../../../../data/statusTypes';
import hoverable from '../../../_common/hoverable';

const placeholderLargeImage = require('../wishlists/placeholderLarge.png');

@localized
@connect(wishButtonSelector, (dispatch) => ({
  addProductToWishlist: bindActionCreators(addProductToWishlist, dispatch),
  createNewWishlist: bindActionCreators(createNewWishlist, dispatch),
  loadUser: bindActionCreators(loadUser, dispatch),
  loadWishlistsOfUser: bindActionCreators(loadWishlistsOfUser, dispatch),
  removeProductFromWishlist: bindActionCreators(removeProductFromWishlist, dispatch)
}))
@hoverable
@Radium
export default class WishlistButton extends Component {
  static propTypes = {
    addProductToWishlist: PropTypes.func.isRequired,
    createNewWishlist: PropTypes.func.isRequired,
    error: PropTypes.any,
    hovered: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadWishlistsOfUser: PropTypes.func.isRequired,
    productUuid: PropTypes.string.isRequired,
    removeProductFromWishlist: PropTypes.func.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string,
    userWishLists: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.onButtonClick = ::this.onButtonClick;
    this.onCreateClick = ::this.onCreateClick;
    this.onInputChange = ::this.onInputChange;

    this.state = {
      isOpened: false,
      inputValue: '',
      isInputVisible: false
    };
  }

  componentWillMount () {
    if (this.props.userId) {
      this.props.loadUser(this.props.userId);
      this.props.loadWishlistsOfUser(this.props.userId, this.props.productUuid);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.userId && (this.props.userId !== nextProps.userId)) {
      this.props.loadUser(nextProps.userId);
      this.props.loadWishlistsOfUser(nextProps.userId, this.props.productUuid);
    }
  }

  toggleWishlistProduct (remove, wishlistId) {
    remove
      ? this.props.removeProductFromWishlist(wishlistId, this.props.productUuid)
      : this.props.addProductToWishlist(wishlistId, this.props.productUuid);
  }

  onButtonClick () {
    if (this.state.isOpened) {
      this.setState({ isInputVisible: false, inputValue: '' });
    }
    this.setState({ isOpened: !this.state.isOpened });
  }

  onCreateClick () {
    if (this.state.isInputVisible && this.state.inputValue) {
      this.props.createNewWishlist(this.props.productUuid, this.state.inputValue.trim());
      this.setState({ isInputVisible: false, inputValue: '' });
    } else if (!this.state.isInputVisible) {
      this.setState({ isInputVisible: true });
      this.textInput.focus();
    }
  }

  onInputChange (e) {
    this.setState({ inputValue: e.target.value });
  }

  static styles = {
    wrapper: {
      position: 'relative'
    },
    button: {
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      backgroundColor: colors.whiteGray,
      boxSizing: 'border-box',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: colors.black,
      cursor: 'pointer',
      paddingTop: '10px',
      paddingLeft: '11px',
      display: 'block'
    },
    box: {
      position: 'absolute',
      display: 'block',
      width: '270px',
      boxSizing: 'border-box',
      boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.4)',
      borderRadius: '4px',
      backgroundColor: colors.white,
      left: '50%',
      marginLeft: '-135px',
      top: '10px',
      zIndex: '600',
      [mediaQueries.small]: {
        marginLeft: '-190px'
      },
      [mediaQueries.medium]: {
        marginLeft: '-180px'
      },
      [mediaQueries.large]: {
        marginLeft: '-135px'
      },
      hidden: {
        display: 'none'
      },
      header: {
        height: '48px',
        lineHeight: '48px',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        fontSize: '12px',
        color: colors.coolGray,
        letterSpacing: '3.8px',
        backgroundColor: colors.whiteGray,
        paddingLeft: '19px'
      },
      error: {
        color: '#ff0000',
        fontSize: '16px',
        margin: '30px 0 15px 0',
        textAlign: 'center'
      },
      listWrapper: {
        width: '230px',
        margin: '0 auto'
      },
      listItem: {
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#ebebec',
        paddingTop: '10px',
        paddingBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        image: {
          width: '30px',
          height: '30px',
          backgroundImage: `url(${placeholderLargeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        },
        name: {
          marginLeft: '10px'
        },
        checkbox: {
          marginLeft: 'auto',
          backgroundColor: colors.white,
          border: `1px solid ${colors.coolGray}`,
          borderRadius: 3,
          cursor: 'pointer',
          display: 'flex',
          height: 20,
          width: 20,
          alignItems: 'center',
          justifyContent: 'center',
          checked: {
            backgroundColor: colors.cool
          }
        },
        checkboxMarker: {
          display: 'block',
          backgroundColor: colors.cool,
          color: colors.whiteGray,
          fontSize: '16px',
          height: '18px',
          transform: 'scaleX(1.3)',
          pointerEvents: 'none'
        }
      },
      footer: {
        height: '60px',
        lineHeight: '60px',
        boxSizing: 'border-box',
        fontSize: '15px',
        color: colors.darkPink,
        backgroundColor: colors.whiteGray,
        paddingLeft: '19px',
        paddingRight: '19px',
        marginTop: '37px',
        display: 'flex',
        alignItems: 'center',
        create: {
          cursor: 'pointer'
        },
        input: {
          boxSizing: 'border-box',
          width: '168px',
          height: '40px',
          fontSize: '14px',
          marginRight: 'auto',
          paddingLeft: '12px',
          paddingRight: '12px',
          hidden: {
            width: '0px',
            height: '0px',
            marginRight: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            border: 'none'
          }
        }
      }
    }
  };

  render () {
    const { styles } = this.constructor;
    const { userWishLists: { wishlists }, userId, error, t, hovered } = this.props;

    if (userId) {
      return (
        <div>
          <buttton style={[ styles.button, { borderColor: hovered || this.state.isOpened ? colors.dark : colors.darkPink } ]} onClick={this.onButtonClick}>
            <svg height='14' viewBox='0 0 20 14' width='20' xmlns='http://www.w3.org/2000/svg'>
              <g fill='none' fillRule='evenodd'>
                <path d='M-2-6h24v24H-2'/>
                <path d='M12 4H0v2h12V4zm0-4H0v2h12V0zm4 8V4h-2v4h-4v2h4v4h2v-4h4V8h-4zM0 10h8V8H0v2z' fill={hovered || this.state.isOpened ? colors.dark : colors.darkPink}/>
              </g>
            </svg>
          </buttton>
          <div style={styles.wrapper}>
            <div style={[ styles.box, !this.state.isOpened && styles.box.hidden ]}>
              <div style={styles.box.header}>{t('profile.wishlistButton.addToList')}</div>
              <div style={styles.box.listWrapper}>
                {wishlists.get('data').map((item, i) =>
                  <div key={item.get('id')} style={styles.box.listItem}>
                    <div style={[
                      styles.box.listItem.image,
                      item.getIn([ 'image', 'url' ]) && { backgroundImage: `url(${item.getIn([ 'image', 'url' ])}?width=30&height=30)` } ]} />
                    <div style={styles.box.listItem.name}>
                      {item.get('fixed') ? 'Default Wishlist' : item.get('name')}
                    </div>
                    {wishlists.get('_status') === LOADED
                      ? <div
                        style={[ styles.box.listItem.checkbox, item.get('containsProduct') && styles.box.listItem.checkbox.checked ]}
                        onClick={this.toggleWishlistProduct.bind(this, item.get('containsProduct'), item.get('id'))}>
                        {item.get('containsProduct') && <span style={styles.box.listItem.checkboxMarker}>✓</span>}
                      </div>
                      : <div style={[ styles.box.listItem.checkbox, item.get('containsProduct') && styles.box.listItem.checkbox.checked ]}>
                        {item.get('containsProduct') && <span style={styles.box.listItem.checkboxMarker}>✓</span>}
                      </div>
                    }
                  </div>
                )}
              </div>
              {typeof error === 'string' &&
              <div style={styles.box.error}>
                {t(error)}
              </div>}
              <div style={styles.box.footer}>
                <input
                  ref={(input) => { this.textInput = input; }}
                  style={[ styles.box.footer.input, !this.state.isInputVisible && styles.box.footer.input.hidden ]}
                  type='text' value={this.state.inputValue}
                  onChange={this.onInputChange}/>
                <div style={styles.box.footer.create} onClick={this.onCreateClick}>
                  {this.state.isInputVisible ? t('profile.wishlistButton.create') : t('profile.wishlistButton.createNewList')}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              display: this.state.isOpened ? 'block' : 'none',
              left: 0,
              top: 0,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              zIndex: 500,
              overflow: 'auto',
              width: '100%',
              height: '100%'
            }}
            onClick={this.onButtonClick}/>
        </div>
      );
    }
    return null;
  }
}
