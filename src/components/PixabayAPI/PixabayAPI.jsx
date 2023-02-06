import axios from 'axios';

const KEY_API_PIXABAY = '31525078-c25aa98820f24120add7be3d2';
const URL_BASE = 'https://pixabay.com/api/';

export const getImgagesAPI = async (querySearch, page) => {
  const response = await axios.get(`${URL_BASE}?q=${querySearch}&page=${page}&key=${KEY_API_PIXABAY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
}