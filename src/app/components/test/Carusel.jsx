import React, { useState, useEffect } from "react";
import StyleCarusel from './carusel.module.css'


const Carusel = ({ 
  endpoint=[], 
  settings = { 
      speed: 1000,
      rows: 1,
      swiperView: 0,
      typeOfTheComponent: 'slider'|| 'carusel',
      autoplay: true || false
  }, 
  styles,}) => {

    const { speed, rows, swiperView, typeOfTheComponent, autoplay } = settings;
    const [ data, setData ] = useState([])

    const [slideIndex, setSlideIndex] = useState(0);
    const slideWidth = 100 / 6;

   
  
    const handlePrevClick = () => {
      setSlideIndex(prevIndex => (prevIndex - 1 + lengthArrayImageFromData) % lengthArrayImageFromData);
    };
  
    const handleNextClick = () => {
      setSlideIndex(prevIndex => (prevIndex + 1) % lengthArrayImageFromData);
    };

    const fetchData = async () => {
      if (endpoint && endpoint.length > 0) {
          try {
              const newData = [];
              for (const endpointItem of endpoint) {
                  const response = await fetch(endpointItem, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                      }
                  });
                  if (!response.ok) throw new Error('Проблемы у тебя с интернетом');
                  const object = await response.json();
                  newData.push(object.data);
              }
             
              setData(newData);
          } catch (error) {
              console.log("Ошибка: ", error);
              throw error;
          }
      }
  };

  const arrayImageFromData = data.flatMap(innerArray => innerArray.map(item => item.img));
  const lengthArrayImageFromData = arrayImageFromData.length
  // Чистый массив картинок
  console.log(arrayImageFromData)
  
  useEffect(() => {
      fetchData()
          .catch(error => {
              console.error('Error:', error);
      });
  },[])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex + 1) % lengthArrayImageFromData);
    }, speed); 

    return () => clearInterval(intervalId);
  }, [lengthArrayImageFromData]);

  const extendedImages = [...arrayImageFromData, ...arrayImageFromData, ...arrayImageFromData];

  return (
    <>
      <div className={StyleCarusel.slider}>
        <div className={StyleCarusel.slides__container} style={{ display: "flex", gap: "20px", transition: 'transform 0.6s ease-in-out', transform: `translateX(-${slideIndex * slideWidth}%)` }}>
            {extendedImages.map((image, index) => (
              <div className={StyleCarusel.slide} key={index}>
                <img 
                  style={{ 
                    maxWidth: "250px", 
                    maxHeight: "200px", 
                    borderRadius: "10px",
                    objectFit: 'cover'
                  }} 
                  src={image} 
                  alt={`Slide ${index + 1}`} 
                />
              </div>
            ))}
        </div>
        <button className={StyleCarusel.prev_btn} onClick={handlePrevClick}>Назад</button>
        <button className={StyleCarusel.pext_btn} onClick={handleNextClick}>Вперед</button>
      </div>
    </>
  );
}

const Dots = ({ length, clicked, active }) => {
  return (
    <ul className="carusel__dots">
      {[...new Array(length)].map((i, idx) => (
        <li
          className={`carusel__dot ${active === idx ? "active" : ""}`}
          key={idx}
          onClick={() => clicked(idx)}
        >
          {idx + 1}
        </li>
      ))}
    </ul>
  );
}

const Button = ({ children, clicked, classes }) => {
  return (
    <button type="button" className={classes} onClick={clicked}>
      {children}
    </button>
  );
}
  


export default Carusel;