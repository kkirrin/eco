'use client'
import Image from 'next/image'
import {useEffect} from "react";

import styles from '@/app/css/service.module.css'

import { Loader } from '@/app/components/micro/Loader'

import { useStater } from '@/hooks/useStater'

import {useGetServicesQuery} from "@/redux/api/pages.api";


export const Services = ({}) => {

    const {isLoading, error, data} = useGetServicesQuery();

    useEffect(() => {},[data])

    return(
        <section className = {`${styles.serviceContainer}`}>
            <div className = {`${styles.upBlock}`}>
                <div className = {`${styles.left}`}>
                    <h2>предоставляем <strong>широкий</strong><br /> спектр услуг</h2>
                </div>
                <div className = {`${styles.right}`}>
                    <p>
                       Согласно предыдущему, рекламное сообщество консолидирует культурный креатив. Взаимодействие корпорации и клиента
                    </p>
                </div>
            </div>
            <div className = {`${styles.downBlock}`}>
                {
                        (!data) ? (<Loader />)
                                :
                          data.data.map((item, index) => {
                            return(
                                <article key = {`serviceKey_${index}`} className = {`${styles.service}`}>
                                    <div className={`${styles.serviceIco}`}>
                                        <Image unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.ico.data.attributes.url}`} alt = {item.attributes.name} fill/>
                                    </div>
                                    <h3>{item.attributes.name}</h3>
                                    <p>{item.attributes.desc}</p>
                                </article>
                            )
                          })
                }
            </div>
        </section>
    )
}
