'use client'

const HOST = 'http://37.140.195.129:1338'

//const JWT = process.env.NEXT_PUBLIC_JWT

import {createSlice, current} from "@reduxjs/toolkit";
/*
async function initCategories(state,action) {
    let result;

        const initialFetch = await fetch(`${HOST}/api/categories?populate=*`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + JWT,
            },
        })
        const json = await initialFetch.json();
        const arrayData = await json.data;
              arrayData.forEach( (item, index) => {

              ////console.log(item)

              const resultObject = {
                    id: item.id,
                    name: item.attributes.name,
                    description: item.attributes.name,
                    image: `${HOST}${ item.attributes.image.data.attributes.url}`,
                    quantityProducts: 0,//item.attributes.product,
                    pages: 0,
                    parent: item.attributes.parents.data,
                    child: item.attributes.childs.data,
              }
            state.push(resultObject)
        })
        //console.log(current(state))
}
*/

/*const initialState = [
    {
        id: 0,
        name: 'Б\У запчасти',
        description: 'Описание категории',
        image: '/testProduct.png',
        quantityProducts: 10,
        pages: 2,
        parent: false,
        child: false,
    },
    {
        id: 1,
        name: 'Запчасти новые',
        description: 'Описание категории',
        image: '/testProduct.png',
        quantityProducts: 10,
        pages: 2,
        parent: false,
        child: [{
            id: 7,
            name: 'Одумайся, возьми дороже',
            description: 'Гипер новые',
            image: '/testProduct.png',
            quantityProducts: 10,
            pages: 2,
            parant: {
                id: 1,
            },
            child: false,
        },
        {
            id: 8,
            name: 'Почти новые',
            description: 'Описание категории',
            image: '/testProduct.png',
            quantityProducts: 10,
            pages: 2,
            parant: {
                id: 1,
            },
            child: false,
        }]
    },
    {
        id: 2,
        name: 'Электрооборудование',
        description: 'Описание категории',
        image: '/testProduct.png',
        quantityProducts: 10,
        pages: 2,
        parent: false,
        child: [{
            id: 6,
            name: 'Суперэлектрооборудование',
            description: 'Описание категории',
            image: '/testProduct.png',
            quantityProducts: 10,
            pages: 2,
            parant: {
                id: 2,
            },
            child: false,
        },]
    },
    {
        id: 3,
        name: 'Запчасти старые',
        description: 'Описание категории',
        image: '/testProduct.png',
        quantityProducts: 10,
        pages: 2,
        parent: false,
        child: [{
            id: 5,
            name: 'Очень старые запчасти',
            description: 'Описание категории',
            image: '/testProduct.png',
            quantityProducts: 10,
            pages: 2,
            parant: {
                id: 2,
            },
            child: false,
        },]
    },
]
*/

const initialState = [];

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: builder => {

    }
})

export const {actions, reducer} = categorySlice;
