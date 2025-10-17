import { baseApi } from "@/lib/base-api";
import {
  Product,
  ProductsResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      { offset?: number; search?: string; limit?: number; categoryId?: string }
    >({
      query: ({ offset = 0, search = "", limit = 10, categoryId }) => {
        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("searchedText", search);
        if (categoryId) params.append("categoryId", categoryId);
        return `/products?${params}`;
      },
      providesTags: [{ type: "Products", id: "LIST" }],
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; data: UpdateProductRequest }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),

    searchProducts: builder.query<ProductsResponse, string>({
      query: (searchTerm) =>
        `/products?search=${encodeURIComponent(searchTerm)}`,
      providesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  usePrefetch,
} = productsApi;
