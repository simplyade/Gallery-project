import React from 'react';
import axios from 'axios';

const ImageDeleteButton = ({ imageId }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/gallery/images/${imageId}/`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default ImageDeleteButton;