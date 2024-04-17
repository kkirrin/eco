import React, {useState, useEffect} from "react";
import Image from 'next/image';
import productStyles from '@/app/css/product.module.css';




// Принимает точку для API запроса
// settings - скорость, число элементов в строке, есть ли автопроигрывание, отображение
// Последнее - файл со стилями для основного контейнера
export const CustomView = ({
        endpoint=[], 
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
    const [ mobile, setMobile ] = useState(null);
    const [selectSlide, setSelectSlide] = useState(0)
    const [selectImage, setSelectImage] = useState(0)
    
    const [ data, setData ] = useState([])

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
    
    
    useEffect(() => {
        fetchData()
            .catch(error => {
                console.error('Error:', error);
        });
    },[])

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
      

    const nextImageCarusel = () => {
        if (!data) return false;

        if (selectImage < data.length - 1) {
            setSelectImage(selectImage + 1);
        } else {
            setSelectImage(0);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImageCarusel();
        }, speedSlider);

        return () => clearInterval(interval);
    }, []);

   // Функция для перехода к следующему элементу в карусели
   

   let currentIndex = 0;

   // Определяем функции prevImage и nextImage вне обработчика
//    const prevImage = (imagesIntoCarusel) => {
//         console.log(imagesIntoCarusel)
//        currentIndex = (currentIndex - 1 + imagesIntoCarusel.length) % imagesIntoCarusel.length;
//        console.log(currentIndex);
//    };
   
//    const nextImage = (imagesIntoCarusel) => {
//     console.log(imagesIntoCarusel)
//        currentIndex = (currentIndex + 1) % imagesIntoCarusel.length;
//        console.log(currentIndex);
//    };
   
   // Обработчик клика
   const handleCaruselClick = (e, index) => {
        const container = e.currentTarget.parentNode.parentNode.id;
        const currentImage = index
        console.log(currentImage);

        if (data[container]) {
            console.log(data[container])
            const imagesIntoCarusel = data[container].map(array => array.length);
            if(currentIndex >= imagesIntoCarusel)  {
                nextImageCarusel()
            }
        } 
  

  };


    return (
        <>  
            {/* Каруселька */}
            {typeOfTheComponent === 'carusel' && (
                (!data) 
                    ? 
                        <div>
                            Загрузка...
                        </div>
                    : 
                    <div>
                            {
                                (data && Array.isArray(data) && data.length > 0)
                                    ? 
                                    <>
                                    {/* Сначала достал каждый массив */}
                                    {data.map((array, arrayIndex) => (
                                        <React.Fragment key={arrayIndex}>
                                            {/* А потом уже взял элементы из массива */}
                                            <div 
                                                key={arrayIndex}
                                                id={`${arrayIndex}`}
                                                className={`${productStyles.sliderThumbsCustom}`} 
                                                style={{gap: '20px', overflow: 'auto', ...(rows ? { display: 'grid', gridTemplateRows: `repeat(${rows}, 1fr)` } : {}) }}
                                                // onClick={() => {console.log(arrayIndex)}}
                                                >
                                                    {array.map((item, index) => (
                                                        <div 
                                                            key={index}>
                                                                <div
                                                                    key={index}
                                                                    onClick={(evt) => {
                                                                      
                                                                            setSelectedImages(index)
                                                                            handleCaruselClick(evt, index)
                                                                     
                                                                    }}
                                                                    style={{
                                                                        marginLeft: `-${selectImage * 100}%`,
                                                                      }}
                                                                    onTouchStart={(evt) => {
                                                                        setSelectedImages(index)
                                                                    }}
                                                                    className={`${productStyles.singleProductImg} ${index === selectedImages ? 'active' : ''}`}
                                                                >
                                                                    <Image  
                                                                        unoptimized 
                                                                        src={item.img} 
                                                                        alt={item.description} 
                                                                        fill 
                                                                    />

                                                                </div>
                                                        </div>
                                                    ))}
                                                </div>
                                        </React.Fragment>
                                    ))}
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
                (!data) 
                    ? 
                        <div>
                            Загрузка...
                        </div>
                    :                           
                    <>
                        {data.length > 0 ? (
                            data.map((array, arrayIndex) => (
                            <React.Fragment key={arrayIndex}>
                                {array.length > 0 ? (
                                    <section key={`slide_${arrayIndex}`} className={`${styles.sliderContainerCustom}`}>
                                    {array.map((slide, index) => (
                                        <article
                                            style = {
                                                (index === 0) ?
                                                    {marginLeft: `-${selectSlide*100}%`}
                                                    : null
                                            }
                                            key={`slide_${index}`}
                                            className={styles.sliderItem}
                                        >
                                            <div className={styles.textSlider}>
                                                <h2>{slide.description}</h2>
                                                <p>{slide.description}</p>
                                            </div>
                                            <div className={styles.sliderBg}>
                                                
                                                <Image
                                                    unoptimized
                                                    alt={slide.description}
                                                    src={slide.img}
                                                    fill
                                                />
                                            </div>
                                        </article>
                                ))}
                                    </section>
                                ) : (
                                <h3>Слайдеры отсутствуют</h3>
                                )}
                            </React.Fragment>
                            ))
                        ) : (
                            ''
                        )}
                        {!autoplay && (
                            <SliderController
                                slides={data}
                                setSelectSlide={setSelectSlide}
                                styles={styles}
                            />
                        )}
                    </>
            )}
        </>
    )
}


// const SliderController = ({slides, setSelectSlide = f => f, styles}) => {
//     console.log(slides)
//     return(
//       <div className = {`${styles.dotContainer}`}>
//       {
//          (slides) ? slides.map ((slide, index) => {
//            if(index > slides.length-2) return;
//             return(
//               <div
//                   onClick = {() => {setSelectSlide(index)}}
//                   key = {`dotKey_${index}`}
//                   className = {`${styles.dot}`}></div>
//             )
//           }) : null
//        }
//       </div>
//     )
//   }
  