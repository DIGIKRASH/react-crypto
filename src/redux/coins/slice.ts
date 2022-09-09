import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TCoin, TCoinsSlice, CoinsStatus } from "./types";

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoinsStatus",
  async () => {
    const { data } = await axios.get(
      "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
    );

    const coins: TCoin[] = data.Data.map((coin: any) => {
      const obj: TCoin = {
        id: coin.CoinInfo.Id,
        imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
        name: coin.CoinInfo.Name,
        fullName: coin.CoinInfo.FullName,
        price: coin.RAW.USD.PRICE.toFixed(2),
        volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
      };
      return obj;
    });

    return coins;
  }
);

const initialState: TCoinsSlice = {
  items: [],
  status: CoinsStatus.LOADING,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoins(state, { payload }: PayloadAction<TCoin[]>) {
      state.items = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.status = CoinsStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCoins.fulfilled, (state, { payload }) => {
      state.status = CoinsStatus.LOADED;
      state.items = payload;
    });
    builder.addCase(fetchCoins.rejected, (state) => {
      state.status = CoinsStatus.ERROR;
      state.items = [];
    });
  },
});

export const { setCoins } = coinsSlice.actions;

export default coinsSlice.reducer;
