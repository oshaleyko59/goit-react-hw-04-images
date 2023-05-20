import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Div } from './styled';
/*
По кліку на елемент галереї повинно відкриватися модальне вікно
з темним оверлеєм і відображатися велика  версія зображення.
 Модальне вікно повинно закриватися по ESC або по кліку на оверлеї.
*/

const modalRoot = document.querySelector('#modal-root');

export function Modal({ src, alt, close }) {

  //effect on mount and unmount
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close]);

  const handleClick = e => {
    if (e.target === e.currentTarget) close();
  };

  return createPortal(
    <Overlay onClick={handleClick}>
      <Div>
        <img src={src} alt={alt} />
      </Div>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
