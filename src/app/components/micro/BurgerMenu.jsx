'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'

import styles from '@/app/css/header.module.css'

import {NavigationBar} from '@/app/components/micro/Navigation'
import {Cart} from "@/app/components/shop/Cart";
import Socials from "@/app/components/micro/Socials";

const BurgerMenu = () => {

    const [open, setOpen] = useState(false)

    useEffect(() => {

        if(!window) return

        if(open) {
                document.body.style.overflow = "hidden"
                document.body.style.maxHeight = "100svh"
            //console.log('open')
                } else {
                document.body.style.overflow = "visible"
                document.body.style.maxHeight = "max-content"
        }

    },[open])

    return(
        <>
            <div onClick = {() => setOpen(!open)} className = {`${styles.burgerIcon}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav className = {`${styles.burgerContainer} ${(open) ? styles.openBurger : styles.closedBurger}`}>

                <div onClick = {() => setOpen(!open)} className = {`${styles.burgerIcon}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <Cart inBurger = {true} />

                <NavigationBar burgerSetter = {setOpen} />

                <div className={styles.burgerSocialContainer}>
                    <h3>Мы в соцсетях</h3>
                    <Socials />
                </div>

                <div className={styles.burgerContactsContainer}>
                    <a href = "tel:8 (902) 061-42-97">8 (902) 061-42-97</a>
                    <p>Заказать звонок</p>
                    <a href = "mail:comdir@ekonika-moto.ru ">comdir@ekonika-moto.ru</a>
                    <p>Написать на почту</p>
                </div>

            </nav>
        </>
    )
}

export default BurgerMenu;
