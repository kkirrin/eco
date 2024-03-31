'use client'

import '@/app/css/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

//Redux
import {ReduxWrapper} from "@/app/ReduxWrapper"
//Components
import {Header} from  "@/app/components/main/Header"
import {Footer} from "@/app/components/main/Footer"
import Modals from "@/app/components/Modals";
import React from "react";


export default function RootLayout({ children }) {
  return (
    <ReduxWrapper>
      <html lang="ru">
        <head>
            <title>ROLIZ - Лучший магазин мототехники и велосипедов</title>
            <meta name='description' content='ROLIZ - Лучший магазин мототехники и велосипедов. Оригинальные запчастя для всей мото и вело техники.' />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/png" href="https://roliz-moto.ru/favicon.png"/>
        </head>
        <body className={inter.className}>
            <Header />
            {children}
            <Modals />
            <Footer />
        </body>
      </html>
    </ReduxWrapper>
  )
}
