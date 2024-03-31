'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";

import {useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

import styles from '@/app/css/mainpage.module.css'


const BigNavButtons = ({}) => {

    useEffect(() => {

    })

    return(
        <section className = {styles.navBigButtonsContainer}>
            <article>
                <Link href = {`/routes/pages/opt`} >
                    <div className={`${styles.toRow}`}>
                        <h3>Оптовикам</h3>
                        <svg xmlns="https://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
                            <path d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.2929L18.3431 0.928934C17.9526 0.538409 17.3195 0.538409 16.9289 0.928934C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9L24 9L24 7L1 7L1 9Z" fill="white"/>
                        </svg>
                    </div>

                    <Image unoptimized src = {`/nav/bigNavButton0.png`} alt = {'Кнопка для перехода в раздел для оптовиков'} fill />
                </Link>
            </article>

            <article>
                <Link href = {`/routes/pages/delivery`} >
                    <div className={`${styles.toRow}`}>
                        <h3>Доставка</h3>
                        <svg xmlns="https://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
                            <path d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.2929L18.3431 0.928934C17.9526 0.538409 17.3195 0.538409 16.9289 0.928934C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9L24 9L24 7L1 7L1 9Z" fill="white"/>
                        </svg>
                    </div>
                    <Image unoptimized src = {`/nav/bigNavButton1.png`} alt = {'Кнопка для перехода в раздел для оптовиков'} fill />
                </Link>
            </article>
        </section>
    )
}

export default  BigNavButtons;
