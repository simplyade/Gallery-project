import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from './components/ImageCard';
import ImageUploadForm from './components/ImageUploadForm';

function App() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = 'http://localhost:8000/api/gallery/';
    if (page > 1) {
      url = `http://localhost:8000/api/gallery/?page=${page}`;
    }
    if (search) {
      url = `http://localhost:8000/api/gallery/search/?q=${search}`;
    }
    axios.get(url)
      .then(response => {
        setImages(response.data.results);
        setFilteredImages(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching images');
        console.error(error);
      });
  }, [page, search]);

  useEffect(() => {
    if (filter === '') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(image => image.title.toLowerCase().includes(filter.toLowerCase())));
    }
  }, [filter, images]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handlePageChange = (pageUrl) => {
    axios.get(pageUrl)
      .then(response => {
        setImages(response.data.results);
        setFilteredImages(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching images');
        console.error(error);
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="gallery">
      <ImageUploadForm />
      <input type="text" value={search} onChange={handleSearch} placeholder="Search" />
      <input type="text" value={filter} onChange={handleFilter} placeholder="Filter by title" />
      {filteredImages && filteredImages.map(image => (
        <ImageCard key={image.id} image={image} />
      ))}
      {prevPage && <button onClick={() => handlePageChange(prevPage)}>Previous</button>}
      {nextPage && <button onClick={() => handlePageChange(nextPage)}>Next</button>}
    </div>
  );
}

export default App;