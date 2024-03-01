// formDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: [],
  reducers: {
    setFormDataStore: (state, action) => {
     // return { ...state, ...action.payload };
      state.push(action.payload);
   console.log(action.payload)
    },
    clearFormData: () => []
    // clearFormData: (state) => {
    //   return {
    //     fullName: '',
    //     addressLine1: '',
    //     addressLine2: '',
    //     mobile: '',
    //     city: '',
    //     state: '',
    //     postalCode: ''
    //   };
    // }
  }
});

export const { setFormDataStore, clearFormData } = formDataSlice.actions;
// export const selectFormData = (state) => state.formData;
export default formDataSlice.reducer;
