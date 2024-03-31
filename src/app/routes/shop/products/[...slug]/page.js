'use client'

'use client'

import Image from 'next/image'
import styles from '@/app/css/mainpage.module.css'
import productStyles from '@/app/css/product.module.css'

import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react';

import { useActions } from '@/hooks/useActions'
import {useCustomers, useStater} from '@/hooks/useStater'

import {useGetProductQuery} from "@/redux/api/products.api"
import {Forms} from "@/app/components/Forms";
import {Loader} from "@/app/components/micro/Loader";

///Вообще тут будет получение товара через fetch а пока так
export default function Home({params}) {

  const decodeParams = Number.parseInt(decodeURI(params.slug))

  const router = useRouter();
  const customer = useCustomers();

  const [quantity, setQuantity] = useState(1);
  const [textToCart,setTextToCart] = useState('В корзину');

  const {isLoading, error, data} = useGetProductQuery(decodeParams)

  const [selectTab, setSelectTab] = useState(0);

  const {addToCart} = useActions();

  const plus = () => {
    if(quantity < data.data.attributes.stock) {
      setQuantity(quantity + 1)
    }
  }
  const minus = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = (item) => {
    const resultProduct = {
      id: item.id,
      id1c: (item.attributes?.id1c) ? item.attributes.id1c : '',
      category: (item.attributes?.categories?.data) ? item.attributes.categories.data.map(item => item.id) : [],
      image: (item.attributes?.imgs?.data) ? item.attributes.imgs.data.map(item => item.attributes.url) : '/noImage.jpg',
      title: item.attributes?.title,
      description: item.attributes?.description, //Сейчас нету, так на будущее
      stock: Number.parseInt(item.attributes.stock),
      storeplace: item.attributes.storeplace,
      attributes: (item.attributes.Attributes?.attributes) ? item.attributes.Attributes.attributes.map(item => {
        if(item.type === "Number") {
          return({
            name: item.name,
            type: item.type,
            value: Number.parseInt(item.value)
          })
        }
        return item
      }) : [],
      quantitySales: Number.parseInt(item.attributes.quantitySales),
      price: (!isNaN(Number.parseInt(item.attributes.price)) ? Number.parseInt(item.attributes.price) : 1 ),
      priceOpt: item.attributes.priceOpt,
    }
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
                            <h1 className = {`${productStyles.title}`}>{data.data.attributes.title} </h1>
                            <article className = {`${productStyles.imageBlock}`}>
                              {
                                (typeof data != 'undefined' && data.data.attributes.imgs && Array.isArray(data.data.attributes.imgs.data) && data.data.attributes.imgs.data[0]) ?
                                        <div className = {`${productStyles.singleProductImg}`}>
                                          <Image unoptimized unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes.imgs.data[0].attributes.url}`} alt = {data.data.attributes.imgs.data[0].attributes.alt} fill />
                                        </div>
                                    :
                                        <div className = {`${productStyles.singleProductImg}`}>
                                          <Image unoptimized unoptimized src= {`/noImage.jpg`} alt = {data.data.attributes.title} fill />
                                        </div>
                              }
                            </article>
                            <article className = {`${productStyles.infoBlock}`}>

                              <div className = {`${productStyles.singleProductStock}`}>
                                {
                                  (typeof data.data != 'undefined' && data.data?.attributes?.price) ?
                                      <>
                                        <h2>{` ${(customer.authStatus && customer.type == "Оптовый покупатель") ? (data.data?.attributes.priceOpt) ? "Оптовая цена: " + data.data?.attributes.priceOpt : data.data?.attributes.price : data.data?.attributes.price} ₽`}</h2>

                                        <div className = {`${productStyles.stock}`}>
                                          {
                                            (data.data.attributes.stock > 0 ) ? (<><svg xmlns="https://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
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
                                            (data.data.attributes.stock > 0 ) ? (<><svg xmlns="https://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                                              <path d="M1 5.5L5 9.5L11 1.5" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg><span> В наличии</span></>) : (<><span> Нет в наличии</span></>)
                                          }
                                        </div>
                                      </>
                                }
                              </div>

                              <div className = {productStyles.singleProductAddToCart}>
                                {
                                  (data.data.attributes.stock) ?
                                      <>
                                        <div className = {`${productStyles.productCardQuntity}`}>
                                          <button onClick ={minus} className = {`${productStyles.productCardButton}`}><Image unoptimized src = {"/minus.svg"} alt = "Кнопка для уменьшения количества товара" fill/></button>
                                          <p>{quantity}</p>
                                          <button onClick ={plus} className = {`${productStyles.productCardButton}`}><Image unoptimized src = {"/plus.svg"}  alt = "Кнопка для увеличения количества товара" fill/></button>
                                        </div>
                                        <button
                                            onClick = {() => handleAddToCart(data.data)}
                                            className = {`${productStyles.addToCartButton}`}>
                                          {textToCart}
                                        </button>
                                      </>
                                          :
                                      <>
                                        <div className = {`${productStyles.productCardQuntity}`}>
                                          <button onClick ={minus} className = {`${productStyles.productCardButton}`}><Image unoptimized src = {"/minus.svg"} alt = "Кнопка для уменьшения количества товара" fill/></button>
                                          <p>{quantity}</p>
                                          <button onClick ={plus} className = {`${productStyles.productCardButton}`}><Image unoptimized src = {"/plus.svg"}  alt = "Кнопка для увеличения количества товара" fill/></button>
                                        </div>
                                        <button
                                            onClick = {() => handleAddToCart(data.data)}
                                            className = {`${productStyles.addToCartButton}`}>
                                            Предзаказ
                                        </button>
                                      </>
                                }

                              </div>
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
                                             (data?.data?.attributes.description) ? data?.data?.attributes.description : null
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


const Stars = ({count = 0}) => {

  const [stars, setStars] = useState(['0','0','0','0','0'])

  useEffect(() => {
  },[count])
  return(
      <div>
        {
          stars.map((item, index) => {
            return(
                <svg key = {`key_start_${index}${item.id}`} xmlns="https://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill={`#${(index+1 <= count) ? 'FECC00' : 'FFFFFF'}`}>
                  <path d="M7.52447 1.08156C7.67415 0.620903 8.32585 0.620904 8.47553 1.08156L9.5451 4.37336C9.74591 4.99139 10.3218 5.40983 10.9717 5.40983H14.4329C14.9172 5.40983 15.1186 6.02964 14.7268 6.31434L11.9266 8.34878C11.4009 8.73075 11.1809 9.4078 11.3817 10.0258L12.4513 13.3176C12.6009 13.7783 12.0737 14.1613 11.6818 13.8766L8.88168 11.8422C8.35595 11.4602 7.64405 11.4602 7.11832 11.8422L4.31815 13.8766C3.9263 14.1613 3.39906 13.7783 3.54873 13.3176L4.6183 10.0258C4.81911 9.4078 4.59913 8.73075 4.07339 8.34878L1.27323 6.31434C0.881369 6.02964 1.08276 5.40983 1.56712 5.40983H5.02832C5.67816 5.40983 6.25409 4.99139 6.4549 4.37336L7.52447 1.08156Z" stroke="#FECC00"/>
                </svg>
                )
          })
        }

      </div>
  )
}
