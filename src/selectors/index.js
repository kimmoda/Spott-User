import { createStructuredSelector } from 'reselect';

export const apiBaseUrlSelector = (state) => state.getIn([ 'configuration', 'urls', 'api' ]);
export const cmsApiBaseUrlSelector = (state) => state.getIn([ 'configuration', 'urls', 'cmsApi' ]);

export const authenticationTokenSelector = (state) => state.getIn([ 'authentication', 'authenticationToken' ]);
export const authenticationErrorSelector = (state) => state.getIn([ 'authentication', 'error' ]);
export const authenticationIsLoadingSelector = (state) => state.getIn([ 'authentication', 'isLoading' ]);

export const userAvatarSelector = (state) => state.getIn([ 'authentication', 'user', 'avatar' ]);
export const userDataOfBirthSelector = (state) => state.getIn([ 'authentication', 'user', 'dateOfBirth' ]);
export const userEmailSelector = (state) => state.getIn([ 'authentication', 'user', 'email' ]);
export const userFirstnameSelector = (state) => state.getIn([ 'authentication', 'user', 'firstname' ]);
export const userFollowerCountSelector = (state) => state.getIn([ 'authentication', 'user', 'followerCount' ]);
export const userFollowingCountSelector = (state) => state.getIn([ 'authentication', 'user', 'followingCount' ]);
export const userIdSelector = (state) => state.getIn([ 'authentication', 'user', 'id' ]);
export const userLastnameSelector = (state) => state.getIn([ 'authentication', 'user', 'lastname' ]);
export const usernameSelector = (state) => state.getIn([ 'authentication', 'user', 'username' ]);
export const userPictureSelector = (state) => state.getIn([ 'authentication', 'user', 'picture' ]);
export const userTaglineSelector = (state) => state.getIn([ 'authentication', 'user', 'tagline' ]);

export const userProfileSelector = createStructuredSelector({
  avatar: userAvatarSelector,
  dateOfBirth: userDataOfBirthSelector,
  email: userEmailSelector,
  firstname: userFirstnameSelector,
  followerCount: userFollowerCountSelector,
  followingCount: userFollowingCountSelector,
  id: userIdSelector,
  lastname: userLastnameSelector,
  picture: userPictureSelector,
  tagline: userTaglineSelector,
  username: usernameSelector
});

// TODO
export const wishListSelector = () => ({
  items: Reflect.apply(Array, Array, Array(50)).map((x, index) => ({ name: `Item ${index.toString()}`, image: 'linear-gradient(to right, #d9345d, rgb(31, 188, 233))' }))
});
