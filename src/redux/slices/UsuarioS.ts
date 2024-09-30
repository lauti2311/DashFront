import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Usuario from '../../types/Usuario';

interface IInitialState<T> {
  data: T;
}

// Estado inicial específico
const usuarioState: IInitialState<Usuario[]> = {
  data: [],
};

export const usuarioSlice = createSlice({
  name: 'usuarioState',
  initialState: usuarioState,
  reducers: {
    setData: (state, action: PayloadAction<Usuario[]>) => {
      state.data = action.payload;
    },
    resetData: (state) => {
      state.data = [];
    }
  },
});

export const { setData: setUsuario, resetData: resetUsuario } = usuarioSlice.actions;

export default usuarioSlice.reducer;
