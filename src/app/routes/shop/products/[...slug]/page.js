// @ts-nocheck
'use client'

// Внешние библиотеки
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Компоненты
import { Forms } from '@/app/components/Forms';
import { Loader } from '@/app/components/micro/Loader';
import { Stars } from '@/app/components/shop/Star';
import { ButtonProduct } from '@/app/components/shop/ButtonProduct';
import { StateProduct } from '@/app/components/shop/StateProduct';
// import { ImageProduct } from '@/app/components/shop/ImageProduct';
import { IntoProductImagesSlider } from '@/app/components/shop/IntoProductImagesSlider';
import { FeatureProduct } from '@/app/components/shop/FeatureProduct';
import { TabsProduct } from '@/app/components/shop/TabsProduct';
import { useActions } from '@/hooks/useActions';
import { useCustomers, useStater } from '@/hooks/useStater';
import { CustomView } from '@/app/components/CustomView';
import Slider from '@/app/components/test/Slider';
import Carusel from '@/app/components/test/Carusel';

// Стили
import styles from '@/app/css/mainpage.module.css';
import stylesForContainer from '@/app/css/slider.module.css'
import productStyles from '@/app/css/product.module.css';

// API запросы
import { useGetProductQuery } from "@/redux/api/products.api";
import returnResultProduct from '@/app/workers/resultProductsWorker';


///Вообще тут будет получение товара через fetch а пока так
export default function Home({params}) {

  const decodeParams = Number.parseInt(decodeURI(params.slug))

  const customer = useCustomers();

  const [quantity, setQuantity] = useState(1);
  const [textToCart,setTextToCart] = useState('В корзину');

  const {isLoading, error, data} = useGetProductQuery(decodeParams)

  const [selectTab, setSelectTab] = useState(0);

  const {addToCart} = useActions();



  // Получение данных из объекта 
  const stock = data?.data?.attributes?.stock ?? 0; 
  console.log(stock)
  
  const imgs = data?.data?.attributes?.imgs ?? '';
  const imgData = data?.data?.attributes?.imgs?.data ?? '';
  const imgDataFirst = data?.data?.attributes.imgs.data?.[0] ?? '';
  const imgUrl = data?.data?.attributes?.imgs?.data?.[0]?.attributes?.url?? '';
  const imgAlt = data?.data?.attributes?.imgs?.data?.[0]?.attributes?.alt?? '';
  const title = data?.data?.attributes?.title?? '';
  const price = data?.data?.attributes?.price?? '';
  const priceOpt = data?.data?.attributes?.priceOpt?? '';
  const description = data?.data?.attributes?.description?? '';
  const attributes = data?.data?.attributes?.Attributes?? '';
  const reviewsLength = data?.data?.attributes?.otzyvy_tovaries?.data.length ?? 0;
  const reviewsData = data?.data?.attributes?.otzyvy_tovaries?.data ?? '';


  const plus = () => {
    if(quantity < stock) {
      setQuantity(quantity + 1)
    }
  }
  const minus = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
    }
  }


  const handleAddToCart = (item) => {
    const resultProduct = returnResultProduct(item);
    const makeMutableProduct = {...resultProduct};
          makeMutableProduct.quantityForBuy = quantity;
          addToCart(makeMutableProduct);

    setTextToCart('Добавлено!');

    setTimeout(() => {
      setTextToCart('Добавить еще?');
    }, 1000);
    
  }

  useEffect(() => {
    if(!isLoading) {
      //console.log(data.data?.attributes.priceOpt)
    }
  },[isLoading])

  useEffect(() => {
    //console.log(customer.type)
  },[customer])


  const images = [
    'https://via.placeholder.com/800x400/ff5733/fff',
    'https://via.placeholder.com/800x400/33ff57/fff',
    'https://via.placeholder.com/800x400/5733ff/fff',
  ];

  return (
    <>
    <main className={styles.main}>
    
      {
        (!isLoading) ?
           (data?.data) ?
                        <section className = {productStyles.singleProduct}>
                            <h1 className = {`${productStyles.title}`}>{title} </h1>
                            <article className = {`${productStyles.imageBlock}`}>

                            <IntoProductImagesSlider data = {(imgs) ? imgData : null} title = {(title) ? title : null} />
          
                            </article>
                            <article className = {`${productStyles.infoBlock}`}>

                              <div className = {`${productStyles.singleProductStock}`}>
                                {/* Показывает цену и В наличии */}
                                <StateProduct 
                                  data={data} 
                                  price={price} 
                                  stock={stock} 
                                  priceOpt={priceOpt}
                                />
                              </div>

                              {/* Отрисовывает кнопки для добавления */}
                              <ButtonProduct
                                stock={stock}
                                quantity={quantity}
                                handleAddToCart={handleAddToCart}
                                minus={minus}
                                plus={plus}
                                textToCart={textToCart}
                                productStyles={productStyles}
                                data={data}
                              />

                              <FeatureProduct
                                  attributes={attributes}
                              />

                            </article>

                            <article className = {`${productStyles.downBlock}`}>

                            <TabsProduct 
                              data={data}
                              reviewsLength={reviewsLength} 
                              description={description}
                              isLoading={isLoading}
                              params={params}
                              reviewsData={reviewsData}
                              decodeParams={decodeParams}
                            />

                            </article>
                        </section>
                       : <p style = {{color: 'red',}}>Ошибка получения данных</p>
                      : <Loader />
                }


                  {/* <CustomView 
                    endpoint={['http://localhost:3000/data_img_1.json']}
                    settings={{
                      speed: 2000,
                      typeOfTheComponent: 'slider',
                      autoplay: true,
                      rows: 0
                    }}
                    styles={stylesForContainer}
                  /> */}


                  {/* ЧИСТЫЙ НОВЫЙ СЛАЙДЕР */}

                  
                  <Carusel 
                    endpoint={[`http://localhost:3000/data_img_1.json`]}
                    settings={{
                      speed: 10000,
                      rows: 2,
                      autoplay: true,
                    }} 
                    images={images}
                    styles={styles}
                    
                  />
                  <Slider 
                    endpoint={[`http://localhost:3000/data_img_1.json`, `http://localhost:3000/data_img_1.json`]}
                    settings={{
                      speed: 3000,
                      rows: 2,
                      autoplay: true,
                    }} 
                    styles={styles}
                    
                  />
    </main>
    </>
  )
}

