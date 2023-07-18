import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://book-catalog-backend-rose.vercel.app/api/v1/" }),
  tagTypes: ["books", "singleBook", "wishList", "readingList"],
  endpoints: () => ({}),
});
