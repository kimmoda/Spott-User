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
export default class Orders extends Component {
  static propTypes = {
    isUbAuthenticated: PropTypes.bool.isRequired,
    loadOrders: PropTypes.func.isRequired,
    location: PropTypes.object,
    orders: PropTypes.any.isRequired,
    spottProducts: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      isModalAddressOpen: false
    };
  }

  componentDidMount () {
    if (this.props.isUbAuthenticated) {
      this.props.loadOrders();
    }
  }

  // If authenticated we load the personal data.
  componentWillReceiveProps ({ isUbAuthenticated }) {
    if (isUbAuthenticated && this.props.isUbAuthenticated !== isUbAuthenticated) {
      this.props.loadOrders();
    }
  }

  render () {
    const { orders, spottProducts, location } = this.props;

    return (
      <Container style={st.container}>
        <div style={st.title}>My Orders</div>
        <div>
          {orders.get('_status') === FETCHING &&
          <div style={[ st.box, st.box.empty ]}>
            <Spinner/>
          </div>}
          {(orders.get('_status') === LOADED && !orders.get('transactions').size) &&
          <div style={[ st.box, st.box.empty ]}>
            <div style={st.box.empty.fline}>No Order History</div>
            <div style={st.box.empty.sline}>You haven’t made any purchases yet</div>
            <Button style={[ pinkButtonStyle, st.box.empty.btn ]} to='/'>START SHOPPING</Button>
          </div>}
          {(orders.get('_status') === LOADED && Boolean(orders.get('transactions').size)) &&
          <div>
            {orders.get('transactions').map((order) =>
              <div key={order.get('id')} style={st.boxOrder}>
                <div style={st.boxOrder.title}>{moment(order.get('createdAt')).format('DD MMM YYYY')}</div>
                <div style={st.boxOrder.items}>
                  <div style={st.boxOrder.item}>
                    <div style={st.boxOrder.item.header}>
                      <div style={st.boxOrder.item.shopName}>{order.getIn([ 'shop', 'url' ])}</div>
                      <div style={st.boxOrder.item.cost}>{order.getIn([ 'total', 'text' ])}</div>
                    </div>
                    <div style={st.boxOrder.item.content}>
                      <div style={st.boxOrder.item.pWrapper}>
                        <div style={st.boxOrder.item.products}>
                          {order.get('products').map((product, index) =>
                          <div key={`${index}_${product.get('id')}`}>
                            {spottProducts.getIn([ String(product.getIn([ 'product', 'id' ])), 'data', 'shareUrl' ])
                              ? <RadiumLink
                                style={[
                                  st.boxOrder.item.product,
                                  { backgroundImage: `url('${product.getIn([ 'product', 'thumbnailUrl' ])}')` }
                                ]}
                                title={product.getIn([ 'product', 'title' ])}
                                to={{
                                  pathname: spottProducts.getIn([ String(product.getIn([ 'product', 'id' ])), 'data', 'shareUrl' ]),
                                  state: { modal: true, returnTo: (location && location.pathname) || '/' }
                                }}/>
                              : <div
                                style={[
                                  st.boxOrder.item.product,
                                  { backgroundImage: `url('${product.getIn([ 'product', 'thumbnailUrl' ])}')` }
                                ]}
                                title={product.getIn([ 'product', 'title' ])}/>
                            }
                          </div>
                          )}
                        </div>
                        <div style={st.boxOrder.item.shadow}/>
                      </div>
                      <div style={st.boxOrder.item.details}>Details</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>}
        </div>
      </Container>
    );
  }
}
