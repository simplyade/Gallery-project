import React, { useState } from 'react';
import axios from 'axios';

const ImageCard = ({ image, setImages, images }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);

  const handleEdit = () => {
    axios.patch(`http://localhost:8000/api/gallery/images/${image.id}/`, {
      title,
      description,
    })
    .then(response => {
      console.log(response.data);
      setIsEditing(false);
      setImages(images.map(img => img.id === image.id ? response.data : img));
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/gallery/images/${image.id}/`)
    .then(() => {
      setImages(images.filter(img => img.id !== image.id));
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{image.title}</h2>
          <p>{image.description}</p>
          <img src={image.image} alt={image.title} />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ImageCard;