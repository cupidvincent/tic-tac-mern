import { apiSlice } from './apiSlice'

const GAME_URL = '/api/game';

export const gameApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGame: builder.mutation({
            query: (data) => ({
                url: `${GAME_URL}/`,
                method: 'POST',
                body: data
            })
        }),
        updateGAme: builder.mutation({
            query: (data) => ({
                url: `${GAME_URL}/`,
                method: 'PUT',
                body: data
            })
        }),
        getGameHistory: builder.mutation({
            query: () => ({
                url: `${GAME_URL}/history`,
                method: 'GET'
            })
        }),
    })
})

export const {
    useCreateGameMutation,
    useUpdateGAmeMutation,
    useGetGameHistoryMutation
} = gameApiSlice;