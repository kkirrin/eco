
import React, { useState, useEffect } from 'react';
import SliderStyles from './Slider.module.css'

const CarouselIndicators = ({ images, activeIndex, onClick }) => {
  return (
    <div className="carousel__indicators">
      {images.map((_, index) => (
        <span
          key={index}
          className={`carousel__indicator ${
            index === activeIndex ? 'active' : ''
          }`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};
const Slider = ({  
      endpoint=[], 
      settings = { 
          speed: 1000,
          rows: 4,
          swiperView: 0,
          typeOfTheComponent: 'slider'|| 'carusel',
          autoplay: true || false
      }, 
      styles,}) => {

    const { speed, rows, swiperView, typeOfTheComponent, autoplay } = settings;
    const [ data, setData ] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    


    // Получаем данные
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

  console.log(data)

  const arrayImageFromData = data.flatMap(innerArray => innerArray.map(item => item.img));
  console.log(arrayImageFromData)
  
  useEffect(() => {
      fetchData()
          .catch(error => {
              console.error('Error:', error);
      });
  },[])

  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, speed);
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [speed]);

    const nextSlide = () => {
      setActiveIndex((prevIndex) =>
        prevIndex === arrayImageFromData.length - 1 ? 0 : prevIndex + 1
      );
    };
    const prevSlide = () => {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? arrayImageFromData.length - 1 : prevIndex - 1
      );
    };
    return (
      <div className={SliderStyles.carusel} style={{ transition: 'transform 0.6s ease-in-out'}}>
        <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
          &lt;
        </button>
        <img
          style={{ maxWidth: '250px', maxHeight: '200px', borderRadius: '5px' }}
          src={arrayImageFromData[activeIndex]}
          alt={`Slide ${activeIndex}`}
          className="carousel__img"
        />
        <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
          &gt;
        </button>
      </div>
    );
  };
  export default Slider;