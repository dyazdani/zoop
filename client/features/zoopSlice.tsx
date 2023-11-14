import { createSlice } from "@reduxjs/toolkit";
import type { Zoop } from "@prisma/client";
import { api } from "./api";

interface ZoopState {
  zoops: Zoop[];
}

const initialState: ZoopState = {
  zoops: [],
};

const zoopSlice = createSlice({
  name: "zoop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAllZoops.matchFulfilled, (state, { payload }) => {
        state.zoops = payload.zoops
      }
    );
  },
});

export default zoopSlice.reducer;
