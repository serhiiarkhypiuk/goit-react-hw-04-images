function getImages(imageQuery, page) {
  const API_KEY = '27902479-6e547d16e6e2929c1a5ae9702';

  return fetch(`https://pixabay.com/api/?q=${imageQuery}
        &page=${page}
        &key=${API_KEY}&image_type=photo
        &orientation=horizontal
        &per_page=12`).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`No images regarding ${imageQuery} was found`)
    );
  });
}

const api = { getImages };
export default api;
