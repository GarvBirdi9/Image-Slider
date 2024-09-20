import { useEffect, useState } from "react";
import "./style.css";

export default function ImageSlider({ url, page, limit }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setLoading(false);
        setImages(data);
      }
    } catch (e) {
      setLoading(false);
      setErrorMsg(e.message);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading.. please wait</div>;
  }

  if (errorMsg !== "") {
    return <div> error occurred {errorMsg}</div>;
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  return (
    <>
      <div className="container">
        <button onClick={() => handlePrevious()} className="arrow arrow-left">
          Back
        </button>
        {images && images.length
          ? images.map((imageItem, index) => (
              <img
                key={imageItem.id}
                alt={imageItem.download_url}
                src={imageItem.download_url}
                className={
                  currentSlide === index
                    ? "current-image"
                    : "current-image hide"
                }
              />
            ))
          : null}
        <button onClick={() => handleNext()} className="arrow arrow-right">
          Next
        </button>
        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  onClick={() => setCurrentSlide(index)}
                  className={
                    currentSlide === index
                      ? "current-indicator"
                      : "current-indicator inactive"
                  }
                  key={index}
                ></button>
              ))
            : null}
        </span>
      </div>
    </>
  );
}
