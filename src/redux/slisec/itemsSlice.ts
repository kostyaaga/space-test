import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { type RootState } from "../store";
import type { Items } from "../../types/items";
import { removeLikeById } from "./filterSlice";

export type Status = "loading" | "success" | "error";

export interface Meta {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  remaining_count: number;
}

interface ItemsSliceState {
  items: Items[];
  meta: Meta | null;
  status: Status;
}

const initialState: ItemsSliceState = {
  items: [],
  meta: null,
  status: "loading",
};

export const fetchItems = createAsyncThunk<
  { items: Items[]; meta: Meta },
  { page?: number; limit?: number } | undefined,
  { rejectValue: string }
>(
  "items/fetchItems",
  async (params = { page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10 } = params;
      const res = await axios.get("https://7d247ed412521517.mokky.dev/items", {
        params: { page, limit },
      });

      const data = res?.data;
      const items: Items[] = Array.isArray(data?.items) ? data.items : [];
      const meta: Meta = data?.meta ?? {
        total_items: items.length,
        total_pages: 1,
        current_page: page,
        limit,
        remaining_count: Math.max(
          0,
          (data?.total_items ?? items.length) - items.length,
        ),
      };

      return { items, meta };
    } catch (err) {
      const message = (err as Error).message ?? String(err);
      return rejectWithValue(message);
    }
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

export const ItemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Items[]>) {
      state.items = action.payload;
    },
    removeLocal(state, action: PayloadAction<number>) {
      state.items = state.items.filter((it) => it.id !== action.payload);
    },
    setMeta(state, action: PayloadAction<Meta | null>) {
      state.meta = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
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
      })
      .addCase(deleteItem.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const selectItemsData = (state: RootState) => state.items;

export const { setItems, removeLocal, setMeta } = ItemsSlice.actions;

export default ItemsSlice.reducer;
