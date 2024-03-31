// @ts-nocheck
'use client'

// Внешние библиотеки
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Компоненты
import Image from 'next/image';
import { Forms } from '@/app/components/Forms';
import { Loader } from '@/app/components/micro/Loader';
import { Stars } from '@/app/components/shop/Star';
import { ButtonProduct } from '@/app/components/shop/ButtonProduct';
// Хуки
import { useActions } from '@/hooks/useActions';
import { useCustomers, useStater } from '@/hooks/useStater';

// Стили
import styles from '@/app/css/mainpage.module.css';
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
  const imgs = data?.data?.attributes?.imgs?.data ?? '';
  const imgData = data?.data?.attributes?.imgs?.data ?? '';
  const imgDataFirst = data?.data?.attributes.imgs.data?.[0] ?? '';
  const imgUrl = data?.data?.attributes?.imgs?.data?.[0]?.attributes?.url?? '';
  const imgAlt = data?.data?.attributes?.imgs?.data?.[0]?.attributes?.alt?? '';
  const title = data?.data?.attributes?.title?? '';
  const price = data?.data?.attributes?.price?? '';
  const priceOpt = data?.data?.attributes?.priceOpt?? '';
  const description = data?.data?.attributes?.description?? '';

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




  return (
    <>
    <main className={styles.main}>
    
      {
        (!isLoading) ?
           (data?.data) ?
                        <section className = {productStyles.singleProduct}>
                            <h1 className = {`${productStyles.title}`}>{title} </h1>
                            <article className = {`${productStyles.imageBlock}`}>
                              {
                                (typeof data != 'undefined' && imgs && Array.isArray(imgData) && imgDataFirst) ?
                                        <div className = {`${productStyles.singleProductImg}`}>
                                          <Image unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${imgUrl}`} alt = {imgAlt} fill />
                                        </div>
                                    :
                                    <div className={productStyles.singleProductImg}>
                                      <Image unoptimized src="/noImage.jpg" alt={title} fill />
                                    </div>
                              }
                            </article>
                            <article className = {`${productStyles.infoBlock}`}>

                              <div className = {`${productStyles.singleProductStock}`}>
                                {
                                  (typeof data.data != 'undefined' && price) ?
                                      <>
                                        <h2>{` ${(customer.authStatus && customer.type == "Оптовый покупатель") ? (priceOpt) ? "Оптовая цена: " + data.data?.attributes.priceOpt : priceprice : price} ₽`}</h2>

                                        <div className = {`${productStyles.stock}`}>
                                          {
                                            (stock > 0 ) ? (<><svg xmlns="https://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                                            <path d="M1 5.5L5 9.5L11 1.5" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg><span> В наличии</span></>) : (<><svg xmlns="https://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                                              <path d="M1 5.5L5 9.5L11 1.5" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg><span> Нет в наличии</span></>)
                                          }
                                        </div>
                                      </>
                                      :
                                      <>
                                        <div style = {{marginLeft: "0"}} className = {`${productStyles.stock}`}>
                                          {
                                            (stock > 0 ) ? (<><svg xmlns="https://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                                              <path d="M1 5.5L5 9.5L11 1.5" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg><span> В наличии</span></>) : (<><span> Нет в наличии</span></>)
                                          }
                                        </div>
                                      </>
                                }
                              </div>

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

                              <div className = {`${productStyles.attrBlock}`}>
                                <h3 className = {`${productStyles.attrHeader}`}>Характеристики</h3>
                                <div className = {`${productStyles.attrList}`}>
                                  {
                                    (data.data.attributes.Attributes) ? () => {
                                      return(
                                          Object.entries(data.data.attributes.Attributes).map(([key, value],index) => {
                                            return(
                                                <div key = {`${key}_${index}`} className = {`${productStyles.attrRow}`}><p>{key}</p><p></p><p>{value}</p></div>
                                            )
                                          })
                                      )
                                    } : <p style = {{color: 'red',}}>У товара не определены характеристики</p>
                                  }
                                </div>
                              </div>

                            </article>

                            <article className = {`${productStyles.downBlock}`}>

                              <div className={`${productStyles.tabsContainer}`}>
                                  <button
                                      style = {{
                                        color: (selectTab == 0) ? "#ffffff" : '',
                                        backgroundColor: (selectTab == 0) ? "#262626" : '',
                                      }}
                                      onClick = {() => setSelectTab(0)} onTouchStart={() => setSelectTab(0)} className = {`${(selectTab == 0) ? productStyles.activeButton : null}`}>Описание</button>
                                  <button
                                      style = {{
                                        color: (selectTab == 1) ? "#ffffff" : '',
                                        backgroundColor: (selectTab == 1) ? "#262626" : '',
                                      }}
                                      onClick = {() => setSelectTab(1)} onTouchStart={() => setSelectTab(1)} className = {`${(selectTab == 0) ? productStyles.activeButton : null}`}>Отзывы ({data.data && data.data?.attributes?.otzyvy_tovaries?.data.length})</button>
                                  <button
                                      style = {{
                                        color: (selectTab == 2) ? "#ffffff" : '',
                                        backgroundColor: (selectTab == 2) ? "#262626" : '',
                                      }}
                                      onClick = {() => setSelectTab(2)} onTouchStart={() => setSelectTab(2)} className = {`${(selectTab == 0) ? productStyles.activeButton : null}`}>Задать вопрос</button>
                              </div>

                              {
                                (selectTab === 0) ?
                                     <div
                                         key = {`key_tab_${selectTab}`}
                                         className={`${productStyles.termsBlock}`}>
                                         <p>
                                           {
                                             (description) ? description : null
                                           }
                                       </p>
                                     </div>
                                      : null
                              }
                              {
                                (selectTab === 1) ?
                                    <div key = {`key_tab_${selectTab}`} className={`${productStyles.reviewsContainer}`}>
                                      <p>
                                         Отзывы о товаре
                                      </p>
                                      {
                                        (!isLoading) ?
                                            (data.data && data.data?.attributes?.otzyvy_tovaries?.data) ?
                                                 data.data?.attributes?.otzyvy_tovaries?.data.map( item => {
                                                  return(
                                                      <div className={`${productStyles.oneReview}`}>
                                                        <div className={`${productStyles.userBlock}`}>
                                                          <div className={`${productStyles.userAvatarReview}`}></div>
                                                          <h3>{item.attributes.Name}</h3>
                                                          <p>
                                                            {
                                                              item.attributes.Date
                                                            }
                                                          </p>
                                                        </div>
                                                        <div className={`${productStyles.starsBlock}`}>
                                                          <Stars count = {item.attributes.Stars} />
                                                        </div>
                                                        <p>
                                                          {
                                                            item.attributes.FullText
                                                          }
                                                        </p>

                                                      </div>
                                                  )
                                                })
                                                : <p style = {{color: 'red',}}>Отзывов еще нет</p>
                                                :  <Loader />
                                      }
                                      {
                                        (customer.authStatus) ? <Forms place = {"reviews"} idItems = {(decodeParams) ? decodeParams : 0}/> : null
                                      }
                                    </div>
                                    : null
                              }
                              {
                                (selectTab === 2) ?
                                    <div key = {`key_tab_${selectTab}`} className={`${productStyles.callbackBlock}`}>
                                      <Forms place={'product'} />
                                    </div>
                                    : null
                              }

                            </article>
                        </section>
                       : <p style = {{color: 'red',}}>Ошибка получения данных</p>
             : <Loader />
      }
    </main>
    </>
  )
}

