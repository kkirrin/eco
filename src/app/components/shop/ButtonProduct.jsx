import React from "react";
import Image from 'next/image';
import productStyles from '@/app/css/product.module.css';


export const ButtonProduct = ({ stock, quantity, handleAddToCart, minus, plus, textToCart, data }) => {
  return (
    <div className={productStyles.singleProductAddToCart}>
      <div className={productStyles.productCardQuantity}>
        <button onClick={minus} className={productStyles.productCardButton}>
          <Image unoptimized src={"/minus.svg"} alt="Кнопка для уменьшения количества товара" fill />
        </button>
        <p>{quantity}</p>
        <button onClick={plus} className={productStyles.productCardButton}>
          <Image unoptimized src={"/plus.svg"} alt="Кнопка для увеличения количества товара" fill />
        </button>
      </div>
      <button onClick={() => handleAddToCart(data.data)} className={productStyles.addToCartButton}>
        {stock ? textToCart : "Предзаказ"}
      </button>
    </div>
  );
};
