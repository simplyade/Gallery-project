
import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setPreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!image) {
      setError('Please select an image');
      setLoading(false);
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(image.type)) {
      setError('Only JPEG and PNG images are allowed');
      setLoading(false);
      return;
    }

    if (image.size > 1024 * 1024 * 5) {
      setError('Image size should be less than 5MB');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);

    axios.post('http://localhost:8000/api/gallery/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      setTitle('');
      setImage(null);
      setPreview(null);
      setDescription('');
      setLoading(false);
      setSuccess('Image uploaded successfully!');
    })
    .catch(error => {
      console.error(error);
      setError('Error uploading image');
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="image-upload-form">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        className="input-field"
      />
      <input
        type="file"
        onChange={handleImageChange}
        className="input-field"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        className="textarea-field"
      />
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
};

export default ImageUploadForm;