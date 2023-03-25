import axios from 'axios';
// Your API key: 34723681-f0b96f726e7635a8a0d729f9b

export default class PixabayApiService {
  constructor() {}

  async fetchImages(searchQuery) {
    const API_KEY = '34723681-f0b96f726e7635a8a0d729f9b';
    const searchParams = new URLSearchParams({
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&${searchParams}`;

    try {
      const response = await axios.get(BASE_URL);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
