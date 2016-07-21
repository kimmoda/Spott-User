import { createStructuredSelector } from 'reselect';
import { createEntityByIdSelector, productsEntitiesSelector } from '../../data/selector';

export const currentProductIdSelector = (state) => state.getIn([ 'productDetail', 'currentProductId' ]);
export const selectedImageIdSelector = (state) => state.getIn([ 'productDetail', 'selectedImageId' ]);

// View selector for product detail page.
export const productSelector = createStructuredSelector({
  product: createEntityByIdSelector(productsEntitiesSelector, currentProductIdSelector),
  selectedImageId: selectedImageIdSelector
});
