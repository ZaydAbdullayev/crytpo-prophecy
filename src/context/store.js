import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reFavDatas } from "./fav-datas";

export const store = configureStore({
    reducer: combineReducers({
        favDatas: reFavDatas,
    }),
})