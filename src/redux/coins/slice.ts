import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TCoin, TCoinsSlice, CoinsStatus, TDiffCoin } from "./types";

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

const arr2 = [
  { id: "1182", name: "BTC", fullName: "Bitcoin", price: "20431.41" },
  { id: "7605", name: "ETH", fullName: "Ethereum", price: "1575.02" },
  { id: "4432", name: "DOGE", fullName: "Dogecoin", price: "0.13" },
  { id: "932135", name: "BUSD", fullName: "BUSD", price: "1.00" },
  { id: "204788", name: "BNB", fullName: "Binance Coin", price: "326.70" },
  { id: "171986", name: "USDT", fullName: "Tether", price: "1.00" },
  { id: "5031", name: "XRP", fullName: "XRP", price: "0.45" },
  { id: "934443", name: "SOL", fullName: "Solana", price: "32.83" },
  { id: "940776", name: "SHIB", fullName: "Shiba Inu", price: "0.00" },
  { id: "309621", name: "LINK", fullName: "Chainlink", price: "7.98" },
];
const initialState: TCoinsSlice = {
  status: CoinsStatus.LOADING,
  items: [],
  diffItems: {},
  selectedCoin: {
    id: 0,
    imageUrl: "",
    name: "",
    fullName: "",
    price: "",
    volume24hour: 0,
  },
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setSelectedCoin(state, { payload }: PayloadAction<TCoin>) {
      state.selectedCoin = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.status = CoinsStatus.LOADING;
    });
    builder.addCase(fetchCoins.fulfilled, (state, { payload }) => {
      state.status = CoinsStatus.LOADED;
      const diffObjs = state.items.filter(
        (obj, index) => obj.price !== payload[index].price
      );

      state.diffItems = diffObjs.reduce((initObj: TDiffCoin, obj) => {
        const newObj = payload.find((o) => o.name === obj.name)!;
        const oldObj = state.items.find(
          (itemObj) => itemObj.name === newObj.name
        )!;

        const color =
          newObj.price === oldObj.price
            ? ""
            : newObj.price > oldObj.price
            ? "green"
            : "red";

        initObj[newObj.name] = color;

        return initObj;
      }, {});

      state.items = payload;
      state.selectedCoin = state.items[0];

      setTimeout(() => {
        state.diffItems = {};
      }, 10000);
    });
    builder.addCase(fetchCoins.rejected, (state) => {
      state.status = CoinsStatus.ERROR;
      state.items = [];
    });
  },
});

export const { setSelectedCoin } = coinsSlice.actions;

export default coinsSlice.reducer;
