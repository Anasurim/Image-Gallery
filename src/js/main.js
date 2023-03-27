import PixabayApiService from './fetchImg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

async function onSearch(e) {
  e.preventDefault();

  pixApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (pixApiService.query === '') {
    return Notify.failure('Write something!');
  }

  pixApiService.resetPage();

  try {
    const hits = await pixApiService.fetchImages();

    clearGallery();
    appendCardMarkup(hits);

    if (hits.totalHits > 40) {
      showLoadBtn();
    }

    if (hits.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      hideLoadBtn();
      return [];
    }

    if (hits.hits.length < 40) {
      hideLoadBtn();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    Notify.info(`Hooray! We found ${hits.totalHits} images.`);
  } catch (error) {
    console.log('Error:', error);
  }
}

async function onClick() {
  try {
    const hits = await pixApiService.fetchImages();

    appendCardMarkup(hits);

    if (hits.hits.length < 40) {
      hideLoadBtn();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showLoadBtn() {
  return refs.loadBtn.classList.remove('is-hidden');
}

function hideLoadBtn() {
  return refs.loadBtn.classList.add('is-hidden');
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
