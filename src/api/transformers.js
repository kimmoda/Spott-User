import * as _ from 'lodash';
import moment from 'moment';

function stripDomain (url) {
  return url.substring(url.indexOf('/', 9));
}

export function transformUser ({ uuid, userName, profile }) {
  return {
    profile: {
      avatar: profile.avatar ? profile.avatar : null,
      dateOfBirth: profile.dateOfBirth,
      email: profile.email ? profile.email : null,
      firstName: profile.firstName,
      followerCount: profile.followerCount,
      followingCount: profile.followingCount,
      id: uuid,
      lastName: profile.lastName,
      picture: profile.picture ? profile.picture : null,
      tagline: profile.tagLine,
      username: userName,
      description: profile.description ? profile.description : null,
      gender: profile.gender ? profile.gender : null,
      languages: profile.languages && profile.languages.length ? profile.languages : null,
      currency: profile.currency ? profile.currency : null,
      shoppingCountries: profile.shoppingCountries ? profile.shoppingCountries : null,
      contentRegions: profile.contentRegions ? profile.contentRegions : null
    },
    initialValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email ? profile.email : null,
      description: profile.description ? profile.description : null,
      gender: profile.gender ? profile.gender : null,
      dayOfBirth: moment(profile.dateOfBirth).get('date'),
      monthOfBirth: moment(profile.dateOfBirth).get('month'),
      yearOfBirth: moment(profile.dateOfBirth).get('year'),
      currencyForm: profile.currency ? profile.currency.code : null,
      languageForm: profile.languages && profile.languages.length ? profile.languages[0].uuid : null,
      languagesForm: profile.languages && profile.languages.length ? profile.languages
        .map((item) => item.uuid)
        .filter((item) => item !== profile.languages[0].uuid) : null,
      shoppingCountriesForm: profile.shoppingCountries ? profile.shoppingCountries.map((item) => item.uuid) : null,
      contentRegionsForm: profile.contentRegions ? profile.contentRegions.map((item) => `${item.country.uuid}-${item.language.uuid}`) : null
    }
  };
}

export function transformSuggestions (data) {
  const types = {
    CHARACTER: 'CHARACTER',
    TV_SERIE: 'TV_SERIE',
    MOVIE: 'MOVIE'
  };

  const typeToTitle = {
    CHARACTER: 'CHARACTERS',
    TV_SERIE: 'TV SHOWS',
    MOVIE: 'MOVIES'
  };

  return _.chain(data)
    .groupBy('type')
    .pickBy((val, key) => {
      return types.hasOwnProperty(key);
    })
    .map((val, key) => {
      return {
        title: typeToTitle[key],
        suggestions: val.map((item) => (
          {
            title: item.suggestions[0].value,
            uuid: item.entity.uuid,
            imageUrl: key === types.CHARACTER
              ? item.entity.avatar && item.entity.avatar.url
              : item.entity.posterImage && item.entity.posterImage.url,
            shareUrl: stripDomain(item.entity.shareUrl),
            smallImage: key === types.CHARACTER
          }
        ))
      };
    })
    .value();
}

export function transformNewSuggestions (data) {
  function toUrlPart (type, uuid) {
    if (type === 'TV_SERIE' || type === 'CHARACTER' || type === 'MOVIE') {
      return `topic/MEDIUM%7C${uuid}`;
    }
    if (type === 'BRAND') {
      return `topic/BRAND%7C${uuid}`;
    }
    if (type === 'USER') {
      return `profile/${uuid}`;
    }
    if (type === 'ANNOTATED_POST') {
      return '';
    }
    return '';
  }

  return data.map((val) => {
    return {
      text: val.suggestions[0].value,
      urlPart: toUrlPart(val.type, val.entity.uuid)
    };
  });
}

export function transformSpottsList (data) {
  return {
    meta: {
      page: data.page,
      pageCount: data.pageCount,
      pageSize: data.pageSize,
      totalResultCount: data.totalResultCount
    },
    data: Object.assign({}, ...data.data.map((item) => { return { [item.uuid]: { ...item } }; }))
  };
}

export function transformPersonsList (data) {
  return {
    size: data.data ? data.data.length : 0,
    users: data.data.filter((item) => item.user).map((item) => {
      return {
        avatar: item.user.profile.avatar,
        firstName: item.user.profile.firstName,
        lastName: item.user.profile.lastName,
        followingUser: item.user.profile.followingUser,
        uuid: item.user.uuid,
        links: item.user.links
      };
    }),
    actors: data.data.filter((item) => item.actor).map((item) => {
      return {
        avatar: item.actor.avatar,
        name: item.actor.name,
        uuid: item.actor.uuid,
        links: item.actor.links
      };
    }),
    characters: data.data.filter((item) => item.character).map((item) => {
      return {
        avatar: item.character.avatar,
        name: item.character.name,
        uuid: item.character.uuid,
        links: item.character.links
      };
    })
  };
}

export function transformFollowersList (data) {
  return {
    meta: {
      page: data.page,
      pageCount: data.pageCount,
      pageSize: data.pageSize,
      totalResultCount: data.totalResultCount
    },
    data: data.data.map((item) => {
      return {
        avatar: item.avatar,
        firstName: item.firstName,
        lastName: item.lastName,
        followingUser: item.following,
        uuid: item.user.uuid,
        links: item.user.links
      };
    })
  };
}

export function transformDataPagingList (data) {
  return {
    meta: {
      page: data.page,
      pageCount: data.pageCount,
      pageSize: data.pageSize,
      totalResultCount: data.totalResultCount
    },
    data: data.data
  };
}
