import {createSlice} from "@reduxjs/toolkit";

/**
 * @types
 *  select - мульти Выбор галочкой
 *  range - рэндж. От и до
 *  oneSelect - ВЫбор одной галочки
 *  drop - Выпадающий список
**/

const initialState = [
    {
        id: 0,
        type: 'category',
        name: 'Фильтр по категориям',
        minvalue: 0,
        maxvalue: 0,
        values: [
        ]
    },
    {
        id: 1,
        type: 'price',
        name: 'Фильтр по цене',
        minvalue: 0,
        maxvalue: 0,
        values: [
        ]
    },
    {
        id: 2,
        type: 'color',
        name: 'Фильтр по цвету',
        minvalue: 0,
        maxvalue: 0,
        values: [
        ]
    }

]


const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        createFilters: (state, action) => {
            state[0].values = []
            state[0].values.push(action.payload)
        },
        createFiltersPrice: (state, action) => {
            state[1].values = []
            state[1].values.push(action.payload)
        },
        createFiltersColor: (state, action) => {
            state[2].values = []
            state[2].values.push(action.payload)
        },
    }
})


export const {reducer, actions} = filterSlice;
