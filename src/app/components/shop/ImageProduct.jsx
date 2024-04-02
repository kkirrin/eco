import React from "react"
import Image from 'next/image';
import productStyles from "@/app/css/product.module.css";

export const ImageProduct = ({imgs, imgData, imgDataFirst, data, title, imgUrl, imgAlt  }) => {
  return (
    
      (typeof data != 'undefined' && imgs && Array.isArray(imgData) && imgDataFirst) ?
              <div className = {`${productStyles.singleProductImg}`}>
                <Image unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${imgUrl}`} alt = {imgAlt} fill />
              </div>
          :
          <div className={productStyles.singleProductImg}>
            <Image unoptimized src="/noImage.jpg" alt={title} fill />
          </div>
    

  )
}