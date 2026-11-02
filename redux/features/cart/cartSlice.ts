import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "@/types/type";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type IncreaseStock={
  id:number;
  stock:number;
};

type RemoveStock={
  id:number;
  quantity:number;
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Product>
    ) => {
      const product = action.payload;
      
      if(product.stock <=0){
        return;
      }
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product:{...product},
          quantity: 1,
        });
      }
    },

    increaseQuantity: (
  state,
  action: PayloadAction<{ id: number; stock: number }>
) => {
  const { id, stock } = action.payload;

  const item = state.items.find(
    (item) => item.product.id === id
  );

  if (item && stock > 0) {
    item.quantity += 1;
  }
},
    decreaseQuantity: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (
  state,
  action: PayloadAction<{ id: number; quantity: number }>
) => {
  state.items = state.items.filter(
    (item) => item.product.id !== action.payload.id
  );
},
   clearCart:(state , action:PayloadAction<CartItem[]>)=>{
      state.items = [];
   },

   setCart:(
    state,
    action:PayloadAction<CartItem[]>
   )=>{
    state.items = action.payload;

   },
  },
  
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  setCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;