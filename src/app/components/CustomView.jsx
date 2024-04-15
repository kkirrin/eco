import React, {useState, useEffect, use} from "react";
import Image from 'next/image';
import { useGetProductQuery } from "@/redux/api/products.api";
import productStyles from '@/app/css/product.module.css';
import Link from "next/link";




// Принимает точку для API запроса
// settings - скорость, число элементов в строке, есть ли автопроигрывание, отображение
// Последнее - файл со стилями для основного контейнера
export const CustomView = ({
        data, 
        endpoint, 
        settings = { 
            speed: 0,
            rowOfTheElements: 4,
            typeOfTheComponent: 'slider'|| 'carusel',
            autoplay: true || false
        }, 
        styles}) => {


    
    const { speed, rowOfTheElements, typeOfTheComponent } = settings;
    const [selectedImages, setSelectedImages] = useState(0)
    // Все слайды
    const [ items, setItems] = useState([]);
    const [touchPosition, setTouchPosition] = useState(null);
    // Состояние для определения мобила это или нет
    const [ mobile, setMobile ] = useState(null);
    const [ widthScreen, setWidthScreen ] = useState(0);
    const [ heightScreen, setHeightScreen ] = useState(0);
    const [selectSlide, setSelectSlide] = useState(0)

    useEffect(() => {
        const checkScreenSize = () => {
            setWidthScreen(window.innerWidth)
            setHeightScreen(window.innerHeight)
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

    const nextSlide = () => {
        if(!data) return false
        if(selectSlide < data.length - 1) {
          setSelectSlide(selectSlide + 1);
        } else {
          setSelectSlide(0)
        }
      }
      useEffect(() => {
          const interval = setInterval(() => {
            nextSlide()
          }, speed)
          return () => clearInterval(interval)
        }
      )

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
            {typeOfTheComponent === 'slider' && (
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
                                        <div
                                            onWheel={(evt) => {
                                                handleWheel(evt)
                                            }}
                                            className = {`${productStyles.sliderThumbs}`}>

                                            
                                            {
                                                (data && Array.isArray(data) && data[1]) 
                                                ?
                                                
                                                data.map( (item, index) => {
                                                    return(
                                                        <div
                                                        onClick = { (evt) => {
                                                            if(!mobile) {
                                                                console.log('мобилка')
                                                                setSelectedImages(index)
                                                            }}
                                                        }
                                                        onTouchStart = { (evt) => {
                                                            setSelectedImages(index)
                                                        }}
            
                                                        className = {`${productStyles.singleProductImg}`}>
                                                                <Image width={500} height={500} unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.url}`} alt = {item.attributes.alt} />
                                                            </div>
                                                        )
                                                    })
                                                    
                                                    : null
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

            {typeOfTheComponent === 'carusel' && (
                (!data || data.length === 0 ) 
                    ? 
                        <div>
                            Загрузка...
                        </div>
                    :                           
                

                    <section className = {`${styles.sliderContainer}`}>
                    {
                      (data) ?
                          (data.data) ?
                          data.map( (slide, index) => {
                                return(
                                    <article
                                        style = {
                                          (index === 0) ?
                                              {marginLeft: `-${selectSlide*100}%`}
                                              : null
                                        }
                                        // onMouseMove= {()=>{setSliderSpeed(500000)}}
                                        // onMouseLeave={()=>{setSliderSpeed(3000)}}
                                        key = {`slidekey_${index}`}
                                        className = {`${styles.sliderItem}`}>
              
                                      <div className = {`${styles.textSlider}`}>
                                        <h2>{slide.attributes.header}</h2>
                                        <p>{slide.attributes.desc}</p>
              
                                        <button>
                                            <Link href = {`${slide.attributes.href}`}>Выбрать в каталоге</Link>
                                        </button>
                                      </div>
              
              
                                      <div className = {`${styles.sliderBg}`}>
                                        <Image unoptimized alt = {slide.attributes.alt} src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${slide.attributes.src.data.attributes.url}`} fill />
                                      </div>
                                    </article>
                                )
                              })
                              : <h3>Слайдеры отсутствуют</h3>
                          : ''
                    }
              
                  {/* <SliderController slides = {slides} setSelectSlide = {setSelectSlide}/> */}
              
                  </section>
            )}
                    
            
        </>
    )
}