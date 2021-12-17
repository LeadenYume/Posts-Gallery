import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountInfoReducer } from "../Features/AccountInfo/AccountInfoSlice";
import { postsReducer } from "../Features/Posts/PostsSlice";



export const appStore = configureStore({
    reducer: {
        accountInfo: accountInfoReducer,
        posts: postsReducer
    }
})

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;

export const appDispatch = appStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
