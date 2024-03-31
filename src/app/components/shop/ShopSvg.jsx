import React from "react";
import productStyles from '@/app/css/product.module.css';

export const ShopSvg = (stock) => {

  if(stock > 0) {
    return (
      <>
        <svg xmlns="https://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
          <path d="M1 5.5L5 9.5L11 1.5" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span> В наличии</span>
      </>
    ) 
  }

    else {
      return (
        <>
          <div style = {{marginLeft: "0"}} className = {`${productStyles.stock}`}>
            {
              (stock > 0 ) ? (<><svg xmlns="https://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                <path d="M1 5.5L5 9.5L11 1.5" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg><span> В наличии</span></>) : (<><span> Нет в наличии</span></>)
            }
          </div>
        </>
      )
    }
}