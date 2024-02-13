import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    removeItem: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },

    updateItem: (state, action) => {
      const { service_id } = action.payload;
      return {
        ...state,
        items: [
          ...state.items.map((item) =>
            service_id === item.service_id ? { ...action.payload } : item
          ),
        ],
      };
    },

    updateCart: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCart: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, updateCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
