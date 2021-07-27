import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: '21915448-ca2a23b845d7ec90c85800139',
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
