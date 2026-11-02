
import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import {Order} from "@/types/type";


type OrderState={
    orders:Order[];
};


const initialState:OrderState={
    orders:[],
}

const orderSlice = createSlice({
    name:"orders",
    initialState,

    reducers:{
        addOrder:(state , action:PayloadAction<Order>)=>{
            state.orders.unshift(action.payload)
        },
    },
});

export const {addOrder} = orderSlice.actions;

export default orderSlice.reducer;