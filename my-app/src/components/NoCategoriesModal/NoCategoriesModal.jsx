import React from 'react';
import Modal from 'react-modal';

const customModalStyle = {
  overlay: {
    backgroundColor: 'blue',
  },
  content: {
    width: '300px',
    height:"100px",
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
};

const NoCategoriesModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyle}
      contentLabel="No Categories Found"
    >
      <div>
        <p>Categories not found</p>
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default NoCategoriesModal;
