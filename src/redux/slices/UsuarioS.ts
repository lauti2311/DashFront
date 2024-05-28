import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Usuario from '../../types/Usuario';

interface InitialState {
  usuario: Usuario[]; // Cambia el tipo del estado a una matriz de Usuario
}

const initialState: InitialState = {
  usuario: [],
}

export const usuariosSlice = createSlice({
  name: 'usuarioState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Usuario[]>) => {
      state.usuario = action.payload;
    },
    resetUser: (state) => {
      state.usuario = [];
    }
  },
})

export const { setUser, resetUser } = usuariosSlice.actions;

export default usuariosSlice.reducer;
