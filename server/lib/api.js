const axios = require('axios');


// TODO: Move duplicated function to common lib
function sanitize(input) {
  // Allow only 30 hyphens, letters, or numbers
  // We could also use encodeURIComponent() but
  // this also gives us a smaller, better search string
  const maxLength = 30;
  return input.substring(0, maxLength).replace(/[^a-zA-Z0-9\-]+/g, '');
}


function getProducts(searchString) {
  // Create the search string
  const sanitizedSearch = sanitize(searchString);
  const searchUri = `https://www.mec.ca/api/v1/products/search?keywords=${sanitizedSearch}`;

  return axios.get(searchUri).then( response => {
    // If we got something back
    if( response.data.products ) {
      return response.data.products.slice(0, 5);
    }

    return [];
  });
}


function getDominantColours(imageUri) {

  // Replace the image base root with the imgix
  const searchUri = `${imageUri.replace('cdn.mec.ca', 'mec.imgix.net')}?palette=json&colors=3`;

  // For each colour, return the hex
  return axios.get(searchUri).then( response => {
    if( response.status === 200 ) {
      return response.data.colors.map((colour) => {
        return colour.hex;
      });
    }

    return [];
  });
}


function parseProduct(product) {
  const smallImageUri = product.default_image_urls.small_image_url;
  const imageUri = product.default_image_urls.main_image_url;

  return getDominantColours(imageUri).then( colours => {
    return {
      name: product.name,
      imageUri,
      colours,
    };
  });
}



function search( searchString ) {
  return getProducts(searchString).then( products => {
    // For each product, get the image, and the dominant colours
    return Promise.all(products.map(parseProduct));
  });
}


module.exports.sanitize = sanitize;
module.exports.getProducts = getProducts;
module.exports.getDominantColours = getDominantColours;
module.exports.parseProduct = parseProduct;
module.exports.search = search;
