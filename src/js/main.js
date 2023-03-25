import PixabayApiService from './fetchImg';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

const pixApiService = new PixabayApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onClick);

function onSearch(e) {
  e.preventDefault();

  pixApiService.query = e.currentTarget.elements.searchQuery.value;
  pixApiService.resetPage();
  pixApiService.fetchImages();
}

function onClick() {
  pixApiService.fetchImages();
}
