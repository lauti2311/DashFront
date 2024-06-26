import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Categoria from '../../types/Categoria';


interface IInitialState<T> {
  data: T;
}

// Estado inicial específico para Promocion[]
const initialCategoriaState: IInitialState<Categoria[]> = {
  data: [],
};
export const categoriaSlice = createSlice({
  name: 'categoriaState',
  initialState: initialCategoriaState,
  reducers: {
    setCategoria: (state, action: PayloadAction<Categoria[]>) => {
      state.data = action.payload;
    },
    resetCategoria: (state) => {
      state.data = [];
    }
  },
})

export const { setCategoria, resetCategoria } = categoriaSlice.actions;

export default categoriaSlice.reducer;