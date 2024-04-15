import React, {useState, useEffect, use} from "react";
import Image from 'next/image';
import { useGetProductQuery } from "@/redux/api/products.api";




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
    const [ items, setItems] = useState([])
    const [slide, setSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null)
    

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


    useEffect(() => {
        const handleDocumentWheel = (e) => {
            const container = document.querySelector(`.${styles.slidersThumbs}`); 

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
            {
                (!data || data.length === 0) 
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
                                
                                    <div>
                                        <Image height={250} width={250} unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${data[selectedImages].attributes.url}`} alt = {data[selectedImages].attributes.alt} />
                                    </div>

                                    <div
                                        onWheel={(evt) => {
                                            handleWheel(evt)
                                        }}
                                        className = {`${styles.sliderThumbs}`}>
                                        {
                                            (data && Array.isArray(data) && data[1]) 
                                            ?
                                            
                                            data.map( (item, index) => {
                                                return(
                                                    <div
                                                    onClick = { (evt) => {
                                                        if(!mobile) {
                                                            setSelectedImages(index)
                                                        }}
                                                    }
                                                    onTouchStart = { (evt) => {
                                                        setSelectedImages(index)
                                                    }}
                                                    className = {`${styles.singleProductImg}`}>
                                                            <Image width={150} height={150} unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.url}`} alt = {item.attributes.alt} />
                                                        </div>
                                                    )
                                                })
                                                
                                                : null
                                            }
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.singleProductImg}>
                                        <Image height={250} width={250} unoptimized src="/noImage.jpg" alt='test' />
                                    </div>

                                </>
                                }
                    </div>


}
        </>
    )
}