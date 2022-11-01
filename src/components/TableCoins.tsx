import React from "react";
import { useSelector } from "react-redux";

import {
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";

import { coinsSliceSelector } from "../redux/coins/selectors";

import { useStyles } from "../styles";
import { useAppDispatch } from "../redux/store";
import { fetchCoins } from "../redux/coins/slice";
import { TCoin, TDiffCoin } from "../redux/coins/types";

const tableLabels = ["", "Name", "Fullname", "Price", "Volume (24 hour)"];

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

export const TableCoins: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { items, diffItems } = useSelector(coinsSliceSelector);
  console.log(diffItems);

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        dispatch(fetchCoins());
        setInterval(() => dispatch(fetchCoins()), 30 * 1000);
      };
      fetchData();
    } catch (error) {
      alert("Ошибка!");
      console.log("Ошибка при получении данных валют!");
      console.log(error);
    }
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableLabels.map((label, index) => (
            <TableCell align="left" key={index}>
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((obj) => (
          <TableRow key={obj.id}>
            <TableCell align="left">
              <img className={classes.icon} src={obj.imageUrl} />
            </TableCell>
            <TableCell>{obj.name}</TableCell>
            <TableCell align="left">{obj.fullName}</TableCell>
            <TableCell
              className={diffItems[obj.name] && `${diffItems[obj.name]}column`}
              align="left"
            >
              ${obj.price}
            </TableCell>
            <TableCell align="left">${obj.volume24hour}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
