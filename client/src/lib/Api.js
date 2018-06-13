import axios from 'axios';

// TODO: Move duplicated function to common lib
function sanitize(input) {
  // Allow only 30 hyphens, letters, or numbers
  // We could also use encodeURIComponent() but
  // this also gives us a smaller, better search string
  const maxLength = 30;
  return input.substring(0, maxLength).replace(/[^a-zA-Z0-9\-]+/g, '');
}

export function searchApi(searchString) {
  return new Promise((resolve, reject) => {
    const search = sanitize(searchString);

    axios.get(`/api/v1/getProducts?search=${search}`)
      .then((response) => {
        console.log(response);
        if( response.status === 200 ) {
          return resolve(response.data.results)
        }

        return reject('Something went terribly wrong');
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
