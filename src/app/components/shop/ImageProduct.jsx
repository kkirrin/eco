import React from "react"
import Image from 'next/image';
import productStyles from "@/app/css/product.module.css";

export const ImageProduct = ({ data, title, selectedImages  }) => {
  return (
      (data && Array.isArray(data) && data[selectedImages]) ?
        <div className = {`${productStyles.singleProductImg}`}>
          <Image unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${data[selectedImages].attributes.url}`} alt = {data[selectedImages].attributes.alt} fill />
        </div>
          :
          <div className={productStyles.singleProductImg}>
            <Image unoptimized src="/noImage.jpg" alt={title} fill />
          </div>
  )
}