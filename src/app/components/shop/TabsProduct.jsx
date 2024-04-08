import React from 'react';

import { useState } from 'react';

import { Forms } from '../Forms';
import { Loader } from '../micro/Loader';

import { useGetProductQuery } from "@/redux/api/products.api";

import productStyles from '@/app/css/product.module.css';
import { useCustomers } from '@/hooks/useStater';
import { Stars } from './Star';

export const TabsProduct = ({ 
    data, 
    reviewsLength, 
    description, 
    isLoading, 
    reviewsData,
    decodeParams
}) => {
    
    const [selectTab, setSelectTab] = useState(0);
    
    const customer = useCustomers();

    return (
        <>
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
                onClick = {() => setSelectTab(1)} onTouchStart={() => setSelectTab(1)} className = {`${(selectTab == 0) ? productStyles.activeButton : null}`}>Отзывы ({data && reviewsLength})</button>
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
                        (data && reviewsData) ?
                            reviewsData.map( item => {
                                return(
                                    // eslint-disable-next-line react/jsx-key
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

        

        </>
        

    )
}

