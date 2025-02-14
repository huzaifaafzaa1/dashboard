import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BagProduct } from "./type"; // Import BagProduct instead of Product

interface BagState {
  bagProducts: BagProduct[]; // Use BagProduct here
}

const initialState: BagState = {
  bagProducts: [],
};

const bagSlice = createSlice({
  initialState,
  name: "bag",
  reducers: {
    addToBag: (state, action: PayloadAction<BagProduct>) => { // Use BagProduct
      const existingProduct = state.bagProducts.find(
        (product) => product._id === action.payload._id
      );
      if (!existingProduct) {
        // Add product with initial count of 1
        state.bagProducts.push({ ...action.payload, count: 1 });
      }
    },

    increaseCount: (state, action: PayloadAction<string>) => {
      const product = state.bagProducts.find(
        (item) => item._id === action.payload
      );
      if (product) {
        product.count += 1;
      }
    },

    decreaseCount: (state, action: PayloadAction<string>) => {
      const product = state.bagProducts.find(
        (item) => item._id === action.payload
      );
      if (product && product.count > 1) {
        product.count -= 1;
      } else {
        // Remove the product if count is 0
        state.bagProducts = state.bagProducts.filter(
          (item) => item._id !== action.payload
        );
      }
    },

    removeFromBag: (state, action: PayloadAction<string>) => {
      state.bagProducts = state.bagProducts.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { addToBag, increaseCount, decreaseCount, removeFromBag } = bagSlice.actions;
export default bagSlice.reducer;
