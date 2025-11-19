import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { type RootState } from "../store";
import type { Items } from "../../types/items";
import { removeLikeById } from "./filterSlice";

export const fetchItems = createAsyncThunk<Items[]>(
  "items/fetchItems",
  async () => {
    const { data } = await axios.get(
      "https://7d247ed412521517.mokky.dev/items",
    );
    return data;
  },
);

export const deleteItem = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("items/deleteItem", async (id, { rejectWithValue, dispatch }) => {
  try {
    await axios.delete(`https://7d247ed412521517.mokky.dev/items/${id}`);
    dispatch(removeLikeById(id));
    return id;
  } catch (err) {
    const message = (err as Error).message ?? String(err);
    return rejectWithValue(message);
  }
});

export type Status = "loading" | "success" | "error";

interface ItemsSliceState {
  items: Items[];
  status: Status;
}

const initialState: ItemsSliceState = {
  items: [],
  status: "loading",
};

export const ItemsSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Items[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = "error";
        state.items = [];
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((it) => it.id !== id);
        state.status = "success";
        alert("компонент удален");
      })
      .addCase(deleteItem.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const selectItemsData = (state: RootState) => state.items;

export default ItemsSlice.reducer;
