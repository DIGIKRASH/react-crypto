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
import { fetchCoins, setSelectedCoin } from "../redux/coins/slice";
import { TCoin } from "../redux/coins/types";

const tableLabels = ["", "Название", "Полное название", "Цена", "Объем (24 часа)"];

export const TableCoins: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { items, diffItems } = useSelector(coinsSliceSelector);

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

  const onSelectCoin = (obj: TCoin) => {
    dispatch(setSelectedCoin(obj));
  };

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
          <TableRow
            onClick={() => {
              onSelectCoin(obj);
            }}
            key={obj.id}
            className={classes.row}
          >
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
