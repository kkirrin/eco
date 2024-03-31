import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//const BASE_URL = process.env.NEXT_PUBLIC_URL_API
////console.log(BASE_URL)

  export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['category'],
    baseQuery: fetchBaseQuery({
          baseUrl: `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}/api`,
          mode: "cors",
          method: 'PATCH',
          credentials: "same-origin",
          prepareHeaders: (headers) => {
                const accessToken = true //localStorage.getItem("token");
                if (accessToken) {
                    headers.set("authorization", `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`);
                }
                return headers;
          },
        }
    ),
    endpoints: (builder) => ({
      main: builder.query({
        query: () => '/',
      }),
    })
  })

