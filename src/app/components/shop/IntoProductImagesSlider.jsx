'use client'

import React, {useEffect, useRef, useState} from 'react'

import {useMain, useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";
import productStyles from "@/app/css/product.module.css";
import Image from "next/image";
import { ImageProduct } from './ImageProduct';

export const IntoProductImagesSlider = ({data, title}) => {

    const [selectedImages, setSelectedImages] = useState(0)

    const [scrollSpeed,] = useState(200)

    const refSlider = useRef()

    const {mobile} = useMain()

    const handleWheel = (evt) => {
        const container = evt.currentTarget;
        const isInContainer = container.contains(evt.target);

        if (isInContainer) {
            evt.preventDefault();
            const scrollAmount = evt.deltaY < 0 ? -scrollSpeed : scrollSpeed;
            container.scrollLeft += scrollAmount;
        }
    }

    useEffect(() => {
        const handleDocumentWheel = (evt) => {
            const container = document.querySelector(`.${productStyles.sliderThumbs}`);
            if (container && container.contains(evt.target)) {
                handleWheel(evt);
            }
        }

        document.addEventListener('wheel', handleDocumentWheel, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleDocumentWheel);
        }
    }, []);

    useEffect(() => {

    },[selectedImages])

    if(!data) {

        return(
            <article className = {`${productStyles.imageBlock}`}>
                <div className = {`${productStyles.singleProductImg}`}>
                    <Image unoptimized src= {`/noImage.jpg`} alt = {title} fill />
                </div>
            </article>
        )

    }

    return(
        <article className = {`${productStyles.imageBlock}`}>


            <ImageProduct 
                data={data}
                selectedImages={selectedImages}
            />

            <div
                onWheel={(evt) => {
                    handleWheel(evt)
                }}
                className = {`${productStyles.sliderThumbs}`}>
                {
                    (data && Array.isArray(data) && data[1]) ?

                        data.map( (item, index) => {
                            return(
                                <div
                                    onClick = { (evt) => {
                                        if(!mobile) {
                                            setSelectedImages(index)
                                        }}
                                    }
                                    onTouchStart = { (evt) => {
                                            setSelectedImages(index)
                                        }}
                                    className = {`${productStyles.singleProductImg}`}>
                                    <Image unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.url}`} alt = {item.attributes.alt} fill />
                                </div>
                            )
                        })

                        : null
                }
            </div>

        </article>
    )
}
