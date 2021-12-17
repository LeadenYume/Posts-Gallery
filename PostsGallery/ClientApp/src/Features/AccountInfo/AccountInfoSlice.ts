import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { User } from "../../csts";


export interface AccountInfoState {
    account: User | undefined;
}

const initialState: AccountInfoState = {
    account: undefined
}

const accountInfoSlice = createSlice({
    name: "accountInfo",
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.account = undefined;
        },
        logIn: (state, action: PayloadAction<User>) => {
            state.account = action.payload;
        }
    }
})

export const account = (store: RootState) => store.accountInfo;

export const { logOut, logIn } = accountInfoSlice.actions;
export const accountInfoReducer = accountInfoSlice.reducer;