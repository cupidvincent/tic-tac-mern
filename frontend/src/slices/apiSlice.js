import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'
console.log('import.meta.env.MODE',import.meta.env.MODE)
const baseQuery = fetchBaseQuery({
    baseUrl: '' 
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:[
        'Game'
    ],
    endpoints: (builder) => ({})
})