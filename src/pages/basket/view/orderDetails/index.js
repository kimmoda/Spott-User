/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Button, pinkButtonStyle, Spinner, RadiumLink } from '../../../_common/buildingBlocks';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';
import Radium from 'radium';
import * as actions from '../../actions';
import { ordersSelector } from '../../selectors';
import { st } from '../styles';
import { LOADED, FETCHING } from '../../../../data/statusTypes';
import moment from 'moment';
import '../cardsIcons.css';

@localized
@connect(ordersSelector, (dispatch) => ({
  loadOrders: bindActionCreators(actions.loadOrders, dispatch)
}))
@Radium
export default class OrderDetails extends Component {
  static propTypes = {
    isUbAuthenticated: PropTypes.bool.isRequired,
    loadOrders: PropTypes.func.isRequired,
    location: PropTypes.object,
    orders: PropTypes.any.isRequired,
    params: PropTypes.shape({
      orderId: PropTypes.string.isRequired
    }).isRequired,
    spottProducts: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onOrderReturnClick = ::this.onOrderReturnClick;
    this.state = {
      isOrderReturnOpen: false
    };
  }

  componentDidMount () {
    if (this.props.isUbAuthenticated && (!this.props.orders || !this.props.orders.size)) {
      this.props.loadOrders();
    }
  }

  // If authenticated we load the personal data.
  componentWillReceiveProps ({ isUbAuthenticated }) {
    if (isUbAuthenticated && this.props.isUbAuthenticated !== isUbAuthenticated) {
      this.props.loadOrders();
    }
  }

  onOrderReturnClick () {
    this.setState({ isOrderReturnOpen: !this.state.isOrderReturnOpen });
  }

  render () {
    const { orders, spottProducts, location, params, t } = this.props;
    const { orderId } = params;
    const order = orders.get('transactions') && orders.get('transactions').find((x) => x.get('id') === orderId);
    const address = order && order.getIn([ 'details', 'shipping' ]);
    const card = order && order.getIn([ 'details', 'card' ]);
    const account = order && order.getIn([ 'details', 'account' ]);

    return (
      <Container style={st.container}>
        <div style={st.title}>{t('basket.orderDetails')}</div>
        <div>
          {(orders.get('_status') === FETCHING || !order) &&
          <div style={[ st.box, st.box.empty ]}>
            <Spinner/>
          </div>}
          {(orders.get('_status') === LOADED && !order) &&
          <div style={[ st.box, st.box.empty ]}>
            <div style={st.box.empty.fline}>{t('basket.noOrderDetails')}</div>
            <div style={st.box.empty.sline}>{t('basket.youHaventPurchases')}</div>
            <Button style={[ pinkButtonStyle, st.box.empty.btn ]} to='/'>{t('basket.startShopping')}</Button>
          </div>}
          {(orders.get('_status') === LOADED && Boolean(order)) &&
          <div style={st.filled}>
            <div style={st.orders}>
              <div style={st.box}>
                <div style={st.box.dateTitle}>{moment(order.get('createdAt')).format('DD MMM YYYY')}</div>
                <div style={st.box.title}>{order.getIn([ 'shop', 'url' ])}</div>
                <div style={st.box.items}>
                  {order.get('lines').map((line) =>
                    <div key={line.get('id')} style={st.box.item}>
                      <RadiumLink
                        style={[ st.box.item.image, { backgroundImage: `url('${line.getIn([ 'product', 'thumbnailUrl' ])}')` } ]}
                        to={{
                          pathname: spottProducts.getIn([ String(line.getIn([ 'product', 'id' ])), 'data', 'shareUrl' ]),
                          state: { modal: true, returnTo: (location && location.pathname) || '/' }
                        }}/>
                      <div style={st.box.item.content}>
                        <div style={st.box.item.header}>
                          <div style={st.box.item.brand}>{spottProducts.getIn([ String(line.getIn([ 'product', 'id' ])), 'data', 'brand', 'name' ])}</div>
                        </div>
                        <div style={st.box.item.name}>
                          {line.getIn([ 'product', 'title' ])}
                        </div>
                        <div style={st.box.item.footer}>
                          <div style={st.box.item.props}>
                            {line.get('selectedAttributes').map((attr) =>
                              <div key={attr.get('name')} style={st.box.item.props.prop}>
                                {attr.get('name')}: <b style={st.box.item.props.b}>{line.getIn([ 'attributes', attr.get('name'), 'text' ])}</b>
                              </div>
                            )}
                          </div>
                          <div style={st.box.item.cost}>{line.getIn([ 'product', 'price', 'text' ])}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div style={st.box.delivery}>
                  <div style={st.box.delivery.type}>{order.getIn([ 'selectedShipping', 'text' ])}</div>
                  <div style={st.box.delivery.cost}>
                    {order.getIn([ 'selectedShipping', 'price' ])
                      ? order.getIn([ 'expectedShipping', 'text' ])
                      : 'FREE'}
                  </div>
                </div>
                <div style={st.box.footer}>
                  <div>{t('basket.total')}</div>
                  <div style={st.box.footer.totalCost}>{order.getIn([ 'total', 'text' ])}</div>
                </div>
              </div>
              <div style={st.returnBox}>
                <div style={st.returnTitle} onClick={this.onOrderReturnClick}>
                  <div>
                    {t('basket.wantReturnOrder')}
                  </div>
                  <div style={st.returnTitle.arrow}>
                    {this.state.isOrderReturnOpen
                      ? <div style={st.returnTitle.arrowUp} />
                      : <div style={st.returnTitle.arrowDown} />
                    }
                  </div>
                </div>
                <div style={[ st.returnContent, { display: this.state.isOrderReturnOpen ? 'block' : 'none' } ]}>
                  {t('basket.returnOrderDescription')}<br/><br/>
                  {t('basket.returnOrderDescriptionBottom')}
                  <div>
                    <div style={st.returnCreds}>
                      <div style={st.returnCreds.title}>{t('basket.yourShopLogin')}</div>
                      <div style={st.returnCreds.content}>
                        <div style={st.returnCreds.row}>
                          <div style={st.returnCreds.left}>{t('basket.shop')}:</div>
                          <a href={`http://${order.getIn([ 'shop', 'url' ])}`} style={st.returnCreds.right} target='_blank'>
                            {order.getIn([ 'shop', 'url' ])}
                          </a>
                        </div>
                        <div style={st.returnCreds.row}>
                          <div style={st.returnCreds.left}>{t('basket.usernameEmail')}:</div>
                          <div style={st.returnCreds.right}>{account.get('email')}</div>
                        </div>
                        <div style={st.returnCreds.row}>
                          <div style={st.returnCreds.left}>{t('basket.password')}:</div>
                          <div style={st.returnCreds.right}>{account.get('password')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={st.checkoutDetails}>
              <div style={st.box}>
                  <div style={st.box.title}>{t('basket.checkoutDetails')}</div>
                  <div style={st.box.items}>
                    <div style={st.box.itemCheckout}>
                      <div>
                        <div style={st.box.itemCheckout.title}>{t('basket.deliveryAddress')}</div>
                        <div style={st.box.itemCheckout.text}>
                          <div>
                            {address.get('title')} {address.get('firstname')} {address.get('lastname')}
                          </div>
                          <div>{address.get('line1')} {address.get('houseNumber')}</div>
                          {address.get('line2') && <div>{address.get('line2')}</div>}
                          <div>{address.get('postcode')} {address.get('city')}</div>
                        </div>
                      </div>
                    </div>
                    <div style={st.box.itemCheckout}>
                      <div>
                        <div style={st.box.itemCheckout.title}>{t('basket.paymentMethod')}</div>
                        <div style={st.box.itemCheckout.text}>
                          <div style={st.paymentCard}>
                            <div style={st.paymentCard.name}>
                              <div
                                className={card.getIn([ 'cardType', 'code' ]) ? `icon-${card.getIn([ 'cardType', 'code' ])}` : 'icon-placeholder'}
                                style={st.paymentCard.name.icon}/>
                              {card.getIn([ 'cardType', 'code' ])}
                            </div>
                            <div style={st.paymentCard.number}>
                              <div style={st.paymentCard.number.dots}>··· ··· ···&nbsp;</div>
                              {card.get('maskedNumber').slice(-4)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={st.box.itemCheckout}>
                      <div>
                        <div style={st.box.itemCheckout.title}>{t('basket.orderPlaced')}</div>
                        <div style={st.box.itemCheckout.text}>
                          {moment(order.get('createdAt')).format('DD MMM YYYY')}
                        </div>
                      </div>
                    </div>
                    <div style={st.box.itemCheckout}>
                      <div>
                        <div style={st.box.itemCheckout.text}>
                          UB Order Ref # 12345678
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>}
        </div>
      </Container>
    );
  }
}
