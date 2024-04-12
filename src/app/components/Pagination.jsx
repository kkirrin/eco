'use client'

import React, { useEffect, useState } from 'react'

import {useFilters, useMain, useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

import styles from '@/app/css/shop.module.css'
import {useGetProductOnPageQuery} from "@/redux/api/products.api";
import {useParams} from "next/navigation";
import {ProductCard} from "@/app/components/shop/ProductCard";
import {Loader} from "@/app/components/micro/Loader";

const Pagintaion = ({ updateFilters, setUpdateFilters = f => f, pageNumber = 1, setPageNumber = f => f, categories = [0], price }) => {

    const {getDataProducts} = useActions()

    const mobile = useMain()
    const {slug} =  useParams()
    const {filters} = useFilters()


    console.log(filters)

    const [selectPage, setSelectPage] = useState(pageNumber);
    const [startPage, setStartPage] = useState(1);
    const [stopRange, setStopRange] = useState(9);
    const [step, setStep] = useState(9);
    const [categoryFilter, setCategoryFilter] = useState(() => (slug && !filters[0].values[0]) ? [slug[0]] : []);
    const [priceFilter, setPriceFilter] = useState([]);

    console.log(priceFilter)
    console.log(categoryFilter)
    let {isLoading, error, data} = useGetProductOnPageQuery({
        page: selectPage,
        catId: false,
        pageSize: 9,
        filters: 
        {priceFilter, categoryFilter}
        
    });

    useEffect(() => {
        setStartPage(stopRange)
        setStopRange(step*selectPage)
        setPageNumber(selectPage)
    },[selectPage,slug, categoryFilter, priceFilter])

    useEffect(() => {
        if(!filters[0].values || !filters[0].values[0]) {
            return
        }
        if (filters[0].values) {
            setCategoryFilter(Array.isArray(filters[0].values) ? filters[0].values : [filters[0].values]);
        }
        if (filters[1].values) {
            setPriceFilter([filters[1].values]);
            console.log(priceFilter)
        }
        setPageNumber(1)
        setSelectPage(1)
    },[filters[0].values, filters[1].values])

    useEffect(() => {
        if(filters[1].values || filters[1].values[1]) {
            return
        }
        setPriceFilter([filters[1].values])
        setPageNumber(1)
        setSelectPage(1)
    }, [])

    useEffect(() => {},[isLoading])

    useEffect(() => {
        if (filters[1].values && filters[1].values.length === 2) {
            setPriceFilter([...filters[1].values]);
            setPageNumber(1);
            setSelectPage(1);
        }
    }, [filters[1].values]);
    
    useEffect(() => {
        if (filters[0].values) {
            setCategoryFilter(Array.isArray(filters[0].values) ? filters[0].values : [filters[0].values]);
            setPageNumber(1);
            setSelectPage(1);
        } else if (slug) {
            setCategoryFilter([slug[0]]);
            setPageNumber(1);
            setSelectPage(1);
        }
    }, [filters[0].values, slug]);

    return(
        <>
            {
                (!isLoading) ?
                    (typeof data != 'undefined') ?
                        data.data.map((product, index) => {
                            return <ProductCard key = {`${product.id}_${index}`} item = {product} />
                        })
                        : null
                    : <Loader />
            }

            <div className={styles.pagination} role = "navbar">
                {
                    (!isLoading) ?
                        <button
                            onClick = {
                                () => {
                                    if (!mobile.mobile) {
                                        if(selectPage > 1)
                                            setSelectPage(selectPage - 1)
                                    }
                                }
                            }
                            onTouchStart={() => {
                                if(selectPage > 1)
                                    setSelectPage(selectPage - 1)
                            }}
                            key = {`key_pagination_-1`}>{"<"}

                        </button>
                        : null
                }
                {
                    (!isLoading) ?
                        (data) ?
                    [...Array(step)].map((item, index) => {
                        if(index <= step)
                            return <button
                                    key = {`key_pagination_${index}`}
                                    onClick={() => {
                                        if (!mobile.mobile) {
                                              if(index+selectPage < data.meta.pagination.pageCount+1)
                                                setSelectPage((selectPage != 1) ? index + selectPage : index + 1);
                                        }
                                     }
                                    }
                                    onTouchStart={() => {
                                        if(index+selectPage < data.meta.pagination.pageCount+1)
                                            setSelectPage((selectPage != 1) ? index + selectPage : index + 1);
                                    }}
                                    className={`${(selectPage == index+selectPage) ? styles.activePagination : styles.noActivePagination} ${(index+selectPage+1 > data.meta.pagination.pageCount) ? styles.noHavePage : ''}`}>
                                    {(selectPage == 1) ? index+1 : index + selectPage}
                            </button>
                    }) : null
                        : null
                }
                {
                    (!isLoading) ?
                        <button
                            onClick = {
                                () => {
                                    if (!mobile.mobile) {
                                        if(selectPage < data.meta.pagination.pageCount)
                                            setSelectPage(selectPage + 1)
                                    }
                                }
                            }
                            onTouchStart={() => {
                                if (selectPage < data.meta.pagination.pageCount) setSelectPage(selectPage + 1)
                            }}
                            key = {`key_pagination_-1`}>{">"}

                        </button>
                        : null
                }
            </div>
        </>
    )
}

export default  Pagintaion;

