// Entities selectors
export const charactersEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'characters' ]);
export const mediaEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'media' ]);
export const productsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'products' ]);
export const usersEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'users' ]);
export const wishlistsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'wishlists' ]);

// Relations selectors
export const mediumHasCharactersSelector = (state) => state.getIn([ 'data', 'relations', 'mediumHasCharacters' ]);
export const mediumHasProductsSelector = (state) => state.getIn([ 'data', 'relations', 'mediumHasProducts' ]);
export const mediumHasTopUserProductsSelector = (state) => state.getIn([ 'data', 'relations', 'mediumHasTopUserProducts' ]);
export const userHasWishlistsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'userHasWishlists' ]);
export const wishlistHasProductsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'wishlistHasProducts' ]);

// List selectors
export const popularProductsListSelector = (state) => state.getIn([ 'data', 'lists', 'popularProducts' ]);
export const recentlyAddedMediaListSelector = (state) => state.getIn([ 'data', 'lists', 'recentlyAddedMedia' ]);
export const recentlyAddedToWishlistProductsListSelector = (state) => state.getIn([ 'data', 'lists', 'recentlyAddedToWishlistProducts' ]);
