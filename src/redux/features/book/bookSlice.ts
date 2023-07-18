import { createSlice } from "@reduxjs/toolkit";
interface IUserState {
  searchTerm: string | null;
  filter: string | null;
}
const initialState: IUserState = {
  searchTerm: "",
  filter: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.setSearchTerm;
    },
  },
});

export const { setSearchTerm } = bookSlice.actions;

export default bookSlice.reducer;
