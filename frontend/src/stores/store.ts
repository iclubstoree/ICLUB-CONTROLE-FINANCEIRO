import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import analisesSlice from "./analises/analisesSlice";
import categoriasSlice from "./categorias/categoriasSlice";
import centros_de_custoSlice from "./centros_de_custo/centros_de_custoSlice";
import configuracoesSlice from "./configuracoes/configuracoesSlice";
import dreSlice from "./dre/dreSlice";
import lojasSlice from "./lojas/lojasSlice";
import saidasSlice from "./saidas/saidasSlice";
import tiposSlice from "./tipos/tiposSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
analises: analisesSlice,
categorias: categoriasSlice,
centros_de_custo: centros_de_custoSlice,
configuracoes: configuracoesSlice,
dre: dreSlice,
lojas: lojasSlice,
saidas: saidasSlice,
tipos: tiposSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
