import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  searchTerm: string;
  category: string;
  offset: number;
  limit: number;
  selectedProductId: string | null;
}

const initialState: ProductsState = {
  searchTerm: "",
  category: "",
  offset: 0,
  limit: 10,
  selectedProductId: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSelectedProductId: (state, action: PayloadAction<string | null>) => {
      state.selectedProductId = action.payload;
    },
    clearAll: () => {
      return initialState;
    },
  },
});

export const {
  setSearchTerm,
  setCategory,
  setOffset,
  setLimit,
  setSelectedProductId,
  clearAll,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
