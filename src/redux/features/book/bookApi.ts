import { apiSlice } from "../api/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: "books/create-book",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useAddBookMutation } = bookApi;
