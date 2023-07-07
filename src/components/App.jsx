import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button/Button';
import ErrorTitle from './ErrorTitle';
import TitleH1 from './TitleH1';

import { getImages } from 'services/get_images';

export default function App() {

  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [theEnd, setTheEnd] = useState(false);

  const [error, setError] = useState(false);
  const [hasError, setHasError] = useState(false);

 const handleSubmit = query => {
    if (searchValue !== query) {
      setSearchValue(query);
      setImages([]);
      setCurrentPage(1);
      setTotalHits(0)
    }
  };

  const addCurrentPage = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  }

  const normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL, userImageURL }) => {
      return { id, tags, webformatURL, largeImageURL, userImageURL };
    });
  }

  const getImagesFromAPI = async () => {
    try {
      setIsLoading(true);

      const data = await getImages(searchValue, currentPage);

      // All right 
      if (data.data.hits.length && currentPage === 1) {
        toast.success(<span>Fined {data.data.totalHits} img for value = {searchValue}</span>, {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
      }

      // not found
      if (!data.data.hits.length) {
        return toast.warning(`Sorry image('s) not found...`, {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
      }

      //The End
      let theEnd = false;
      if (!data.data.hits.length || data.data.hits.length < 12) theEnd = true;

      const newData = normalizedData(data.data.hits);

      setImages(prevImages => [...prevImages, ...newData]);
      setTotalHits(data.data.totalHits);
      setTheEnd(theEnd);
      setIsLoading(false);
      setError(null);

    } catch (error) {
      setHasError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchValue) return;

    getImagesFromAPI();

  }, [searchValue, currentPage])

  //================================================================

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery
        images={images}
        searchValue={searchValue}
        totalHits={totalHits} />}
      {isLoading && <Loader />}
      {!theEnd && images.length > 0 && <Button onClick={addCurrentPage} />}
      {theEnd && images.length > 0 && <TitleH1 searchValue={"The END"} totalHits={totalHits} />}
      {hasError && <ErrorTitle error={error} />}
      <ToastContainer />
    </>)
}