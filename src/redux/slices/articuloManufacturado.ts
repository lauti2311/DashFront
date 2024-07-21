import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import ArticuloManufacturado from '../../types/ArticuloManufacturado';

interface IInitialState<T> {
  data: T;
}

// Estado inicial específico para Promocion[]
const initialArticuloManufacturado: IInitialState<ArticuloManufacturado[]> = {
  data: [],
};

export const articuloManufacturadoSlice = createSlice({
  name: 'articuloManufacturadoState',
  initialState: initialArticuloManufacturado,
  reducers: {
    setData: (state, action: PayloadAction<ArticuloManufacturado[]>) => {
      state.data = action.payload;
    },
    resetData: (state) => {
      state.data = [];
    }
  },
});

export const { setData: setArticuloManufacturado, resetData: resetArticuloManufacturado } = articuloManufacturadoSlice.actions;

export default articuloManufacturadoSlice.reducer;
