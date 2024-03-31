import { useState, Suspense} from "react"
import { useActions } from '@/hooks/useActions'

import Image from "next/image"
import Link from "next/link"

import styles from '@/app/css/shop.module.css'
import productStyles from '@/app/css/product.module.css'
import {useCustomers} from "@/hooks/useStater";
import React from "react"

export const ProductCard = ({item = {
    id: 1,
    image: "/testProduct.png",
    title: "Вал среднего редуктора вход (без масл. насоса)",
    stock: 20,
}}) => {

    const [product, setProduct] = useState((item.attributes?.id1c) ? {
            id: item.id,
            id1c: (item.attributes?.id1c) ? item.attributes.id1c : '',
            category: (item.attributes?.categories?.data) ? item.attributes.categories.data.map(item => item.id) : [],
            image: (item.attributes?.imgs?.data) ? item.attributes.imgs.data[0].attributes.url : '/noImage.jpg',
            title: item.attributes?.title,
            description: item.attributes?.description, //Сейчас нету, так на будущее
            stock: Number.parseInt(item.attributes.stock),
            storeplace: item.attributes.storeplace,
            attributes: (item.attributes.Attributes?.attributes) ? item.attributes.Attributes.attributes.map(item => {
                if(item.type === "Number") {
                    return({
                        name: item.name,
                        type: item.type,
                        value: Number.parseInt(item.value)
                    })
                }
                return item
            }) : [],
            quantitySales: Number.parseInt(item.attributes.quantitySales),
            price: (item.attributes.price) ? item.attributes.price : 1,
            priceOpt: (item.attributes.priceOpt) ? item.attributes.priceOpt : 0,

        } : false)

    const [quantity, setQuantity] = useState(1);
    const [textToCart,setTextToCart] = useState('В корзину');

    const plus = () => (quantity < product.stock) ? setQuantity(quantity + 1) : null;
    const minus = () => (quantity > 1) ? setQuantity(quantity - 1) : null;

    const {addToCart} = useActions();
    const customer = useCustomers();

    const handleAddToCart = (product) => {
        const makeMutableProduct = {...product};
              makeMutableProduct.quantityForBuy = quantity;
        addToCart(makeMutableProduct);
        setTextToCart('Добавлено!');
        setTimeout(() => {
            setTextToCart('Добавить еще?');
        }, 1000);
    }

    return(
        <Suspense fallback={<div>Загрузка...</div>}>

            <article className = {`${styles.productCard}`}>

            <Link className = {styles.productCartLink} href = {`/routes/shop/products/${product.id}`}>
                <div className = {`${styles.productCardImage}`}>
                    {
                        (product) ?
                        (Array.isArray(product?.image[0])) ?
                            // @ts-ignore
                            <Image unoptimized src= {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${product?.image[0]}`} alt = {product.title} fill />
                                           :
                            // @ts-ignore
                            (product?.image) ?
                               <Image unoptimized src= {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_FRONT}${product?.image}`} alt = {product.title} fill />
                                :
                                <div className = {`${productStyles.singleProductImg}`}>
                                    <Image unoptimized src= {`/noImage.jpg`} alt = {product.title} fill />
                                </div>
                            :
                            <div className = {`${productStyles.singleProductImg}`}>
                                <Image unoptimized src= {`/noImage.jpg`} alt = {product.title} fill />
                            </div>
                    }
                </div>

                <h3 className = {`${styles.productCardTitle}`}>{product.title}</h3>
                <p className = {styles.price}>
                    {(customer.authStatus && customer.type == "Оптовый покупатель") ? (product.priceOpt) ? product.priceOpt : product.price : product.price}
                    ₽
                </p>

            </Link>
                <div className = {styles.productCartDownBlock}>

                    <button
                        onClick = {() => handleAddToCart(product)}
                        className = {`${styles.addToCartButton}`}>
                        {textToCart}
                    </button>

                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="https://www.w3.org/2000/svg">
                        <path d="M34.7071 23.2071C35.0976 22.8166 35.0976 22.1834 34.7071 21.7929L28.3431 15.4289C27.9526 15.0384 27.3195 15.0384 26.9289 15.4289C26.5384 15.8195 26.5384 16.4526 26.9289 16.8431L32.5858 22.5L26.9289 28.1569C26.5384 28.5474 26.5384 29.1805 26.9289 29.5711C27.3195 29.9616 27.9526 29.9616 28.3431 29.5711L34.7071 23.2071ZM11 23.5L34 23.5L34 21.5L11 21.5L11 23.5Z" fill="#ACACAC"/>
                    </svg>

                </div>
            </article>
        </Suspense>
    )
}

/*
       Количество

         <div className = {`${styles.productCardQuntity}`}>
              <button onClick ={minus} className = {`${styles.productCardButton}`}><Image unoptimized src = {"/minus.svg"} alt = "Кнопка для уменьшения количества товара" fill/></button>
              <p>{quantity} </p>
              <button onClick ={plus} className = {`${styles.productCardButton}`}><Image unoptimized src = {"/plus.svg"}  alt = "Кнопка для увеличения количества товара" fill/></button>
         </div>
 */

/*

НАЛИЧИЕ
                <div className = {styles.stock}>
                    <div className = {styles.iconStock}>
                        <Image unoptimized alt = "Иконка в наличии" src = {"/check.svg"} fill />
                     </div>
                     <p>В наличии</p>
                </div>

 */
