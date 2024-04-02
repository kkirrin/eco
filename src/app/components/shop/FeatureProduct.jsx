import React from "react";
import productStyles from '@/app/css/product.module.css';

export const FeatureProduct = ({ attributes }) => {
  return (
    <>
      <div className={productStyles.attrBlock}>
        <h3 className={productStyles.attrHeader}>Характеристики</h3>
        <div className={productStyles.attrList}>
          {
            attributes ? 
              Object.entries(attributes).map(([key, value], index) => (
                <div key={`${key}_${index}`} className={productStyles.attrRow}>
                  <p>{key}</p>
                  <p></p>
                  <p>{value}</p>
                </div>
              ))
            : <p style={{ color: 'red' }}>У товара не определены характеристики</p>
          }
        </div>
      </div>
    </>
  );
};