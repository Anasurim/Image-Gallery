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

  clearGallery();
  pixApiService.query = e.currentTarget.elements.searchQuery.value;
  pixApiService.resetPage();
  pixApiService.fetchImages().then(appendCardMarkup);
}

function onClick() {
  pixApiService.fetchImages().then(appendCardMarkup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function appendCardMarkup(hits) {
  const markUp = hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
        <div class="photo-card">
            <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                </p>
            </div>
        </div>`
  );

  refs.gallery.insertAdjacentHTML('beforeend', markUp.join(''));
}
