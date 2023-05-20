import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { ImageGalleryItem, Gallery, Img, Div, Err } from './styled';
import galleryApi from 'services/galleryFetch';

/*
У відповіді від апі приходить масив об'єктів, в яких цікаві:
*id - унікальний ідентифікатор
*webformatURL - посилання на маленьке зображення для списку карток
*largeImageURL - посилання на велике зображення для модального вікна */

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery({ query, onClick }) {
  //to use for render
  const [status, setStatus] = useState(STATUS.IDLE);
  const [gallery, setGallery] = useState([]);
  //to show loadmore btn
  const [more, setMore] = useState(false);
  //for fetch error
  const [error, setError] = useState(null);
  //to initiate new fetch
  const [newSearch, setNewSearch] = useState(false);

  useEffect(() => {
    if (!newSearch) return;

    const { p, q } = newSearch;
    if (!q) {
      return;
    }

    setNewSearch(null);
    setStatus(STATUS.PENDING);

    galleryApi
      .fetchGallery(q, p)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          return Promise.reject(new Error(`Nothing found for "${q}`));
        }

        setGallery([...gallery, ...hits]);

        setMore(totalHits - gallery.length - hits.length > 0);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        setStatus(STATUS.REJECTED);
        setError(error);
        setGallery([]);
      });
  }, [newSearch, gallery]);

  useEffect(() => {
    setGallery([]);
    setNewSearch({ q: query, p: 1 });
  }, [query]);

  const loadMore = () => {
    setNewSearch({ q: query });
  };

  const handleClickItem = ind => {
    const { largeImageURL, tags } = gallery[ind];
    onClick({ src: largeImageURL, alt: tags });
  };

  return (
    <Div>
      {status === STATUS.REJECTED && <Err>{error.message}"</Err>}
      {status !== STATUS.IDLE && (
        <Gallery>
          {gallery.map(({ id, webformatURL, tags }, index) => {
            return (
              <ImageGalleryItem key={id} onClick={() => handleClickItem(index)}>
                <Img src={webformatURL} alt={tags} loading="lazy" />
              </ImageGalleryItem>
            );
          })}
        </Gallery>
      )}
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED && more && <Button loadMore={loadMore} />}
    </Div>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
