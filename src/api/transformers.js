
/**
  * @returnExample
  * {
  *   available: true,
  *   buyUrl,
  *   id,
  *   image,
  *   price: { amount, currency },
  *   shareUrl,
  *   shortName
  * }
  */
export function transformProduct ({ available, buyUrl, image, price, shortName, shareUrl, uuid: id }) {
  return {
    available,
    buyUrl,
    id,
    image: image && image.url,
    price,
    shareUrl,
    shortName
  };
}
