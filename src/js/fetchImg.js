import axios from 'axios';

// Your API key: 34723681-f0b96f726e7635a8a0d729f9b

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const API_KEY = '34723681-f0b96f726e7635a8a0d729f9b';
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&${searchParams}`;

    try {
      const response = await axios.get(BASE_URL);
      console.log(response.data);

      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    return (this.page += 1);
  }

  resetPage() {
    return (this.page = 1);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
