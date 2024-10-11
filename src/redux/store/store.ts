import { configureStore } from '@reduxjs/toolkit'
import articuloManufacturadoSlice from '../slices/articuloManufacturado'
import { articuloInsumoSlice } from '../slices/articuloInsumo' 
import { promocionSlice } from '../slices/Promocion'
import { categoriaSlice } from '../slices/categoria'
import modalReducer from '../slices/Modal'
import { empresasSlice } from '../slices/Empresa'
import { sucursalSlice } from '../slices/Sucursal'
import TablaReducer from '../slices/TablaReducer'
import { usuarioSlice } from '../slices/UsuarioS'
import { unidadMedidaSlice } from '../slices/UnidadMedida'



export const store = configureStore({
  reducer: {
    articuloManufacturado: articuloManufacturadoSlice,
    articuloInsumo: articuloInsumoSlice.reducer, 
    promocion: promocionSlice.reducer,
    categoria: categoriaSlice.reducer,
    usuario: usuarioSlice.reducer,
    modal: modalReducer,
    empresas: empresasSlice.reducer,
    sucursales: sucursalSlice.reducer,
    tabla: TablaReducer,
    unidadMedida: unidadMedidaSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
