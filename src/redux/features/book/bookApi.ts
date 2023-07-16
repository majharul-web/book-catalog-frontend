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
    addComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `books/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["singleBook"],
    }),

    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["singleBook"],
    }),

    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation, useSingleBookQuery, useAddCommentMutation } = bookApi;
