import PixabayApiService from './fetchImg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import InfiniteScroll from 'infinite-scroll';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
});

const pixApiService = new PixabayApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onClick);

function onSearch(e) {
  e.preventDefault();

  pixApiService.query = e.currentTarget.elements.searchQuery.value;

  if (pixApiService.query === '') {
    return Notify.failure('Write something!');
  }

  pixApiService.resetPage();
  pixApiService.fetchImages().then(hits => {
    clearGallery();
    appendCardMarkup(hits);

    if (hits.totalHits > 40) {
      refs.loadBtn.classList.remove('is-hidden');
    }

    if (hits.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    }

    Notify.info(`Hooray! We found ${hits.totalHits} images.`);
  });
}

function onClick() {
  pixApiService.fetchImages().then(hits => {
    appendCardMarkup(hits);

    if (hits.hits.length < 40) {
      refs.loadBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function appendCardMarkup(data) {
  const markUp = data.hits.map(
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

  lightbox.refresh();
}
