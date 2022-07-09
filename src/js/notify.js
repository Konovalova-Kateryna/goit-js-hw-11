import Notiflix from 'notiflix'

export const emptyRequest = () => { Notiflix.Notify.failure('Please specify your search query.'); };
export const successfulRequest = (total) => { Notiflix.Notify.info(`Hooray! We found ${total} images.`) };
export const endOfSearch = () => { Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.") };
export const failedRequest = () => { Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); };

