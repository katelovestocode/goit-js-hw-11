import './css/styles.css';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabayApi';
import { galleryTemplateMarkup } from '../templates/galleryTemplate';

let simpleLightBox = new SimpleLightbox('.gallery a');

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

const perPage = 40;
let page = 1;
let searchQuery = '';

form.addEventListener('submit', onSubmitRequest);
buttonLoadMore.addEventListener('click', onLoadMore);

function onSubmitRequest(event) {
  event.preventDefault();

  page = 1;
  gallery.innerHTML = '';
  buttonLoadMore.classList.add('is-hidden');

  searchQuery = event.target.elements.searchQuery.value.trim();

  console.log(searchQuery);

  if (searchQuery !== '') {
    fetchImages(searchQuery, page, perPage)
      .then(({ data }) => {
        if (data.totalHits === 0) {
          Notiflix.Notify.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          renderImagesCard(data.hits);

          simpleLightBox.refresh();

          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

          if (data.totalHits > perPage) {
            buttonLoadMore.classList.remove('is-hidden');
          }
        }
      })
      .catch(onFetchError)
      .finally(() => {
        form.reset();
      });
  }
}

function onLoadMore() {
  page += 1;

  fetchImages(searchQuery, page, perPage)
    .then(({ data }) => {
      renderImagesCard(data.hits);

      simpleLightBox.refresh();

      let totalPages = Math.floor(data.totalHits / perPage);

      if (page > totalPages) {
        buttonLoadMore.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(onFetchError)
    .finally(() => {
      form.reset();
    });
}

function renderImagesCard(data) {
  gallery.innerHTML = galleryTemplateMarkup(data);
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, something went wrong');
  console.log(error.message);
}
