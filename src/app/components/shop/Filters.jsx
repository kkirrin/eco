// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';

import styles from '@/app/css/filters.module.css';

import {useFilters, useStater} from '@/hooks/useStater';
import { Loader } from '@/app/components/micro/Loader';
import {useGetCategoriesQuery} from "@/redux/api/categories.api";
import {useGetProductOnPageQuery} from "@/redux/api/products.api";
import {useActions} from "@/hooks/useActions";
import { PriceFilter } from './PriceFilter';

/**
 *
 * @param {string} string
 * @param {Array} array
 * @returns void[];
 */
const Filters = ({setUpdate = f => f, setPageNumber = f => f, filter}) => {


    const {isLoading, error, data} = useGetCategoriesQuery();

    console.log(data);
    console.log(filter)
    switch(filter.type){
        case "drop":
            return(
                <section className = {`${styles.filtersBlock}`}>
                    <nav>

                    </nav>
                </section>
            )
            break;
        case "category":
            return(
                <section className = {`${styles.filtersBlock}`}>
                    <nav>
                        {
                            (!isLoading) ?
                            (data && data.data) ?
                                    // @ts-ignore
                                    <DropFilter 
                                        key = {`category_${filter.id}_${filter.type}`}
                                        setUpdate = {setUpdate}
                                        item = {filter}
                                        categories = {data.data}
                                        index = {filter.id}
                                    />
                                    : null
                                : null
                        }
                    </nav>
                </section>
            )
            break;
        case "range":
            return(
                <section className = {`${styles.filtersBlock}`}>
                    <nav>
                        <DropFilter key = {`category_${filter.id}_${filter.type}`}
                            item = {filter}
                            index = {filter.id}
                            setPageNumber={setPageNumber}
                        />
                    </nav>
                </section>
            )
            break;
            case "oneSelect":
                return(
                    <section className = {`${styles.filtersBlock}`}>
                        <nav>
                            <OneSelectFilter
                                key = {`category_${filter.id}_${filter.type}`}
                                item = {filter}
                                index = {filter.id}
                            />
                        </nav>
                    </section>
                )
                break;
            case "select":
            return(
                <section className = {`${styles.filtersBlock}`}>
                    <nav>
                      <DropFilter key = {`category_${filter.id}_${filter.type}`}
                        item = {filter}
                        index = {filter.id}
                    />
                    </nav>
                </section>
            )
            break;
        case "price": {
            return (
                <section className={`styles.filtersBlock`}>
                    <nav>
                        {
                            (!isLoading) ?
                                (data) ?
                                <RangeFilter 
                                    key = {`category_${filter.id}_${filter.type}`}
                                    item = {filter}
                                    index = {filter.id}
                                    price={data?.data.flatMap(data => data?.attributes?.products?.data?.map(product => product?.attributes))}
                                />
                                    : null
                                : null
                        }

                    </nav>
                </section>
            )
        }
        case "color": {
            return (
                <section className={`styles.filtersBlock`}>
                    <nav>
                        <DropFilter key = {`category_${filter.id}_${filter.type}`}
                                    item = {filter}
                                    index = {filter.id}
                        />
                    </nav>
                </section>
            )
        }
        default:
            return(
                <section className = {`${styles.filtersBlock}`}>
                </section>
            )
    }
}

/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */
const DropFilter = ({setUpdate = f => f, item, index, type, categories = []}) => {

    const [valueSelect, setValueSelect] = useState('')

    const refSelect = useRef();

    const {createFilters} = useActions()

    const handleChange = () => {
        setValueSelect(refSelect.current.value, () => {

        })
    }

    useEffect(() => {
        //console.log(valueSelect)
        createFilters(valueSelect)
    },[valueSelect])

    return(
        <div key = {index} className = {`${styles.filterItem}`}>

            <h4>{item.name}</h4>

        <div className={`${styles.sameFilter}}`}>
                <select id={`drop_${item.id}`} key = {`key_dropdown_upgrade_${valueSelect}`} ref = {refSelect} onChange = { (evt) => handleChange()} value = {valueSelect}>
                    {
                        (categories) ?
                            categories.map( (cat) => {
                                if(cat)
                                    return(
                                        <option key = {`key_dropdowncat_${cat.id}`} value={cat.id}>{cat.attributes.name}</option>
                                    )
                            })
                            : null
                    }
                </select>

        </div>
    </div>
    )
}

/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */
const SelectFilter = ({item, index, type}) => {

    return(
        <div key = {index} className = {`${styles.filterItem}`}>

            <h4>{item.name}</h4>

            <div className={`${styles.sameFilter}}`}>
                {
                    item.values.map( (item, index) => {
                        return(
                            <div key = {`key_select_filter${index}`} className={`${styles.checkRow}`}>
                                <input type = "checkbox" value={item} className={`${styles.checkItem}`} />
                                <p className={`${styles.checkValue}`}>{item}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */
const OneSelectFilter = ({item, index, type}) => {

    return(
        <div key = {index} className = {`${styles.filterItem}`}>

            <h4>{item.name}</h4>

            <div className={`${styles.sameFilter}}`}>
                {
                    item.values.map( (item, index) => {
                        return(
                            <div key = {`key_oneselect_filter${index}`}  className={`${styles.checkRow}`}>
                                <input type = "checkbox" value={item} className={`${styles.checkItem}`} />
                                <p className={`${styles.checkValue}`}>{item}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */
const RangeFilter = ({item, index, type, price}) => {


    
    const [selectedValues, setSelectedValues] = useState([])
    const priceData = [];
    
    
    price.map((item, i) => {
        priceData.push({ price: item.price });
    });

    const maxPrice = priceData.reduce((max, current) => { 
        return max > current ? max : current; 
    }); 
    
    const minPrice = priceData.reduce((min, current) => { 
        return min < current ? min : current; 
    });

    const expensiveProducts = priceData.filter(product => {
        product.price <= maxPrice
    }
        
    )

    const cheapProducts = priceData.filter(product => {
        product.price = minPrice
    }
    )
    
    // console.log(cheapProdcuts)
    // console.log(expensiveProducts)
    // console.log(cheapProducts)
    
    const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);
    
    console.log(maxPrice);
    console.log(minPrice);
    
    
    const handlePriceRangeChange = (event, newValue) => {
        setPriceRangeValue(newValue);
      };
    
      const handleCustomPriceChange = (newValues) => {
        setPriceRangeValue(newValues);
      };
    
    const handlePriceRange = (value) => {
        if(selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item!== value))
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    }

    // <PriceFilter 
    //     min={minPrice} 
    //     max={maxPrice} 
    //     current={priceRangeValue[0]} 
    //     onPriceChange={handlePriceRangeChange} 
    // />


    return(
        <div key = {index} className = {`${styles.filterItem}`}>

            <h4>{item.name}</h4>

            <div className={`${styles.sameFilter}}`}>
                {
                    item.values.map( (value, index) => {
                        return(
                            <div key={index} className={`${styles.rangeRow}`}>
                             <input
                                type="range"
                                value={value}
                                className={styles.checkItem}
                                onChange={() => handleCheckbox(value)}
                                checked={selectedValues.includes(value)}
                            
                            />
                            <p className={selectedValues.includes(value) ? `${styles.checkValue} ${styles.selected}` : styles.checkValue}>{value}</p>                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Filters;
