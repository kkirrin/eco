'use client'

import React, { useEffect, useState } from 'react'

import {useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

import styles from "@/app/css/header.module.css"
import Image from "next/image";
import {useGetCategoriesQuery} from "@/redux/api/categories.api";
import Link from "next/link";

const CatalogButton = ({}) => {

    const [status, setStatus] = useState(false)

    const {mobile} = useStater('main')

    const {isLoading, error, data } = useGetCategoriesQuery();

    useEffect(() => {
        window.addEventListener('scroll', (evt) => {
            if(status) setStatus(!status)
        })
        return window.removeEventListener('scroll', () => {})
    },[status])

    return(
        <>
            <div
                onClick = {() => {
                    if(mobile) return
                    setStatus(!status)
                }}
                onTouchStart={() => {
                    if(!mobile) return
                    setStatus(!status)
                }}
                className = {`${styles.containerCatalog} ${(status) ? styles.activeCatalog : styles.nonActiveCatalog}`}>
                <Button setter = {setStatus} />
            </div>


            <div className = {`${styles.navHeaderCatalog} ${ (status) ? styles.showHeaderCatalog : styles.hideHeaderCatalog }`}>
                  <Image unoptimized src = {'/other/whiteTriagle.svg'} alt = "Декоративный треугольник" fill />

                  <div className = {`${styles.headerCategoryMenu}`}>
                      {
                          (!isLoading) ?
                              (typeof data != 'undefined' &&  data.data != 'undefined') ? data.data.map(item => {
                                          if(!item.attributes.parent.data) {
                                              return(
                                                  <Link key = {`key_catalog_button_${item.id}`} href={`/routes/shop/${item.id}`}>
                                                      <h4>
                                                          {
                                                              (item.attributes.image.data) ?
                                                                  <Image
                                                                      src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.image.data.attributes.url}`}
                                                                      alt={"Изображение категории :" + item.attributes.name} fill
                                                                  />
                                                                  : null
                                                          }

                                                          {item.attributes.name}
                                                      </h4>
                                                  </Link>
                                              )
                                  }})

                                        : null
                              : <h2>Загрузка</h2>
                      }
                  </div>

            </div>
        </>
    )
}

const Button = ({}) => {

    return(
        <div className = {`${styles.buttonCatalog}`}>
            <div className = {`${styles.buttonCatalogIcon}`}>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <h4>Каталог</h4>
        </div>
    )
}

export default  CatalogButton;
