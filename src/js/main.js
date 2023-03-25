import PixabayApiService from './fetchImg';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

let searchQuery = '';
const pixApiService = new PixabayApiService();

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value;

  pixApiService.fetchImages(searchQuery);
});
