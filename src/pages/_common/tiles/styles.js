import { fontWeights, makeTextStyle, mediaQueries } from '../../_common/buildingBlocks';

export const sceneTilesStyle = {
  container: {
    height: 0,
    overflow: 'hidden',
    paddingTop: '56%',
    position: 'relative',
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
    backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.15) 100%)',
    bottom: 0,
    left: 0,
    pointerEvents: 'none', // Don't capture pointer events. "Click through..."
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'all 0.5s ease-in',
    opacity: 1,
    hovered: {
      opacity: 0
    }
  },
  layerSecond: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.498039))',
    bottom: 0,
    left: 0,
    pointerEvents: 'none', // Don't capture pointer events. "Click through..."
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'all 0.5s ease-in',
    opacity: 0,
    hovered: {
      opacity: 1
    }
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
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    borderRadius: '0.25em',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
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
    base: {
      ...makeTextStyle(fontWeights.regular, '0.6875em', '0.219em'),
      bottom: '1.125em',
      color: '#ffffff',
      left: '1.818em',
      overflow: 'hidden',
      position: 'absolute',
      right: '1.818em',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      transition: 'bottom 0.5s ease-in'
    },
    hovered: {
      bottom: '6.8em',
      transition: 'bottom 0.5s ease-out',
      [mediaQueries.large]: {
        bottom: '7.6em'
      }
    }
  },
  subtext: {
    ...makeTextStyle(fontWeights.regular, '0.6875em', '0.318em'),
    color: '#ffffff',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  smallSubtext: {
    ...makeTextStyle(fontWeights.regular, '14px', '0.4px'),
    color: '#ffffff',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  textHighlight: {
    ...makeTextStyle(fontWeights.bold, '1em', '0.219em')
  },
  line: {
    base: {
      backgroundColor: '#ffffff',
      bottom: '-1px',
      height: '1px',
      left: '1.25em',
      opacity: 0,
      position: 'absolute',
      right: '1.25em',
      transition: 'bottom 0.5s ease-in, opacity 0.5s ease-in'
    },
    hovered: {
      bottom: '4.125em',
      opacity: 0.3,
      transition: 'bottom 0.5s ease-out, opacity 0.5s ease-out',
      [mediaQueries.large]: {
        bottom: '4.625em'
      }
    },
    smallHovered: {
      bottom: '55px',
      opacity: 0.3,
      transition: 'bottom 0.5s ease-out, opacity 0.5s ease-out'
    }
  },
  faces: {
    left: '1.25em',
    position: 'absolute',
    right: '1.25em',
    textAlign: 'right',
    top: '1.125em'
  },
  products: {
    base: {
      position: 'absolute',
      left: '1.25em',
      right: '1.25em',
      bottom: '-4em',
      opacity: 0,
      overflow: 'hidden',
      transition: 'bottom 0.5s ease-in, opacity 0.5s ease-in'
    },
    smallBase: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'flex-start',
      paddingLeft: '1.25em',
      paddingRight: '1.25em',
      boxSizing: 'border-box',
      width: '100%',
      bottom: '-4em',
      opacity: 0,
      overflow: 'hidden',
      transition: 'bottom 0.5s ease-in, opacity 0.5s ease-in'
    },
    hovered: {
      opacity: 1,
      transition: 'bottom 0.5s ease-out, opacity 0.5s ease-out',
      bottom: '1.125em'
    },
    smallHovered: {
      opacity: 1,
      transition: 'bottom 0.5s ease-out, opacity 0.5s ease-out',
      bottom: '10px'
    }
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
    smallBase: {
      borderRadius: '0.125em',
      height: '1.875em',
      display: 'inline-block',
      position: 'relative',
      opacity: 0.98,
      width: '1.875em'
    },
    face: {
      marginLeft: '0.4em'
    },
    product: {
      backgroundColor: 'white',
      marginRight: '0.4em'
    },
    smallProduct: {
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
