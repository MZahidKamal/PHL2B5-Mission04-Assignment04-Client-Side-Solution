import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({

    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://phl-2-b5-mission04-assignment04-ser.vercel.app'}),

    // Globally setting data refetching behavior
    // refetchOnFocus: true,
    // refetchOnReconnect: false,
    // refetchOnMountOrArgChange: true,

    tagTypes: ['Books', 'Book', 'Borrows'],

    endpoints: (builder) => ({


        createABook: builder.mutation({
            query: (newBookObj) => ({
                url: '/api/books',
                method: 'POST',
                body: newBookObj
            }),
            invalidatesTags: ['Books']
        }),


        getAllBooks: builder.query({
            query: () => '/api/books',
            providesTags: ['Books']
        }),


        getABookById: builder.query({
            query: (bookId) => `/api/books/${bookId}`,
            providesTags: ['Book']
        }),


        editABook: builder.mutation({
            query(updatedBookObj){
                const {_id, ...body} = updatedBookObj
                return {
                    url: `/api/books/${_id}`,
                    method: 'PUT',
                    body: body
                }
            },
            invalidatesTags: ['Books', 'Book']
        }),


        deleteABook: builder.mutation({
            query(bookId){
                return {
                    url: `/api/books/${bookId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Books', 'Book']
        }),


        borrowABook: builder.mutation({
            query: (newBorrowObj) => ({
                url: '/api/borrow',
                method: 'POST',
                body: newBorrowObj
            }),
            invalidatesTags: ['Books', 'Book', 'Borrows']
        }),


        getBorrowSummary: builder.query({
            query: () => '/api/borrow',
            providesTags: ['Borrows']
        }),

    }),
})


export const {
    useCreateABookMutation,
    useGetAllBooksQuery,
    useGetABookByIdQuery,
    useEditABookMutation,
    useDeleteABookMutation,
    useBorrowABookMutation,
    useGetBorrowSummaryQuery,
} = baseApi;


// To Learn more, visit (https://redux-toolkit.js.org/rtk-query/overview).
