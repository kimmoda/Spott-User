import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import $ from 'npm-zepto';
import { colors } from '../../../_common/buildingBlocks';
import { slowdown } from '../../../../utils';
// import PopularNearYou from './popularNearYou';
// import { homeSelector } from '../selectors';
// import * as actions from '../actions';
import './style.css';

const state = {
  baseUrl: 'https://spott-ios-rest-prd.appiness.mobi/rest',
  currentFingerprintId: '',
  videos: {
    'Fifty Shades Of Grey (Trailer)': {
      videoUrl: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_en/1080p/index.m3u8',
      fingerprintId: '49109C7A34C0AD9C'
    }
  }
};

function transformProduct (product) {
  return {
    brand: product.brand && { id: product.brand.uuid, name: product.brand.name },
    buyUrl: product.buyUrl,
    id: product.uuid,
    image: product.image && { id: product.image.uuid, url: product.image.url },
    price: product.price, // amount & currency
    shortName: product.shortName
  };
}
function transformSceneDetails (sceneDetails) {
  return {
    index: sceneDetails.index,
    products: sceneDetails.products.data.map(transformProduct)
  };
}
function get (url, callback) {
  $.ajax({
    url: url,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    headers: { 'api_key': 'EbQzeWS7VzRTYd8ZhhB5nwwZZGpC6BruJpWQDC3Ynd3TwFCtfe6MJMFNu9' },
    success: function (result) {
      callback(null, result);
    },
    error: function (error) {
      console.error('Error loading data.');
      console.dir(error);
      callback(error);
    }
  });
}

function getSceneDetails (currentOffsetInSeconds, callback) {
  get(state.baseUrl + '/v003/video/fingerprints?type=MUFIN&fingerprintId=' + state.fingerprintId + '&videoOffsetInSeconds=' + currentOffsetInSeconds, function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(null, result && result.length === 1 && transformSceneDetails(result[0].sceneDetails));
  });
}

const currencies = {
  EUR: '€',
  GBP: '£',
  USD: '$'
};

function formatPrice (price) {
  if (price) {
    // Try to use symbol.
    const currency = currencies[price.currency];
    if (currency) {
      return currency + ' ' + price.amount.toFixed(2);
    }
    return price.amount.toFixed(2) + ' ' + price.currency;
  }
  return 'Buy';
}
function renderProductDetails (product) {
  const html = (
    '<div class="line"></div>' +
    '<div class="productContainer">' +
      '<div class="productImageContainer">' +
        '<img src="' + (product.image && product.image.url) + '?height=160&width=160" />' +
      '</div>' +
      '<div class="productOverview">' +
        '<h1>' + product.shortName + '</h1>' +
        (product.brand ? '<h2>' + product.brand.name + '</h2>' : '') +
        (product.buyUrl
          ? '<a class="buyButton" href="' + product.buyUrl + '" target="_blank">' + formatPrice(product.price) + '</a>'
          : '') +
      '</div>' +
    '</div>'
  );
  return $(html);
}

function renderProduct (product) {
  const html = (
    '<div>' +
      '<a href="#" title="' + product.shortName + '">' +
        '<img class="subtileImage" src="' + (product.image && product.image.url) + '?height=96&width=96" />' +
      '</a>' +
    '</div>'
  );

  const $product = $(html);
  // On mouse enter product, show product details.
  $product.on('mouseenter', function () {
    const $productDetails = renderProductDetails(product);
    // Deselect product tile.
    $('.productTiles div').removeClass('productTileSelected');
    // Select product tile.
    $product.addClass('productTileSelected');
    // Add to DOM, hidden.
    $('#productDetails').html($productDetails);
    // Animate, fade in.
    $('#productDetails').addClass('productDetailsShow');
  });

  return $product;
}

function renderSceneDetails (sceneDetails, player) {
  const html = (
    '<div class="sceneDetails">' +
      '<div class="productTiles"></div>' +
      '<div id="productDetails"></div>' +
    '</div>'
  );

  const $sceneDetails = $(html);
  const $productTiles = $sceneDetails.find('.productTiles');
  for (let i = 0; i < sceneDetails.products.length; i++) {
    $productTiles.append(renderProduct(sceneDetails.products[i]));
  }

  // When hovering over the product tiles, we enlarge the tiles and show background.
  $productTiles.on('mouseenter', function () {
    // Enlarge product tiles.
    $productTiles.addClass('productTilesLarge');
    // We add an black overlay when hovering, so the text is clearly visible.
    $('#videoOverlay').addClass('videoOverlayShow');
    if (!player.paused) {
      player.pause();
    }
  });

  $sceneDetails.on('mouseleave', function () {
    // Deselect product tile.
    $('.productTiles div').removeClass('productTileSelected');
    // Fade out product details.
    $('#productDetails').removeClass('productDetailsShow');
    // Make product tiles smaller.
    $productTiles.removeClass('productTilesLarge');
    // Remove overlay.
    $('#videoOverlay').removeClass('videoOverlayShow');
    if (player.paused) {
      player.play();
    }
  });

  return $sceneDetails;
}

const getSceneDetailsSlowdown = slowdown(getSceneDetails, 1000);

@Radium
export default class Videos extends Component {

  static propTypes = {
  };

  constructor (props) {
    super(props);
    this.state = {
      video: state.videos['Fifty Shades Of Grey (Trailer)']
    };
  }

  changeVideo (video) {
    // Destroy theoplayer.
    theoplayer.destroy('video');
    this.setState({ video });

    setTimeout(() => {
      console.warn('Current video url:', video.videoUrl);
      console.warn('Current fingerprintId:', video.fingerprintId);

      // $('#videoContainer').html('');

      const player = theoplayer(document.getElementById('video'));

      player.addEventListener('initialized', () => {
        // Insert the overlay into the generated HTML of the OpenTelly player.
        // There was no immediate workarround to get it working on Firefox/IE in fullscreen mode.
        $('#video > div:nth-child(2)').after('<div id="videoOverlay"></div><div id="videoContent"></div>');

        // Track offset changes in the video.
        let previousOffsetInSeconds = 0;

        function timeupdate () {
          // Fetch and display the scene info if we have a different scene.
          const currentOffsetInSeconds = Math.round(player.currentTime || 0);

          if (currentOffsetInSeconds !== previousOffsetInSeconds && $('#videoContent').find('.productTilesLarge').length === 0) {
            previousOffsetInSeconds = currentOffsetInSeconds;
            getSceneDetailsSlowdown(currentOffsetInSeconds, function (err, sceneDetails) {
              if (err || !sceneDetails) {
                return;
              }
              // Only update DOM if we are the product details are not shown.
              if ($('#videoContent').find('.productTilesLarge').length === 0) {
                // $('#info').html('<pre>' + JSON.stringify(sceneDetails, null, 4) + '</pre>');
                const $sceneDetails = renderSceneDetails(sceneDetails, player);
                // Detaches event listeners.
                $('#videoContent').html($sceneDetails);
              }
            });
          }
        }

        player.addEventListener('timeupdate', timeupdate);
      }); // initialized
    });
  }

  componentDidMount () {
    theoplayer.onReady = () => {
      this.changeVideo(state.videos['Fifty Shades Of Grey (Trailer)']);
    };
  }

  static styles = {
    container: {
      width: '100%'
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // minHeight: 400
    }
  };

  render () {
    const styles = this.constructor.styles;
    const style = this.props.style;
    const video = this.state.video;

    return (
      <div style={[ styles.container, style ]}>
        <div id='videoContainer'>
          <video id='video' controls>
            <source src={video.videoUrl} />
          </video>
        </div>
        <div id='info'></div>
      </div>
    );
  }

}
