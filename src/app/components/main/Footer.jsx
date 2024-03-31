'use client'
import React, {useState,useEffect, useRef} from 'react';
import Image from 'next/image'
import Link from 'next/link'

import {useGetContactsQuery} from "@/redux/api/contacts.api";

import styles from '@/app/css/footer.module.css'

import {Loader} from "@/app/components/micro/Loader";
import {ProductRow} from "@/app/components/shop/ProductRow";
import {CallBack} from "@/app/components/micro/CallBack";
import {useGetSocialQuery} from "@/redux/api/socials.api";
import CategoriesList from "@/app/components/shop/CategoriesList";
import Socials from "@/app/components/micro/Socials";


export const Footer = ({}) => {

  const {isLoading, error, data} = useGetContactsQuery();

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {},[data])

  return(
    <footer className = {`${styles.footerContainer}`}>

        <ProductRow category = {process.env.NEXT_PUBLIC_VELOPART_ID} place = ""/>

        <div className = {`${styles.footerBlock0}`}>
            <div className={`${styles.footerColumn}`}>
                <h3>Мы в соцсетях</h3>
                <Socials />
            </div>
            <div className={`${styles.footerColumn}`}>
                <CallBack />
            </div>
            <div className={`${styles.footerColumn}`}>
                <a href = {`mailto:${(!isLoading) ? (typeof data != 'undefined' && data.data) ? data.data[0].attributes.MainEmail : null : null}`}>{(!isLoading) ?  (typeof data != 'undefined' &&  data.data) ? data.data[0].attributes.MainEmail : null : null}</a>
                <a href = {`mailto:${(!isLoading) ? (typeof data != 'undefined' && data.data) ? data.data[0].attributes.MainEmail : null : null}`}>Написать на почту</a>
            </div>

        </div>

        <div className = {`${styles.footerBlock1}`}>
            <div className={`${styles.footerColumn}`}>
                <h5>Roliz.Ru</h5>
                <p>
                    Оптовая и розничная продажа мотоциклов,<br /> запчастей, велосипедов и экипировки.
                </p>
                <a target = "_blank" href = {`https://www.google.com/maps/place/${(!isLoading) ? (typeof data != 'undefined' && data.data) ? data.data[0].attributes.MainAdress : null : null}`}>{(typeof data != 'undefined' && data.data) ? data.data[0].attributes.MainAdress : null }</a>
                <a target = "_blank" href = {`https://www.google.com/maps/place/${(!isLoading) ? (typeof data != 'undefined' && data.data) ? data.data[0].attributes.OfficeUssur : null : null}`}>{(typeof data != 'undefined' && data.data) ? data.data[0].attributes.OfficeUssur : null }</a>
            </div>
            <div className={`${styles.footerColumn}`}>
                <h5>Клиентам</h5>
                <Link href = {`${'/routes/pages/delivery'}`}>Доставка и оплата</Link>
                <Link href = {`${'/routes/pages/about'}`}>О компании</Link>
                <Link href = {`${'/routes/pages/opt'}`}>Оптовым покупателям</Link>
                <Link href = {`${'/routes/pages/contacts'}`}>Контакты</Link>
            </div>
            <div className={`${styles.footerColumn}`}>
                <h5>Каталог</h5>
                <CategoriesList />
            </div>
        </div>

        <div className = {`${styles.footerBlock2}`}>
            <div className={`${styles.footerColumn}`}>
                <p>
                    <span>ООО Roliz © {year}</span>
                    все права защищены
                </p>
            </div>
            <div className={`${styles.footerColumn}`}>
                <Link href = "/routes/political">Политика конфиденциальности</Link>
            </div>

        </div>

    </footer>
  )
}



/*
          <div className = {`${styles.footerLeftComponent}`}>
            {
              (isLoading) ? <Loader />
                          : (data)
                          ?
                                <>
                                  <a href = {`tel:${data.data.attributes.phone}`} target = "_blank">{data.data.attributes.phone}</a>
                                  <div className= {`${styles.leftContacts}`}>
                                    <a href = {`mailto:${data.data.attributes.email}`} target = "_blank">{data.data.attributes.email}</a>
                                    <a href = {`adress:${data.data.attributes.adress}`} target = "_blank">{data.data.attributes.adress}</a>
                                  </div>
                                  <div className = {`${styles.footerDawnLeftBlock}`}>
                                    <p>© {year} Грузомир </p> <Link href = "/routes/political">Политика конфиденциальности</Link>
                                  </div>
                                </>
                          : <h3>Ошибка...Компонент: Footer</h3>
            }
          </div>
 */
