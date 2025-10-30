import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PURGE,PERSIST,REGISTER} from 'redux-persist'
import  userReducer  from "./slice/userSlice";
import { api } from "./api";
import { getDefaultAutoSelectFamily } from "net";
import { Store } from "lucide-react";

//persist configuration for user
const userPersistConfig = {key:'user',storage,whitelist:['user','isEmailVerified','isLoggedIn']}


//wrap reducers with 'persist config'

const persistedUserReducers = persistReducer(userPersistConfig,userReducer)

export const store = configureStore({
    reducer:{
        [api.reducerPath] :api.reducer, //rtk query api
        user:persistedUserReducers  // tu slice persistente
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({
            //para asegurar que las acciones y estados sean serializables(que los datos se puedan convertir a json)
            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PURGE,PERSIST,REGISTER]
            },
        }).concat(api.middleware)
    
})

//setup the listener for RTK Query
setupListeners(store.dispatch);

//create a persistor

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch