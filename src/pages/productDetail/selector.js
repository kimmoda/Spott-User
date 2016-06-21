import { createStructuredSelector } from 'reselect';

export const currentProductIdSelector = (state) => state.getIn([ 'productDetail', 'currentProduct' ]);

// View selector fro user profile
export const productSelector = createStructuredSelector({
  product: currentProductIdSelector
});
