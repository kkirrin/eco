import React from "react";

export const PriceFilter = ({ min, max, current, onPriceChange }) => {
    const handleMinChange = (e) => {
        const newMin = e.target.value !== "" ? Number(e.target.value) : min;
        onPriceChange([newMin, current]);
      };
    
      const handleMaxChange = (e) => {
        const newMax = e.target.value !== "" ? Number(e.target.value) : max;
        onPriceChange([min, newMax]);
      };

      console.log(min, max, current)

    return (
    
            <div className="">
                <input type="number" value={min} onChange={handleMinChange} className="">
                    {min}
                </input>
                <span>-</span>
                <input type="number" value={max} onChange={handleMaxChange} className="">
                    {max}
                </input>
            </div>
        
    )


}