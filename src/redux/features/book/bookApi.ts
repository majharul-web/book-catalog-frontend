import { apiSlice } from "../api/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: "books/create-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),

    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = bookApi;
