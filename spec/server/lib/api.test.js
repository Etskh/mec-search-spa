const nock = require('nock');
const api = require('../../../server/lib/api' );

const bikeFixtures = require('../../fixtures/bikes.json');
const bikeApiFixtures = require('../../fixtures/apiBikes.json');

describe( "API testing", () => {

  it( ":sanitize a string", () => {
    expect( api.sanitize( 'hello everyone' ) ).toBe( 'helloeveryone' );
    expect( api.sanitize( '<>*$&#(@ )' )).toBe( '' );
    expect( api.sanitize( '123' )).toBe( '123' );
  });

  it( ":getMecProducts gets top 5 products", () => {
    //https://www.mec.ca/api/v1/products/search?keywords=bike
    const mecBikes = nock('https://www.mec.ca')
      .get('/api/v1/products/search?keywords=bike')
      .reply(200, bikeFixtures);

    return api.getMecProducts('bike').then( results => {
      expect(results).toEqual(bikeFixtures.products.slice(0, 5));
    });
  });

  it( ":getMecProducts will return an empty array if there are no results", () => {
    const mecBikes = nock('https://www.mec.ca')
      .get('/api/v1/products/search?keywords=nothing')
      .reply(200, {
        products: [],
      });

    return api.getMecProducts('nothing').then( results => {
      expect(results).toEqual([]);
    });
  });

  it(":getDominantColours will return 3 colours from the API", () => {

    const imageUriRoot = 'https://cdn.mec.ca'
    const imageUriPath = '/medias/sys_master/fallback/fallback/8968417181726/5059557-GRT01-fallback.jpg';
    const mecBikes = nock('https://mec.imgix.net')
      .get(imageUriPath + '?palette=json&colors=3')
      .reply(200, {
        colors: [{
          hex: '0x00DEAD',
        }, {
          hex: '0x00DEAD',
        }, {
          hex: '0x00DEAD',
        }],
      });

    return api.getDominantColours(imageUriRoot + imageUriPath).then( colours => {
      expect(colours).toEqual([
        '0x00DEAD', '0x00DEAD', '0x00DEAD',
      ]);
    });
  });
});
