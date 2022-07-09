import './css/styles.css';

import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"

import { createPictureCard } from './js/create_card';
import { emptyRequest, successfulRequest, endOfSearch, failedRequest } from './js/notify';
import { fetchPicturesAsync, resetPage } from './js/fetchPictures_async';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const goToBtn = document.querySelector('.up-btn');
let searchQuery = "";

searchForm.addEventListener('submit', onSearch);
goToBtn.addEventListener('click', goToStart);

let gall = new SimpleLightbox('.gallery a', {
        
});
window.addEventListener('scroll', () => {
    if (scrollY > 300) {
        goToBtn.classList.remove('is-hidden');
    } else if (scrollY < 300) {
        goToBtn.classList.add('is-hidden')
    }
});

function goToStart(evt) {
    evt.preventDefault();
    window.scrollTo(0,0);
}

function onSearch(evt) {
    evt.preventDefault();

    searchQuery = evt.currentTarget.elements.searchQuery.value.trim();

    if (searchQuery === "") {
        emptyRequest();
        return;
    }
    resetPage();
    getGalleryMarkup()
}

async function getGalleryMarkup() {
    try {
        const galleryPage = await fetchPicturesAsync(searchQuery);
        const markup = galleryPage.pictures;
        const totalHits = galleryPage.totalHits;
       
         if (markup.length === 0) {
            failedRequest();
            galleryContainer.innerHTML = "";
            searchForm.reset();
            return;
        }
        galleryContainer.innerHTML = createPictureCard(markup);
        successfulRequest(totalHits);
        gall.refresh();
        toObserve();
        searchForm.reset();
    
    }
    catch (error) { console.log(error.message) };
};

async function onLoadMore() {
    try {
        const newGalleryPage = await fetchPicturesAsync(searchQuery);
        const page = newGalleryPage.page;
        const markup = newGalleryPage.pictures;
        const lastPage = newGalleryPage.lastPage;
        if(page > lastPage) {
        observer.unobserve(document.querySelector('.scroll-area'));
            endOfSearch();
            return;
        }
        galleryContainer.insertAdjacentHTML('beforeend', createPictureCard(markup));
        gall.refresh();
                
    } catch (error) {
        console.log(error.message);
    }
    
};
    
const options = {
    rootMargin: "200px",
    threshold: 1.0,
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            onLoadMore();
            
            console.log('INTERSECTION!!!');
        }
    });
}, options);
function toObserve() {     
        observer.observe(document.querySelector('.scroll-area'));
}

galleryContainer.addEventListener('click', galleryContainerClick);

function galleryContainerClick(evt) {
    evt.preventDefault();

        if (!evt.target.dataset.source) {
        return;
        }
    console.log(galleryContainer);
    };

