import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector } from '../app/selector';
import { charactersEntitiesSelector, mediumHasCharactersSelector, mediumHasProductsSelector, productsEntitiesSelector, seriesEntitiesSelector } from '../../data/selector';
import { createEntityByIdSelector, createEntitiesByRelationSelector } from '../../utils';

export const currentSeriesIdSelector = (state) => state.getIn([ 'series', 'currentSeries', 'id' ]);

export const currentSeriesSelector = createEntityByIdSelector(seriesEntitiesSelector, currentSeriesIdSelector);

export const heroSelector = createStructuredSelector({
  characters: createEntitiesByRelationSelector(mediumHasCharactersSelector, currentSeriesIdSelector, charactersEntitiesSelector),
  isAuthenticated: isAuthenticatedSelector
});

export const seriesSelector = createStructuredSelector({
  series: currentSeriesSelector
});

// Overview
export const topProductsSelector = createStructuredSelector({
  products: createEntitiesByRelationSelector(mediumHasProductsSelector, currentSeriesIdSelector, productsEntitiesSelector),
  series: currentSeriesSelector
});
