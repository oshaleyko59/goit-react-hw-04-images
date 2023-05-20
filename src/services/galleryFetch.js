/* Для бекенду використовуй публічний API сервісу Pixabay.
  NB! If you make use of the API, show your users where the images and videos are from,
      whenever search results are displayed.
  NB! once you go over the rate limit you will receive an HTTP error 429 ("Too Many Requests")
      with the message "API rate limit exceeded" - done by throttling requests.

  Список параметрів рядка запиту:
  + key - унікальний ключ доступу до API
  + q - hint для пошуку(from input)
  + image_type - тип зображення (тільки фотографії -> photo).
  + orientation - орієнтація фотографії -> horizontal.
  * safesearch - фільтр за віком. Постав значення true.

    Пагінація - параметри page і per_page.

    Example from Doc:
https://pixabay.com/api/?key=34354897-5c7498590c159fab15c37271f&q=yellow+flowers&image_type=photo
 */

/* Для HTTP-запитів використана бібліотека axios.
Використовується синтаксис async/await. */

import axios from 'axios';

const BASIC_URL = 'https://pixabay.com/api';
const MY_KEY = '34354897-5c7498590c159fab15c37271f';

const instance = axios.create({
  baseURL: BASIC_URL,
  timeout: 2000,
});

const SEARCH_PARAMS = {
  key: `${MY_KEY}`,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

let prevPage = 1;

async function fetchGallery(query, page = prevPage + 1) {
  const searchParams = new URLSearchParams({
    ...SEARCH_PARAMS,
    q: `${query}`,
    page: `${page}`,
  });
  //console.log('page query', page, query);
  prevPage = page;
  const r = await instance.get(`/?${searchParams}`);
  return r.data;
}

const api = { fetchGallery };
export default api;
