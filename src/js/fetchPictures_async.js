import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const DEFAULT_PAGE = 1;
let page = DEFAULT_PAGE;
const perPage = 40;

export const resetPage = () => {
    page = DEFAULT_PAGE;
    window.scrollTo(0, 0);
};

export const fetchPicturesAsync = async (pictureName) => {
    const searchParams = new URLSearchParams({
        key: '28418260-76404dde83faaf67fb91aa638',
        q: pictureName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesaerch: true,
        page,
        per_page: perPage,
    })
    
    const response = await axios.get(`/?${searchParams}`);
    page += 1;
    
    return {    page,
                pictures: response.data.hits,
                lastPage: response.data.totalHits / perPage,
                totalHits: response.data.totalHits,
            }
}