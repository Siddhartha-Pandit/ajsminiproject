import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  notes: [],
  newdata: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state, action) => {
      //   state.newdata = action.payload;
      state.newdata.push(action.payload);
      console.log(state.newdata);
    },
    addNotes: (state, action) => {
      state.notes.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { setNote, addNotes, removeNote } = noteSlice.actions;
export default noteSlice.reducer;
