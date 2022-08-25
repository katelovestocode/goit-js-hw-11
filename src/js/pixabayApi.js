import axios from 'axios';

const API_KEY = '29432108-cac2e2e1a5a7f25b3217a8a0e';

const OPTIONS = '&image_type=photo&orientation=horizontal&safesearch=true';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(searchQuery, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}${OPTIONS}&page=${page}&per_page=${perPage}`
  );

  return response;
}

export { fetchImages };

/**
 * 
 * without async/await and without axios.get 
 * 
export function fetchImages(searchQuery, page, perPage) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}${OPTIONS}&page=${page}&per_page=${perPage}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

 */
