import {
  IProduct,
  IProductCategory,
  IProductListResponse,
} from '@/interfaces/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/products',
    timeout: 10000,
  }),
  endpoints: (builder) => ({
    getProductById: builder.query<IProduct, number>({
      query: (id) => `/${id}`,
    }),
    getProductCategories: builder.query<IProductCategory[], void>({
      query: () => '/categories',
    }),
    getProductsByCategory: builder.query<IProductListResponse, string>({
      query: (slug) => `/category/${slug}`,
    }),
    searchProducts: builder.query<IProductListResponse, string>({
      query: (q) => (q ? `/search?q=${q}` : ''),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} = productApi;
