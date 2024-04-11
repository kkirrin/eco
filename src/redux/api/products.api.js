import {api} from './api'

export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                mode: "cors",
                url: '/products?populate=*&filters[stock][$notNull]=true&filters[stock][$ne]=0&sort[0]=title:asc',
                method: 'GET',
            }),
        }),
        getProduct: builder.query({
            query: (id = 0) => ({
                 mode: "cors",
                 url: `/products/${id}/?populate=*&filters[stock][$notNull]=true&filters[stock][$ne]=0&sort[0]=title:asc`,
                 method: 'GET',
                }),

            }),
        getProductOnPage: builder.query({
            query: (params = {}) => ({
                mode: "cors",
                url: `/products/?populate=*&pagination[page]=${params.page}&pagination[pageSize]=${params.pageSize}${(params.filters[0]) ? `&filters[categories][id][$eq]=${params.filters[0]}` : ''}${(params.filters[1])  ? `&filters[price][$eq]=${params.filters[1]}`: ''}&filters[stock][$notNull]=true&filters[stock][$ne]=0&sort[0]=title:asc`,
                method: 'GET',
            }),
        }),  
        })
})


export const {useGetProductsQuery, useGetProductQuery, useGetProductOnPageQuery} = api;
