import { apiSlice } from "../api/apiSlice";

export const wishListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishList: builder.mutation({
      query: (data) => ({
        url: "wishlist/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishList"],
    }),

    deleteFromWishList: builder.mutation({
      query: (id) => ({
        url: `wishList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishList"],
    }),

    getWishList: builder.query({
      query: (id) => `wishList/${id}`,
      providesTags: ["wishList"],
    }),
  }),
});

export const { useAddToWishListMutation, useDeleteFromWishListMutation, useGetWishListQuery } = wishListApi;
