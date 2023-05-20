import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';

export function App() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);
  const [isModalVisible, setModalVIsible] = useState(false);

  const closeModal = () => {
    setModalVIsible(false);
  };

  const openModal = (activeImg) => {
    setActive(activeImg);
    setModalVIsible(true);
  };

  return (
    <>
      <Searchbar onSubmit={query => setQuery(query)} />
      <ImageGallery
        query={query}
        onClick={openModal}
      />
      {isModalVisible && (
        <Modal src={active.src} alt={active.alt} close={closeModal} />
      )}
      <ToastContainer />
    </>
  );
}
