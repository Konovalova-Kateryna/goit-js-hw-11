const DEFAULT_PAGE = 10;
let page = DEFAULT_PAGE;
const perPage = 40;

export const resetPage = () => {
    page = DEFAULT_PAGE;
};

export const fetchPictures = (pictureName) => {
    const searchParams = new URLSearchParams({
        key: '28418260-76404dde83faaf67fb91aa638',
        q: pictureName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesaerch: true,
        page,
        per_page: perPage,
        })

    return fetch(`https://pixabay.com/api/?${searchParams}`)
    .then (response => {
            
            return response.json();
    })
        .then(data => {
            page += 1;
            return {
                page,
                pictures: data.hits,
                lastPage: Math.round(data.totalHits / perPage),
                totalHits:data.totalHits,
            }
    })
};