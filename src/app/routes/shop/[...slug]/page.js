'use client'
import React, {useState, useEffect} from 'react'

import Image from 'next/image'

import {useParams, useRouter, useSearchParams} from 'next/navigation'
import {useFilters, useMain, useStater} from '@/hooks/useStater'
import {useGetProductOnPageQuery, useGetProductsQuery} from "@/redux/api/products.api";
import { useActions } from '@/hooks/useActions'

import { Loader } from '@/app/components/micro/Loader'
import { ProductCard } from '@/app/components/shop/ProductCard'
import Filters from '@/app/components/shop/Filters'

import styles from '@/app/css/mainpage.module.css'
import stylesShop from '@/app/css/shop.module.css'
import Link from "next/link";
import CategoriesList from "@/app/components/shop/CategoriesList";
import CategoryName from "@/app/components/shop/CategoryName";
import Pagination from "@/app/components/Pagination";
import {useGetCategoriesQuery} from "@/redux/api/categories.api";

export default function Page({}) {

  const router = useRouter();
  const {slug} =  useParams()

  const {mobile} = useMain('main');

  const {getDataProducts} = useActions()

  const [categoryFilter, setCategoryFilter] = useState(-1) //ПЛОХО СО СТАРОГО ПРОЕКТА
  const [showFilters, setShowFilters] = useState(false)
  const [pageNubmer, setPageNumber] = useState(1)
  const [categoriesPag, setCategoriesPag] = useState([]);
  const {isLoading, error, data } = useGetCategoriesQuery();

  const filters = useFilters()

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setCategoriesPag(data.data.filter(item => item.attributes.parent.data == null && item.id == slug).map(item => item.attributes.childs.data.map((item, index) => item.id)))
      }
    }
  }
  ,[data])

  useEffect(() => {},[categoriesPag])

  return (
      <>
        <main className={`${styles.main} ${stylesShop.shopPage}`}>
            {
              <CategoryName id = {(slug[0]) ? slug[0] : "Магазин"} />
            }
          <section className={`${stylesShop.rowCats}`}>
            <CategoriesList />
          </section>

          <section className={stylesShop.shopContainer}>

            <div className = {`${stylesShop.filtersContainer}`}>
              {
                (filters) ?
                    <div className = {`${stylesShop.buttonFiltersContainer}`}>
                      {
                        (mobile) ?
                            <button style = {{
                              opacity: (showFilters) ? '0': '1',
                            }} onTouchStart = {() => {
                              setShowFilters(!showFilters)
                            }}
                            >

                              <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.5C15.7538 10.4998 16.4874 10.2565 17.0919 9.80609C17.6963 9.35568 18.1393 8.72226 18.355 7.99997H21C21.2652 7.99997 21.5196 7.89461 21.7071 7.70708C21.8946 7.51954 22 7.26519 22 6.99997C22 6.73476 21.8946 6.4804 21.7071 6.29287C21.5196 6.10533 21.2652 5.99997 21 5.99997H18.355C18.139 5.27805 17.6958 4.64507 17.0914 4.19504C16.487 3.74502 15.7536 3.50195 15 3.50195C14.2464 3.50195 13.513 3.74502 12.9086 4.19504C12.3042 4.64507 11.861 5.27805 11.645 5.99997H3C2.73478 5.99997 2.48043 6.10533 2.29289 6.29287C2.10536 6.4804 2 6.73476 2 6.99997C2 7.26519 2.10536 7.51954 2.29289 7.70708C2.48043 7.89461 2.73478 7.99997 3 7.99997H11.645C11.8607 8.72226 12.3037 9.35568 12.9081 9.80609C13.5126 10.2565 14.2462 10.4998 15 10.5ZM3 16C2.73478 16 2.48043 16.1053 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5195 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H5.145C5.36103 18.7219 5.80417 19.3549 6.40858 19.8049C7.013 20.2549 7.74645 20.498 8.5 20.498C9.25355 20.498 9.987 20.2549 10.5914 19.8049C11.1958 19.3549 11.639 18.7219 11.855 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5195 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1053 21.2652 16 21 16H11.855C11.639 15.2781 11.1958 14.6451 10.5914 14.195C9.987 13.745 9.25355 13.502 8.5 13.502C7.74645 13.502 7.013 13.745 6.40858 14.195C5.80417 14.6451 5.36103 15.2781 5.145 16H3Z" fill="#262626"/>
                              </svg>

                              <p>
                                Фильтр по параметрам
                              </p>

                            </button>
                            : null
                      }


                      {
                        (showFilters) ?
                            <div
                                onTouchStart = {() => {
                                  setShowFilters(!showFilters)
                                }}
                                className={stylesShop.closeFilters}>
                              <svg xmlns="https://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path d="M0.671875 0.671631L11.9856 11.9853" stroke="#262626"/>
                                <path d="M1.01562 12.3284L12.3293 1.01466" stroke="#262626"/>
                              </svg>
                            </div>
                            : null
                      }

                      <div className={`${stylesShop.headyFilters} ${(showFilters) ? stylesShop.showFilters : stylesShop.hiddenFilters}`}>
                        {
                          filters.map((item, index) => <Filters setPageNumber = {setPageNumber} key = {`key_filter${index}`}  filter={item} />)
                        }
                      </div>
                    </div>
                    : <h3>По какой-то причине фильтры отстутствуют</h3>
              }
            </div>

            <div className={stylesShop.shopBlock}>
              <Pagination  categories={categoriesPag}  pageNumber = {pageNubmer} setPageNumber = {setPageNumber} />
            </div>
          </section>
        </main>
      </>
  )
}

