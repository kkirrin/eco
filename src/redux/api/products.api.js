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
                mode: "cors", //&filters[stock][$notNull]=false
                url: `/products/?populate=*&pagination[page]=${params.page}&pagination[pageSize]=${params.pageSize}${(params.filters[0]) ? `&filters[categories][id][$eq]=${params.filters[0]}` : ''}${(params.filters[1]) ? `&filters[categories][id][$eq]=${params.filters[1]}` : ''}${(params.filters[2]) ? `&filters[categories][id][$eq]=${params.filters[2]}` : ''}&filters[stock][$notNull]=true&filters[stock][$ne]=0&sort[0]=title:asc`, //&filters[stock][$notNull]=false
                method: 'GET',
            }),
        }),
        getFiltered: builder.query({
            query: (params = {}) => {
                const filters = [];
                const stringFilters = makeStringFilters(filters)
                return({
                    mode: "cors",
                    url: `/products/?populate=*${stringFilters}&sort[0]=title:asc`,
                    method: 'GET',
                })
            }
        })
        })
})

function makeStringFilters(filters = []) {
    if(filters[0] != 'undefined') return ''

    let tempString = '';
        tempString += `${(params.catId) ? '&filters[categories][id][$contains]=' + params.catId : ''}`;
        tempString += `${(params.volume) ? '&filters[categories][id][$contains]=' + params.catId : ''}`;
    return `'}`
}

export const {useGetProductsQuery, useGetProductQuery, useGetProductOnPageQuery} = api;
