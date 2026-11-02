import {configureStore} from "@reduxjs/toolkit";

import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import ordersReducer from "./features/order/orderSlice";


export const store = configureStore({
    reducer:{
        product:productReducer,
        cart : cartReducer,
        Order: ordersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;