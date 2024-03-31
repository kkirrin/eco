'use client'

import Image from 'next/image'
import React, {useState, useEffect} from "react"

import styles from '@/app/css/mainpage.module.css'

import {useActions} from "@/hooks/useActions";

import { ProductRow } from './components/shop/ProductRow'
import { Slider } from './components/Slider'
import  Pluses from './components/Pluses'
import InfiniteSales from "@/app/components/micro/InfiniteSales"
import { Services } from './components/Services'
import { Forms } from './components/Forms'
import {useGetProductOnPageQuery, useGetProductsQuery} from "@/redux/api/products.api"
import {useStater} from "@/hooks/useStater"
import BigNavButtons from "@/app/components/BigNavButtons";
import YouTubeBlock from "@/app/components/YouTubeBlock";
import Head from "next/head";


export default function Home() {

  const {getDataProducts} = useActions()

  const [statusLoad, setStatusLoad] = useState(false);

  const {products} = useStater('products')

  const {setScreenSize} = useActions()

  const {isLoading, error, data} = useGetProductOnPageQuery({
    page: 0,
    catId: false,
    pageSize: 1,
  });

  useEffect(() => {
    (!isLoading) ?
        (data) ?
            getDataProducts(data.data,true)
            : null
        : null
  },[isLoading])

  useEffect(() => {
    if(!statusLoad) {
      setStatusLoad(true)
    }
  })


  return (
    <>
    <main className={styles.main}>

      <Slider />

      <Pluses />

      <ProductRow category = {process.env.NEXT_PUBLIC_MOTO_ID} place = "main" />

      <div className={`${styles.fullWidth} ${styles.darkBlock}`}>
          <InfiniteSales />

        <ProductRow category = {process.env.NEXT_PUBLIC_MOTOPART_ID} place = ""/>
      </div>

      <BigNavButtons />

      <ProductRow category = {process.env.NEXT_PUBLIC_HEAD_ID} place = ""/>

      <YouTubeBlock />

      <ProductRow category = {process.env.NEXT_PUBLIC_VELO_ID} place = ""/>

    </main>
    </>
  )
}
