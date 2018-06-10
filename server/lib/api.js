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
  const sanitizedSearch = sanitize(searchString);
  const searchUri = `https://www.mec.ca/api/v1/products/search?keywords=${sanitizedSearch}`;

  return axios.get(searchUri).then( response => {
    // console.log(response.data);
    // TODO: handle fewer than 5 elements
    if( response.data.products ) {
      return response.data.products.slice(0, 5);
    }
    
    return [];
  });
}


function getColoursFromProduct(product) {
  return new Promise((resolve, reject) => {
    resolve({
      name: product.name,
      imageUri: product.default_image_urls.main_image_url,
      dominantColours: [

      ],
    });
  });
}



module.exports.search = function( searchString ) {
  return getProducts(searchString).then( products => {

    // For each product, get the image, and the dominant colours

    return Promise.all(products.map(getColoursFromProduct));
  });
}
