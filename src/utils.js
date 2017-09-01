
class LocalStorageAlternative {

  constructor () {
    this.structureLocalStorage = {};
  }

  setItem (key, value) {
    this.structureLocalStorage[key] = value;
  }

  getItem (key) {
    if (typeof this.structureLocalStorage[key] !== 'undefined') {
      return this.structureLocalStorage[key];
    }
    return null;
  }

  removeItem (key) {
    this.structureLocalStorage[key] = undefined;
  }
}
let storage;
export function getLocalStorage () {
  // Check cache first.
  if (storage) {
    return storage;
  }
  // Check if the browser supports local storage.
  if (!localStorage) {
    console.warn('No local storage support. Return alternative.');
    storage = new LocalStorageAlternative();
    return storage;
  }
  try {
    // If there is local storage but browser is in private mode,
    // the next lines will fail.
    localStorage.setItem('__TEST__', '');
    localStorage.removeItem('__TEST__');
    storage = localStorage;
  } catch (err) {
    console.warn('No local storage support. Return alternative.');
    console.warn(err);
    storage = new LocalStorageAlternative();
  }
  return storage;
}

export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '')  // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function getPath (text) {
  const parser = document.createElement('a');
  parser.href = text;
  return parser.pathname.slice(4);
}
function pad (number) {
  return number < 10 ? `0${number}` : number.toString();
}

export function formatEpisodeNumber (seasonNumber, episodeNumber) {
  return `S${pad(seasonNumber)}E${pad(episodeNumber)}`;
}

// Check if Phantomjs is rendering.
export function isServer () {
  return navigator.userAgent.toLowerCase().indexOf('phantomjs') > -1;
}

/**
 * Creates and returns a new debounced version of the passed function which
 * will postpone its execution until after wait milliseconds have elapsed since
 * the last time it was invoked. Useful for implementing 'search'. After we
 * stopped entering the search string, we want to perform a single search.
 * NOTE: based on underscore's debounce()
 * @param {function} func The function to be applied after a certain time.
 * @param {wait} number The number of milliseconds to wait until execution.
 */
/* eslint-disable */
export function slowdown (func, wait, immediate) {
  let timeout;
	return function() {
		const context = this;
    const args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
        func.apply(context, args);
      }
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
      func.apply(context, args);
    }
	};
}

export function equals ( x, y ) {
  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! equals( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
  }
  return true;
}

export function getDetailsDcFromLinks (links) {
  const getQueryString = (field, url) => {
    const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    const string = reg.exec(url);
    return string ? string[1] : null;
  };
  const detailsUrl = links.find((item) => item.rel === 'details');
  const viewUrl = links.find((item) => item.rel === 'viewEvent');
  const link = detailsUrl || viewUrl || null;

  return (link && link.href && getQueryString('dc', link.href)) || '';
}

export function getPathnameBegin (props){
  let result = '';
  if(props.currentLocale) {
    if (isModal(props)){
      result = `/${props.currentLocale}/modal`;
    } else {
      result = `/${props.currentLocale}`;
    }
  } else {
    result = '/';
  }
  return result;
}

export function isModal (props) {
  if(props.route && props.route.modalPage !== undefined){
    return props.route.modalPage;
  } else if(props.location){
    const parts = props.location.pathname.split('/');
    return parts[2] === 'modal';
  }
  return false;
}
