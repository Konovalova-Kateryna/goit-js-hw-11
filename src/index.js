import './css/styles.css';
import Notiflix from 'notiflix'
import SimpleLightbox from 'simplelightbox';

import { fetchPictures, resetPage } from './js/fetch_pictures';
import { createPictureCard } from './js/create_card';


const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = "";

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
    evt.preventDefault();

    searchQuery = evt.currentTarget.elements.searchQuery.value;

    if (searchQuery === "") {
        Notiflix.Notify.failure('Пустая строка. Что будем искать?')
    }
    resetPage();
    loadMoreBtn.classList.remove('is-visible');

    fetchPictures(searchQuery).then(({ pictures, totalHits }) => {
        if (pictures.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            searchForm.reset();
            return
        }
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
        galleryContainer.innerHTML = createPictureCard(pictures);
        loadMoreBtn.classList.add('is-visible');
        
        })
};

function onLoadMore() {

    fetchPictures(searchQuery).then(({page, pictures, lastPage}) => {
        galleryContainer.insertAdjacentHTML('beforeend', createPictureCard(pictures));
        if(page === lastPage) {
            loadMoreBtn.classList.remove('is-visible');
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        }
    });
};


