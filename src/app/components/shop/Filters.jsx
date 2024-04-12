// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';

import styles from '@/app/css/filters.module.css';

import {useFilters, useStater} from '@/hooks/useStater';
import { Loader } from '@/app/components/micro/Loader';
import {useGetCategoriesQuery} from "@/redux/api/categories.api";
import {useGetProductOnPageQuery, useGetProductQuery} from "@/redux/api/products.api";
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
    // console.log(data)

    const colorData = [
        {color: 'yellow'},
        {color: 'brown'},
        {color: 'orange'},
        {color: 'blue'},
        {color: 'pink'},
        {color: 'white'},
        {color: 'green'},
        {color: 'black'},
        {color: 'red'},
    ]
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
        case "price": 
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
        case "color": {
            return (
                <section className={`styles.filtersBlock`}>
                    <nav>
                        <SelectColor 
                            key = {`category_${filter.id}_${filter.type}`}
                            item = {filter}
                            index = {filter.id}
                            colorArray = {colorData}
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
const DropFilter = ({ setUpdate = f => f, item, index, type, categories = [], price = [] }) => {


    const [valueSelect, setValueSelect] = useState('')

    // const refSelect = useRef();

    const {createFilters} = useActions()


    const handleChange = (e) => {
        setValueSelect(e.target.value);
    };

    useEffect(() => {
        debugger
        createFilters(valueSelect)
        debugger
    },[valueSelect])

    return(
        <div key = {index} className = {`${styles.filterItem}`}>

            <h4>{item.name}</h4>

        <div className={`${styles.sameFilter}}`}>
                <select id={`drop_${item.id}`} key = {`key_dropdown_upgrade_${valueSelect}`}  onChange={handleChange} value = {valueSelect}>
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
const SelectColor = ({item, index, type, colorArray}) => {

    const [valueSelect, setValueSelect] = useState('')

    const refSelect = useRef();

    const {createFiltersColor} = useActions()

    const handleChange = () => {
        setValueSelect(refSelect.current.value)
    }

    useEffect(() => {
        console.log(valueSelect)
        createFiltersColor(valueSelect)
    },[valueSelect])
    

    return(
        <div key = {index} className = {`${styles.filterItem}`}>

            <h4>{item.name}</h4>

            <div className={`${styles.sameFilter}}`}>
                <select className={`${styles.sameFilterColor}`} id={`drop_${item.id}`} key = {`key_dropdown_upgrade_${valueSelect}`} ref = {refSelect} onChange={handleChange} value = {valueSelect}>
                    {
                        (colorArray) ?
                            colorArray.map( (item) => {
                                if(item)
                                    return(
                                        <option key = {`key_dropdowncat_${item.color}`} value={item.color}>{item.color}</option>
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

const RangeFilter = ({ item, index, type, price }) => {

    const { refetch } = useGetProductQuery()

    const [filteredItems, setFilteredItems] = useState([]);
    const priceArray = price.map(item => item.price);

    const minRef = useRef();
    const maxRef = useRef();

    const { createFiltersPrice } = useActions();

    const [valueInput, setValueInput] = useState('');

    const updateFilteredItems = (minValue, maxValue, valueInput) => {
        const newFilteredItems = price.filter((item) => item.price >= minValue && item.price <= maxValue);
        setFilteredItems(newFilteredItems);
        createFiltersPrice(filteredItems);
    }

    const minPrice = priceArray.reduce((min, current) => Math.min(min, current), Number.MAX_VALUE);
    const maxPrice = priceArray.reduce((max, current) => Math.max(max, current), Number.MIN_VALUE);

    const [minValue, setMinValue] = useState(minPrice);
    const [maxValue, setMaxValue] = useState(maxPrice);

    const handleChangeMinValue = () => {
        const updatedValue = parseInt(minRef.current.value, 10);
        setMinValue(updatedValue);
        setValueInput(minRef.current.value);
    };

    const handleChangeMaxValue = () => {
        const updatedValue = parseInt(maxRef.current.value, 10);
        setMaxValue(updatedValue);
        setValueInput(maxRef.current.value);
    };

    useEffect(() => {
        updateFilteredItems(minValue, maxValue, valueInput);
    }, [minValue, maxValue, valueInput]);


    return (
        <div key={index} className={styles.filterItem}>
            <h4>{item.name}</h4>
            <div className={styles.sameFilter}>
                <div className={styles.rangeRow}>
                    <div className={styles.inputRangeWrapper}>
                        <input
                            ref={minRef}
                            id='minPrice'
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={minValue}
                            className={styles.checkItem}
                            onChange={handleChangeMinValue}
                            key={`key_dropdown_upgrade_${valueInput}`}
                        />
                        <span>{minValue}</span>
                    </div>
                    <div className={styles.inputRangeWrapper}>
                        <input
                            ref={maxRef}
                            id='maxPrice'
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={maxValue}
                            className={styles.checkItem}
                            onChange={handleChangeMaxValue}
                            key={`key_dropdown_upgrade_${valueInput}`}
                        />
                        <span>{maxValue}</span>
                    </div>
                </div>
            </div>
        </div>
    );

};



export default Filters;
