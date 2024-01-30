import axios from 'axios';

const apiKey =
  'live_wED34rSyYeYGlQ9JmDOVxzbZDqONfhDvdHu9jeVO9ToVlQkY3hWLqNqDhe3j9r8x';

  axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error returning cat by breed:', error);
      throw error;
    });
}
