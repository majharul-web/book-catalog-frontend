import { apiSlice } from "../api/apiSlice";

export const readingListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToReadingList: builder.mutation({
      query: (data) => ({
        url: "readingList/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["readingList"],
    }),
    editReadingList: builder.mutation({
      query: ({ id, data }) => ({
        url: `readingList/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["readingList"],
    }),
    deleteFromReadingList: builder.mutation({
      query: (id) => ({
        url: `readingList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["readingList"],
    }),

    getReadingList: builder.query({
      query: (id) => `readingList/${id}`,
      providesTags: ["readingList"],
    }),
  }),
});

export const {
  useAddToReadingListMutation,
  useDeleteFromReadingListMutation,
  useGetReadingListQuery,
  useEditReadingListMutation,
} = readingListApi;
