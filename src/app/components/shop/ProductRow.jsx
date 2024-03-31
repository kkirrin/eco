'use client'
import {useEffect, useState, useRef} from "react";
import Link from 'next/link'

import styles from '@/app/css/shop.module.css'

import { ProductCard } from '@/app/components/shop/ProductCard'
import { Loader } from '@/app/components/micro/Loader'

import { useStater } from '@/hooks/useStater'
import {useActions} from "@/hooks/useActions";

import {useGetProductOnPageQuery, useGetProductsQuery} from "@/redux/api/products.api";
import {useGetCategoriesQuery} from "@/redux/api/categories.api";

export const ProductRow = ({category = 0, place = "main", bestSales = false}) => {

    const refScroll = useRef();

    const [statusLoad, setStatusLoad] = useState(false);

    const [startPosition, setStartPosition] = useState(0)
    const [endPosition, setEndPosition] = useState(0)

    const handleMoveStart = (evt) => {
        setStartPosition(evt.clientX)
    }
    const handleMoveEnd = (evt) => {
        setEndPosition(evt.clientX)
    }

    useEffect(() => {},[startPosition, endPosition])

    useEffect(() => {
        if(startPosition) refScroll.current.scrollLeft = (startPosition > endPosition) ? refScroll.current.scrollLeft + refScroll.current.getBoundingClientRect().width : refScroll.current.scrollLeft - refScroll.current.getBoundingClientRect().width
        setStartPosition(0);
        setEndPosition(0);
    }, [endPosition])

    useEffect(() => {},[category])

    return(
        <section className = {`${styles.productContainer}`}>

            <div className = {`${styles.upBlock}`}>
                <LoadingCategory category = {category} />
            </div>

            <div
                onMouseDown = {
                    (evt) => {handleMoveStart(evt)}
                }
                onMouseUp = {
                    (evt) => {handleMoveEnd(evt)}
                }
                ref = {refScroll}
                className = {`${styles.downBlock}`}>
                <LoadingProducts category={category} />
            </div>

        </section>
    )
}

function checkCategory(arrayCategories = [], searchCat = -1) {
    if(!Array.isArray(arrayCategories)) return false;
    return arrayCategories.find(item => item.id === searchCat)
}
/*
            <Link className = {`${styles.buttonToShop}`} href = '/routes/shop'>В каталог</Link>
 */
/* Верхний блок, если нужно будет. Вставить перед .downBlock

            <div className = {`${styles.upBlock}`}>
                <div className = {`${styles.left}`}>
                    <h2>запчасти для грузовиков<br /><strong>во владивостоке</strong></h2>
                </div>
                <div className = {`${styles.right}`}>
                    <p>
                       Согласно предыдущему, рекламное сообщество консолидирует культурный креатив. Взаимодействие корпорации и клиента
                    </p>
                </div>
            </div>

 */
const LoadingCategory = ({category}) => {

    const {isLoading, error, data} = useGetCategoriesQuery();

    useEffect(() => {
        ////console.log("Категория ID")
        ////console.log(category)
    },[category])

    return(
        <>
            <div className = {`${styles.left}`}>
                <h2>
                    {
                        (!isLoading) ?
                            (typeof data != 'undefined' && data.data) ?
                                data.data.map(item => {
                                    if(item.id == category) {
                                        return item.attributes.name
                                    }
                                })
                                : null
                            : <Loader />
                    }
                </h2>
            </div>
            <div className = {`${styles.right}`}>
                <Link href = {`/routes/shop/${category}`}>
                    В каталог
                    <svg xmlns="https://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
                        <path d="M1 1.5L6 6.5L1 11.5" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </Link>
            </div>
        </>
    )
}

const LoadingProducts = ({category = 79}) => {

    const {isLoading, error, data} = useGetProductOnPageQuery({
        page: 0,
        filters: (category) ? [category] : false,
        pageSize: 30,
    });

    useEffect(() => {},[category])
    useEffect(() => {},[isLoading])

    return(
        <>
            {
                (!isLoading) ?
                    (typeof data != 'undefined'  && data.data) ?
                        data.data.map((item, index) => <ProductCard key = {`${item.id}`} item = {item} /> )
                        : null
                    : null
            }

            {
                /* OLD
                (!products[0]) ? (<Loader />)
                    :
                    products.map((item, index) => (checkCategory(item.category, category)) ? <ProductCard key = {index} product = {item} /> : null)
                 */
            }
        </>
    )
}
