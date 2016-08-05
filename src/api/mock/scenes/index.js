export default [ {
  id: '0',
  image: require('./suits.png'),
  season: 1,
  episode: 1,
  markers: [ { relativeLeft: 20, relativeTop: 40 } ],
  faces: [],
  products: []
}, {
  id: '1',
  image: require('./daredevil.png'),
  seriesLogo: require('./daredevilLogo.png'),
  season: 3,
  episode: 5,
  markers: [
    { id: 'm1', relativeLeft: 40, relativeTop: 38 },
    { id: 'm2', relativeLeft: 53, relativeTop: 47 },
    { id: 'm3', relativeLeft: 65, relativeTop: 33 },
    { id: 'm4', relativeLeft: 90, relativeTop: 60 }
  ],
  faces: [
    { id: 'f1', name: 'Murdock', image: require('./murdock.png') },
    { id: 'f2', name: 'Page', image: require('./page.png') }
  ],
  products: [
    { id: 'p1', name: 'product 1', image: require('./product1.png') },
    { id: 'p2', name: 'product 2', image: require('./product2.png') },
    { id: 'p3', name: 'product 3', image: require('./product3.png') },
    { id: 'p4', name: 'product 4', image: require('./product4.png') }
  ]
} ];
