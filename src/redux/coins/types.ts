export type TCoin = {
  id: number;
  imageUrl: string;
  name: string;
  fullName: string;
  price: string;
  volume24hour: number;
};

export type TDiffCoin = {
  [key: string]: string;
};

export interface TCoinsSlice {
  status: CoinsStatus;
  items: TCoin[];
  diffItems: TDiffCoin;
}

export enum CoinsStatus {
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}
