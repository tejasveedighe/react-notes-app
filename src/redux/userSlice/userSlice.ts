import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@firebase/auth-types";

export interface UserState {
	user: User | {};
}

const initialState: UserState = {
	user: {},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | {}>) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
