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

const tableLabels = ["", "Name", "Fullname", "Price", "Volume (24 hour)"];

export const TableCoins: React.FC = () => {
  const classes = useStyles();
  const { items } = useSelector(coinsSliceSelector);

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
            <TableCell align="left">${obj.price}</TableCell>
            <TableCell align="left">${obj.volume24hour}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
