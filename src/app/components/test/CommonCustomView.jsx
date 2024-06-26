import React, { useState, useEffect, use, useRef } from 'react';
import StyleCarusel from './carusel.module.css'
import StyleSlider from './slider.module.css'
import Image from 'next/image';


export const CommonCustomView = ({ 
    endpoint=[],
    settings={
        speed: 1000,
        rows: 1,
        swiperView: 0,
        typeOfTheComponent: 'carusel' || 'slider',
        autoplay: true || false
    },
    styles
    }) => {
    const { speed, rows, swiperView, typeOfTheComponent, autoplay} = settings;
    const [ data, setData ] = useState([])
    const [scrollSpeed,] = useState(200)

    const [ mobile, setMobile ] = useState(null);

    const [slideWidth, setSlideWidth] = useState(100 / 6);

    const handleWheel = (evt) => {
        const container = evt.currentTarget;
        const isInContainer = container.contains(evt.target);

        if (isInContainer) {
            evt.preventDefault();
            const scrollAmount = evt.deltaY < 0 ? -scrollSpeed : scrollSpeed;
            container.scrollLeft += scrollAmount;
        }
    }

    // Функция для получения общих данных
    const fetchData = async () => {
        if (rows > 1) {
            // Если row больше одного, отправляем запросы на все эндпоинты
            const newData = [];
            for (const endpointItem of endpoint) {
                try {
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
                } catch (error) {
                    // console.log("Ошибка: ", error);
                    throw error;
                }
            }
            setData(newData);
        } else {
            // Если row не больше одного, отправляем запрос только на один эндпоинт
            try {
                const response = await fetch(endpoint[0], {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Проблемы у тебя с интернетом');
                const object = await response.json();
                setData([object.data]); // Сохраняем результат в массиве
            } catch (error) {
                // console.log("Ошибка: ", error);
                throw error;
            }
        }
    };

    // Массив с картинками
    const arrayImageFromData = data.flatMap(innerArray => innerArray.map(item => item.img));
    
    const newArray = []

    
    for(let i = 0; i < rows; i++) {
        if (data[i] !== undefined && data[i] !== null) {
            const allValuesFromFirstObject = Object.values(data[i].map(item => item.img));
            newArray.push(allValuesFromFirstObject);
        } else {
            // console.log("Первый элемент data не определен или равен null");
        }
    }


    const onlyImgs = []

    for(let i = 0; i < rows; i++) {
        if (data[i] !== undefined && data[i] !== null) {
            // Тут лежат массивы с картинками
            const arrayImageFromData = newArray[i].map(item => item);
            onlyImgs.push(arrayImageFromData)
            // console.log(arrayImageFromData)
        } else {
            // console.log("Ошибка");
        }
    }
    const onlyImgsRepeatMain = []
    
    for(let i = 0; i < rows; i++) {
        if (data[i] !== undefined && data[i] !== null) {
            const onlyImgsRepeat = [...onlyImgs[i]]
            onlyImgsRepeatMain.push(onlyImgsRepeat)
        } else {
            // console.log("Первый элемент data не определен или равен null");
        }
    }


    const onlyImgsRepeatMainSingle = onlyImgsRepeatMain.reduce((acc, array) => {
        return [...acc, ...array]
    }, [])


    const lengthArrayImageFromData = arrayImageFromData.length

    // Слушает изменение размеров
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


    useEffect(() => {
        const updateSlideWidth = () => {
            // Проверяем ширину экрана
            const screenWidth = window.innerWidth;
            if (screenWidth < 500) {
                setSlideWidth(100 / 1);
            } else {
                setSlideWidth(100 / 6);
            }
        };

        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);
    })


    // Хук для получения данных
    useEffect(()=> {
        fetchData()
            .catch(error => { 
                // console.log("Ошибка: ", error)
            })
    },[])


    useEffect(() => {
        const handleDocumentWheel = (evt) => {
            const containers = document.querySelectorAll(`.${StyleSlider.slider}`);
            containers.forEach((container) => {
                if (container && container.contains(evt.target)) {
                    handleWheel(evt);
                }
            })
        }

        document.addEventListener('wheel', handleDocumentWheel, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleDocumentWheel);
        }
    });


    
    return (
        <>
            {typeOfTheComponent === 'carusel' && (
                (!data) 
                ? <div> Загрузка ...</div>
                : 
                <>
                        {Array(rows).fill().map((_, index) => (
                            <>
                                <Row 
                                    index={index} 
                                    onlyImgsRepeatMainSingle={onlyImgsRepeatMainSingle}
                                    speed={speed}
                                    autoplay={autoplay}
                                    handleWheel={handleWheel}
                                    slideWidth={slideWidth} 
                                    lengthArrayImageFromData={lengthArrayImageFromData} 
                                />
                            </>
                        ))}
                </>
                        
            )}

            {typeOfTheComponent === 'slider' && (
                (!data) 
                ? <div> Загрузка ...</div>
                : 
                <>
                    <Slider
                        lengthArrayImageFromData={lengthArrayImageFromData} 
                        speed={speed} 
                        autoplay={autoplay}
                        arrayImageFromData={arrayImageFromData}
                        
                    />
                </>
            )}
        </>
    )

}


const Row =  ({ 
    index,
    onlyImgsRepeatMainSingle,
    autoplay,
    speed,
    lengthArrayImageFromData,
    handleWheel,
    slideWidth 
        }) => {

    const [ slideIndex, setSlideIndex ] = useState(0)
    const sliderRef = useRef(null);
    const caruselContainerRef = useRef(null);


    // Функция для кнопки carusel вправо
    const handlePrevClick = () => {
        setSlideIndex(prevIndex => (prevIndex - 1 + lengthArrayImageFromData) % lengthArrayImageFromData);
    };

    // Функция для кнопки carusel влево
    const handleNextClick = (e, index) => {
        setSlideIndex(prevIndex => (prevIndex + 1) % lengthArrayImageFromData);
    };
    
    // Автоплэй для капусели
    useEffect(() => {
        if(autoplay) {
            const intervalId = setInterval(() => {
                setSlideIndex(prevIndex => (prevIndex + 1) % lengthArrayImageFromData);
            }, speed); 
            
            return () => clearInterval(intervalId);
        }
      }, [autoplay, lengthArrayImageFromData, speed]);

      const [ array, setArray ] = useState([onlyImgsRepeatMainSingle])
      console.log(array)
  

      useEffect(() => {
        if (sliderRef.current && caruselContainerRef.current) {
          const slider = sliderRef.current.getBoundingClientRect();
          const carusel = caruselContainerRef.current.getBoundingClientRect();
      
          if (carusel.right < slider.right) {
            const firstElement = onlyImgsRepeatMainSingle.pop();
            // onlyImgsRepeatMainSingle.shift();
            onlyImgsRepeatMainSingle.push(firstElement)
            setArray(onlyImgsRepeatMainSingle);
            console.log("Сейчас нужно добавить элементы ");
          } else {
            console.log("Сейчас элементов типо достаточно");
          }
        }
      }, [slideIndex, onlyImgsRepeatMainSingle]);
      


    //Получение координат слайдера

    return (
        <>
            <div 
                key={index} 
                className={StyleSlider.slider} 
                onWheel={(evt) => {
                    handleWheel(evt)
                }}
                ref={sliderRef}

                >

                <div 
                    id={`Carusel_${index}`} 
                    className={StyleCarusel.slides__container} 
                    style={{
                        display: "flex", 
                        gap: "20px", 
                        transition: 'transform 0.6s ease-in-out', 
                        transform: `translateX(-${slideIndex * slideWidth}%)` 
                        
                    }}
                    
                    >

                    {array.map((image, index) => (
                        <div 
                            className={StyleCarusel.slide} 
                            key={index}
                            ref={caruselContainerRef}
                        >
                            <img
                                style={{
                                    maxWidth: "250px",
                                    maxHeight: "200px",
                                    height: "100%",
                                    borderRadius: "10px",
                                    objectFit: "cover",
                                }}
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                        
                </div>
            </div>
            <button id={`${index}`} className={StyleCarusel.prev_btn} onClick={(evt) => {handlePrevClick()}}>Назад</button>
            <button id={`${index}`} className={StyleCarusel.pext_btn} onClick={(evt) => {handleNextClick()}}>Вперед</button>
        </>
        
    )
}
const Slider =  ({ 
    autoplay,
    arrayImageFromData,
    lengthArrayImageFromData,
    speed,
    }) => {



    const [ slideIndex, setSlideIndex ] = useState(0)
    const [ activeIndex, setActiveIndex ] = useState(0)
    // Функция для кнопки slider вправо
    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === arrayImageFromData.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Функция для кнопки slider влево
    const prevSlide = () => {
        setActiveIndex(prevIndex => {
            // Если текущий индекс - 1, переходим к последнему слайду
            if (prevIndex === 0) {
                return arrayImageFromData.length - 1;
            } else {
                // В противном случае, просто переходим к предыдущему слайду
                return prevIndex - 1;
            }
        });
    };
    
    
    
    // Автоплэй для слайдера
    useEffect(() => {
        if(autoplay) {
            if(activeIndex < lengthArrayImageFromData - 1) {
                const autoPlayInterval = setInterval(nextSlide, speed)
                return () => {
                    clearInterval(autoPlayInterval)
                }
            } else {
                setActiveIndex(0)
            }
        }
    }, [autoplay, lengthArrayImageFromData, speed, activeIndex, nextSlide])



    return (    
        <div className={StyleSlider.wrapper} style={{overflow: 'hidden', transition: 'transform 0.6s ease-in-out'}}>
            <button onClick={prevSlide} className={StyleSlider.btn__prev}>
                &lt;
            </button>

            <img
                className={StyleSlider.slide__img}
                src={arrayImageFromData[activeIndex]}
                alt={`Slide ${activeIndex}`}
            />

            <button onClick={nextSlide} className={StyleSlider.btn__next}>
                &gt;
            </button>
        </div>
    )
}