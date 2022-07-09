export const createPictureCard = (pictures) => {
return pictures
    .map(
        ({ webformatURL, largeImageURL,tags, likes, views, comments, downloads }) => 
        `<a class="gallery-link" href="${largeImageURL}">
        <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes:</b>${likes}
            </p>
            <p class="info-item">
            <b>Views:</b>${views}
            </p>
            <p class="info-item">
            <b>Comments:</b>${comments}
            </p>
            <p class="info-item">
            <b>Downloads:</b>${downloads}
            </p>
        </div>
        </a>
        `
    )
    .join("");
};
    
