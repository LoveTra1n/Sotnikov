import {configureStore, combineReducers} from "@reduxjs/toolkit";
import widgetReducer from "./widgetSlice/widgetSlice";
import postReduce from './postSlice/postSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {PersistGate} from "redux-persist/integration/react";


const persistConfig = {
    key:'root',
    version:'1',
    storage
}

const rootReducer = combineReducers({widgetReducer:widgetReducer,postReduce:postReduce})
const persistedReducer  = persistReducer(persistConfig,rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export const persistor = persistStore(store)