import { configureStore } from '@reduxjs/toolkit'
import articuloManufacturadoSlice from '../slices/articuloManufacturado'
import { articuloInsumoSlice } from '../slices/articuloInsumo' 
import { PromocionSlice } from '../slices/Promocion'
import { categoriaSlice } from '../slices/categoria'
import { usuariosSlice } from '../slices/UsuarioS'
import modalReducer from '../slices/Modal'
import { empresasSlice } from '../slices/Empresa'
import { sucursalSlice } from '../slices/Sucursal'

export const store = configureStore({
  reducer: {
    articuloManufacturado: articuloManufacturadoSlice,
    articuloInsumo: articuloInsumoSlice.reducer, 
    promocion: PromocionSlice.reducer,
    categoria: categoriaSlice.reducer,
    usuario: usuariosSlice.reducer,
    modal: modalReducer,
    empresas: empresasSlice.reducer,
    sucursales: sucursalSlice.reducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
