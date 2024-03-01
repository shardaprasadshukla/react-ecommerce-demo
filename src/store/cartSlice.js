import { createSlice } from "@reduxjs/toolkit";
// const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      if(state.find((item)=> item.id==action.payload.id)) {
        state.map((item)=> {
          if(item.id==action.payload.id) {
            item['quantity'] = item['quantity']+1;
          }
        })
      }else {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    quantityUpdate(state, action) {
      state.map((item, index)=> {
        if(item.id==action.payload.id) {
          item['quantity'] = action.payload['quantity'];
        }
      })
    },
  },
});

export const { add, remove, quantityUpdate } = cartSlice.actions;

export default cartSlice.reducer;