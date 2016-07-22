import { createStructuredSelector } from 'reselect';
import { productsEntitiesSelector } from '../../data/selector';
import { createEntityByIdSelector } from '../../utils';

export const currentProductIdSelector = (state) => state.getIn([ 'productDetail', 'currentProduct', 'id' ]);
export const selectedImageIdSelector = (state) => state.getIn([ 'productDetail', 'currentProduct', 'selectedImageId' ]);

// View selector for product detail page.
export const productSelector = createStructuredSelector({
  product: createEntityByIdSelector(productsEntitiesSelector, currentProductIdSelector),
  selectedImageId: selectedImageIdSelector
});
