import {useGetCategoriesQuery} from "@/redux/api/categories.api";
import Link from "next/link";
import Image from "next/image";

import styles from '@/app/css/shop.module.css'
import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import {Loader} from "@/app/components/micro/Loader";

const CategoriesList = ({}) => {

    const {isLoading, error, data } = useGetCategoriesQuery();
    const {slug} = useParams();

    useEffect(() => {
        ////console.log(data)
    },[data])

    return(
        <>
            {
                (!isLoading) ?
                    (typeof data != 'undefined' && data.data) ? data.data.map(item => {
                        if(!item.attributes.parent.data) {
                            return (
                                <Link style={{
                                    backgroundColor: (typeof slug != 'undefined' && item.id == slug[0]) ? '#212121' : '',
                                }} key={`key_catlist_${item.id}`} href={`/routes/shop/${item.id}`}>
                                    <h4 style={{
                                        fontWeight: (typeof slug != 'undefined' && item.id == slug[0]) ? '600s' : ''
                                    }}>
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
                        }
                            }
                        )
                        : null
                    : <div style = {{
                        position: "relative",
                        height: "60px"
                    }}><Loader /></div>
            }
        </>
    )
}

export default CategoriesList
