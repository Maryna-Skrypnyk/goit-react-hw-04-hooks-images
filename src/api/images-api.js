import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '22687504-cd17fd3731d2b66e1d47a182f',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const fetchImages = async (searchQuery, page) => {
  try {
    const { data } = await axios.get('', {
      params: {
        q: searchQuery,
        page,
      },
    });
    return data.hits;
  } catch (error) {
    return [];
  }
};

// return fetch(url).then(response => {
//   if (response.ok) {
//     return response.json();
//   }
//   return Promise.reject(new Error(`No images for request ${searchQuery}`));
// });

const imagesAPI = {
  fetchImages,
};

export default imagesAPI;
