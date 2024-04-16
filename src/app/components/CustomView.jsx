import React, {useState, useEffect} from "react";
import Image from 'next/image';
import productStyles from '@/app/css/product.module.css';




// Принимает точку для API запроса
// settings - скорость, число элементов в строке, есть ли автопроигрывание, отображение
// Последнее - файл со стилями для основного контейнера
export const CustomView = ({
        data, 
        endpoint, 
        settings = { 
            speed: 0,
            rows: 4,
            swiperView: 0,
            typeOfTheComponent: 'slider'|| 'carusel',
            autoplay: true || false
        }, 
        styles}) => {


    
    const { speed, rows, swiperView, typeOfTheComponent, autoplay } = settings;
    const [ speedSlider, setSpeedSlider ] = useState(speed)
    const [selectedImages, setSelectedImages] = useState(0);
    const [ items, setItems] = useState([]);
    const [ mobile, setMobile ] = useState(null);
    const [selectSlide, setSelectSlide] = useState(0)

    const [ data2, setData ] = useState()
    const fetchData = async () => {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            if (!response.ok) throw new Error('Проблемы у тебя с интернетом')
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log("Ошибка: ", error)
            throw error
        }
    }
    
    useEffect(() => {
        fetchData()
            .then(data => {
                console.log('Data:', data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    })

    useEffect(() => {
        const checkScreenSize = () => {
            setMobile(window.innerWidth < 500)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []); 

    // Заполнение items
    useEffect(() => {
        setItems(data[0])
    }, []);


    // Функция для прокрутки
    const handleWheel = (e) => {
        const container = e.currentTarget;
        const isInContainer = container.contains(e.target);

        if(isInContainer) {
            e.preventDefault()
            const scrollAmount = e.deltaY < 0 ? -speed : speed;
            container.scrollLeft += scrollAmount;
        }
    }

    //Автопроигрывание
    const nextSlide = () => {
        if(!data) return false
        if(selectSlide < data.length - 1) {
            setSelectSlide(selectSlide + 1);
        } else {
            setSelectSlide(0);
        }
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, speedSlider);
    
        return () => clearInterval(interval);
    },[autoplay, nextSlide, speedSlider]);



   // Функция для перехода к следующему элементу в карусели
    const nextElementCarousel = () => {
        setSelectedImages((prevIndex) => (prevIndex + 1) % data.length);
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(nextElementCarousel, speed);
            return () => clearInterval(interval);
        }
    }, [autoplay, selectedImages]);
        
      
    useEffect(() => {
        const handleDocumentWheel = (e) => {
            const container = document.querySelector(`.${productStyles.slidersThumbs}`); 
            if(container && container.contains(e.target)) {
                handleWheel(e);
            }
        }
        document.addEventListener('wheel', handleDocumentWheel, { passive: false });
        return () => {
            document.removeEventListener('wheel', handleDocumentWheel);
        }
    }, [])

    useEffect(() => {

    },[selectedImages])

    


    return (
        <>  
            {/* Каруселька */}
            {typeOfTheComponent === 'carusel' && (
                (!data || data.length === 0 ) 
                    ? 
                        <div>
                            Загрузка...
                        </div>
                    : 
                        <div>
                            {
                                (data && Array.isArray(data))
                                    ? 
                                    <>
                                      <div className={`${productStyles.sliderThumbs}`} style={{ overflow: 'auto', display: 'grid', gap: '20px', gridTemplateColumns: `repeat(${rows}, 1fr)` }}>
                                            {
                                                (data && Array.isArray(data) && data[1]) ? (
                                                    data.map((item, index) => {
                                                    
                                                        return (



                                                            <div
                                                                key={index}
                                                                onClick={(evt) => {
                                                                    if (!mobile) {
                                                                        console.log('мобилка')
                                                                        setSelectedImages(index)
                                                                    }
                                                                }}
                                                                onTouchStart={(evt) => {
                                                                    setSelectedImages(index)
                                                                }}
                                                                className={`${productStyles.singleProductImg} ${index === selectedImages ? 'active' : ''}`}
                                                            >
                                                            <Image unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.url}`} alt = {item.attributes.alt} fill />
                                                                    </div>
                                                            )
                                                        })
                                                ) : null
                                            }
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className={productStyles.singleProductImg}>
                                            <Image height={250} width={250} unoptimized src="/noImage.jpg" alt='test' />
                                        </div>

                                    </>
                                    }
                        </div>
            )}
            {/* Слайдерок */}
            {typeOfTheComponent === 'slider' && (
                (!data || data.length === 0 ) 
                    ? 
                        <div>
                            Загрузка...
                        </div>
                    :                           
                    
                    <section className = {`${styles.sliderContainerCustom}`}>
                    {
                        (data && Array.isArray(data)) ?
                          (data && Array.isArray(data) && data[1]) ? (
                            data.map((slide, index) => {
                                return(
                                    <article
                                    style = {
                                      (index === 0) ?
                                          {marginLeft: `-${selectSlide*100}%`}
                                          : null
                                    }
                                  
                                    key = {`slidekey_${index}`}
                                    className = {`${styles.sliderItem}`}>
          
                                <div className = {`${styles.textSlider}`}>
                                    <h2>{slide.attributes.header}</h2>
                                    <p>{slide.attributes.desc}</p>
                                </div>
          
          
                                  <div className = {`${styles.sliderBg}`}>
                                    <Image unoptimized alt = {slide.attributes.alt} src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${slide.attributes.url}`} fill />
                                  </div>
                                </article>
                                )
                                }))
                                : <h3>Слайдеры отсутствуют</h3>
                            : ''
                    }
    
    
                        {!autoplay && (
                            <SliderController
                                slides={data}
                                setSelectSlide={setSelectSlide}
                                styles={styles}
                            />
                        )}
                    </section>
            )}
        </>
    )
}


const SliderController = ({slides, setSelectSlide = f => f, styles}) => {

    return(
      <div className = {`${styles.dotContainer}`}>
      {
         (slides) ? slides.map ((slide, index) => {
           if(index > slides.length-2) return;
            return(
              <div
                  onClick = {() => {setSelectSlide(index)}}
                  key = {`dotKey_${index}`}
                  className = {`${styles.dot}`}></div>
            )
          }) : null
       }
      </div>
    )
  }