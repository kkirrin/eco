'use client'

import React, {useState,useEffect, useRef} from 'react';
import Image from 'next/image'
import Link from "next/link"

import {useCustomers, useMain, useStater} from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import styles from '@/app/css/header.module.css'

import { CallBack } from '@/app/components/micro/CallBack'
import { Cart } from '@/app/components/shop/Cart'
import { SearchForm } from '@/app/components/SearchForm'
import { NavigationBar } from '@/app/components/micro/Navigation'

import BurgerMenu from '@/app/components/micro/BurgerMenu'
import CatalogButton from "@/app/components/micro/CatalogButton"
import {ProfileIcon} from "@/app/components/user/User";


export const Header = ({}) => {

  const state = useStater('pages');

  const {widthScreen, mobile} = useMain('main');

  const {setScreenSize} = useActions()

    useEffect(() => {

        if(!window) return
            document.body.style.overflow = "visible"
            document.body.style.maxHeight = "max-content"

    },[])

    useEffect(() => {
        if(window && !widthScreen) {
            setScreenSize({
                mobile: window.innerWidth < 498,
                widthScreen: window.innerWidth,
                heightScreen:  window.innerHeight
            })
        }
    })

  return(
    <header className = {`${styles.headerContainer}`}>

        <div className = {`${styles.upHeader}`}>

            {
                (!mobile) ?
                    <Link href = "/">
                        <div className = {`${styles.logoContainer}`}>

                            <div className = {`${styles.imgContainer }`}>
                                <Image unoptimized alt = "Логотип компании грузомир" src = "/logo.png" fill/>
                            </div>
                        </div>

                    </Link>
                    : null
            }

            <div className = {`${styles.burgerContainerIcon}`}>
                <BurgerMenu />
            </div>

            <SearchForm />
            {
                (mobile) ?
                        <Link href = "/">
                            <div className = {`${styles.logoContainer}`}>

                                <div className = {`${styles.imgContainer }`}>
                                    <Image unoptimized alt = "Логотип компании грузомир" src = "/logo.png" fill/>
                                </div>
                            </div>

                        </Link>
                    : null
            }
            <CallBack />

            <div className={`${styles.rightHeaderContainer}`}>
                <ProfileIcon />
                <Cart />
            </div>

        </div>

        {
            (!mobile) ?
                <div className = {`${styles.downHeader}`}>

                <CatalogButton />

                <NavigationBar place = {'header'}/>

                <Link href = {'/routes/pages/delivery'} >

                    <div className={`${styles.headerDeliverBlock}`}>
                      <Image unoptimized src = {'/icon/GrayDeliveryIcon.svg'} alt = "Серая иконка" fill />
                      <p>Оплата и доставка</p>
                    </div>

                </Link>

                </div>
            : null
        }

    </header>
  )
}

