import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'
console.log('import.meta.env.MODE',import.meta.env.MODE)
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.MODE === 'production' ? 'https://tic-tac-toe-h8ml.onrender.com' : '' 
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:[
        'Game'
    ],
    endpoints: (builder) => ({})
})