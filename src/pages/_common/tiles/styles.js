import { fontWeights, makeTextStyle, mediaQueries } from '../../_common/buildingBlocks';

export const sceneTilesStyle = {
  container: {
    position: 'relative',
    paddingTop: '56%',
    height: 0,
    width: '100%'
  },
  characters: {
    left: '1.25em',
    position: 'absolute',
    right: '1.25em',
    textAlign: 'right',
    top: '1.125em'
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.498039))',
    pointerEvents: 'none' // Don't capture pointer events. "Click through..."
  },
  details: {
    base: {
      opacity: 0,
      transition: 'opacity 0.5s ease-in'
    },
    hovered: {
      transition: 'opacity 0.5s ease-out',
      opacity: 1
    }
  },
  image: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: '0.25em',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  markers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  /* TODO: replaced by text for now
  seriesLogo: {
    position: 'absolute',
    maxWidth: '5.1875em',
    maxHeight: '2em',
    filter: 'brightness(0) invert(1)',
    top: '1.125em',
    left: '1.25em'
  }, */
  seriesText: {
    position: 'absolute',
    right: '1.818em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...makeTextStyle(fontWeights.bold, '0.688em', '0.219em'),
    color: '#ffffff',
    textTransform: 'uppercase',
    top: '1.125em',
    left: '1.818em'
  },
  text: {
    position: 'absolute',
    bottom: '6.8em',
    left: '1.818em',
    right: '1.818em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...makeTextStyle(fontWeights.regular, '0.6875em', '0.219em'),
    color: '#ffffff',
    textTransform: 'uppercase',
    [mediaQueries.large]: {
      bottom: '7.6em'
    }
  },
  subtext: {
    color: '#ffffff',
    ...makeTextStyle(fontWeights.regular, '0.6875em', '0.318em'),
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  textHighlight: {
    ...makeTextStyle(fontWeights.bold, '1em', '0.219em')
  },
  line: {
    position: 'absolute',
    left: '1.25em',
    right: '1.25em',
    bottom: '4.125em',
    opacity: 0.3,
    backgroundColor: '#ffffff',
    height: '1px',
    [mediaQueries.large]: {
      bottom: '4.625em'
    }
  },
  faces: {
    position: 'absolute',
    left: '1.25em',
    right: '1.25em',
    textAlign: 'right',
    top: '1.125em'
  },
  products: {
    position: 'absolute',
    left: '1.25em',
    right: '1.25em',
    bottom: '1.125em',
    // height: '2em',
    overflow: 'hidden'
  },
  subtile: {
    base: {
      borderRadius: '0.125em',
      height: '2em',
      // float: 'left',
      display: 'inline-block', // added
      position: 'relative',
      opacity: 0.98,
      width: '2em',
      // marginBottom: '3em',
      [mediaQueries.large]: {
        width: '2.5em',
        height: '2.5em'
      }
    },
    face: {
      marginLeft: '0.4em'
    },
    product: {
      backgroundColor: 'white',
      marginRight: '0.4em'
    }
  },
  subtileImage: {
    borderRadius: '0.125em',
    bottom: 0,
    height: 'auto',
    left: 0,
    margin: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 'auto',
    transition: 'filter 0.25s ease-in-out',
    ':hover': {
      filter: 'opacity(70%)'
    }
  }
};
