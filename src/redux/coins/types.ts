export type TCoin = {
  id: number;
  imageUrl: string;
  name: string;
  fullName: string;
  price: number;
  volume24hour: number;
};

export interface TCoinsSlice {
  items: TCoin[];
  status: CoinsStatus;
}

export enum CoinsStatus {
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}
