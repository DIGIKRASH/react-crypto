import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { useStyles } from "../styles";
import { coinsSliceSelector } from "../redux/coins/selectors";
import { TCoin } from "../redux/coins/types";

export const Conventor: React.FC = ({}) => {
  const classes = useStyles();
  const { items, selectedCoin } = useSelector(coinsSliceSelector);

  const [fromCurrency, setFromCurrency] = React.useState("");
  const [toCurrency, setToCurrency] = React.useState("");
  const [fromValue, setFromValue] = React.useState(0);
  const [toValue, setToValue] = React.useState(0);

  const inPrice =
    (items && items.find((obj) => obj.name === fromCurrency)?.price) || 0;
  const outPrice =
    (items && items.find((obj) => obj.name === toCurrency)?.price) || 0;

  React.useEffect(() => {
    if (items[0]) {
      setFromCurrency(items[0].name);
      setToCurrency(items[0].name);
    }
  }, [items[0]]);

  React.useEffect(() => {
    setFromCurrency(selectedCoin.name);
    if (selectedCoin.name !== "") {
      onChangeFromValue(fromValue);
    }
  }, [selectedCoin]);

  const onChangeFromValue = (value: any) => {
    setFromValue(value);
    setToValue((value * Number(inPrice)) / Number(outPrice));
  };
  const onChangeToValue = (value: any) => {
    setToValue(value);
    setFromValue((value * Number(inPrice)) / Number(outPrice));
  };

  const onChangeFromCurrency = (cur: any) => {
    setFromCurrency(cur);
    onChangeFromValue(fromValue);
  };
  const onChangeToCurrency = (cur: any) => {
    setToCurrency(cur);
    onChangeToValue(toValue);
  };

  return (
    <Paper className={classes.inputs}>
      <div className={classes.inputItem}>
        <TextField
          type="number"
          id="outlined-basic"
          label="Сумма"
          variant="outlined"
          sx={{ width: "70%" }}
          value={fromValue}
          onChange={(e) => onChangeFromValue(e.target.value)}
        />
        <FormControl sx={{ width: "27%" }}>
          <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
          <Select
            label="Валюта"
            value={fromCurrency}
            onChange={(e) => onChangeFromCurrency(e.target.value)}
          >
            {items.map((obj: TCoin) => (
              <MenuItem key={obj.id} value={obj.name}>
                {obj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.inputItem}>
        <TextField
          type="number"
          id="outlined-basic"
          label="Сумма"
          variant="outlined"
          sx={{ width: "70%" }}
          value={toValue}
          onChange={(e) => onChangeToValue(e.target.value)}
        />
        <FormControl sx={{ width: "27%" }}>
          <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
          <Select
            label="Валюта"
            value={toCurrency}
            onChange={(e) => onChangeToCurrency(e.target.value)}
          >
            {items.map((obj: TCoin) => (
              <MenuItem key={obj.id} value={obj.name}>
                {obj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
};
