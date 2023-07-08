import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
// import Button from './Button/Button';
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
      setTheEnd(false);
    }
  };

  // const addCurrentPage = () => {
  //   setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  // }

  const normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL, userImageURL }) => {
      return { id, tags, webformatURL, largeImageURL, userImageURL };
    });
  }

  useEffect(() => {
    if (!searchValue || theEnd) {
      setIsLoading(false);
      return;
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

        setTheEnd(theEnd);

        setImages(prevImages => [...prevImages, ...newData]);
        setTotalHits(data.data.totalHits);
        setIsLoading(false);
        setError(null);

      } catch (error) {
        setHasError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getImagesFromAPI();

  }, [searchValue, currentPage, theEnd])

  //! Infinite scroll - intersectionObserver
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    // return () => {
    //   if (observerTarget.current) {
    //     observer.unobserve(observerTarget.current);
    //   }
    // };
  }, [observerTarget]);


  //================================================================
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery
        images={images}
        searchValue={searchValue}
        totalHits={totalHits} />}
      {isLoading && <Loader />}
      {/* {!theEnd && images.length > 0 && <Button onClick={addCurrentPage} />} */}
      {theEnd && images.length > 0 && <TitleH1 searchValue={"The END"} totalHits={totalHits} />}
      <div className='bottom' ref={observerTarget} />
      {hasError && <ErrorTitle error={error} />}
      <ToastContainer />
    </>)
}