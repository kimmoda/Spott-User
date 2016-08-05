export function getScenesForYou () {
  return Promise.resolve([ {
    id: '0',
    image: require('./mock/scenes/suits.png'),
    season: 1,
    episode: 1,
    markers: [ { relativeLeft: 20, relativeTop: 40 } ],
    faces: [],
    products: []
  }, {
    id: '1',
    image: require('./mock/scenes/daredevil.png'),
    seriesLogo: require('./mock/scenes/daredevilLogo.png'),
    season: 3,
    episode: 5,
    markers: [
      { id: 'm1', relativeLeft: 40, relativeTop: 38 },
      { id: 'm2', relativeLeft: 53, relativeTop: 47 },
      { id: 'm3', relativeLeft: 65, relativeTop: 33 },
      { id: 'm4', relativeLeft: 90, relativeTop: 60 }
    ],
    faces: [
      { id: 'f1', name: 'Murdock', image: require('./mock/scenes/murdock.png') },
      { id: 'f2', name: 'Page', image: require('./mock/scenes/page.png') }
    ],
    products: [
      { id: 'p1', name: 'product 1', image: require('./mock/scenes/product1.png') },
      { id: 'p2', name: 'product 2', image: require('./mock/scenes/product2.png') },
      { id: 'p3', name: 'product 3', image: require('./mock/scenes/product3.png') },
      { id: 'p4', name: 'product 4', image: require('./mock/scenes/product4.png') }
    ]
  } ]);
}
