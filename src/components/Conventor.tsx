import React from "react";

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
import { useSelector } from "react-redux";
import { TCoin } from "../redux/coins/types";

export const Conventor: React.FC = ({}) => {
  const classes = useStyles();
  const { items, selectedCoin } = useSelector(coinsSliceSelector);

  const [selectedCoin2, setSelectedCoin2] = React.useState("USD");

  return (
    <Paper className={classes.inputs}>
      <div className={classes.inputItem}>
        <TextField
          id="outlined-basic"
          label="Сумма"
          variant="outlined"
          sx={{ width: "70%" }}
        />
        <FormControl sx={{ width: "27%" }}>
          <InputLabel id="demo-simple-select-label">
            {(selectedCoin && selectedCoin.name) || ""}
          </InputLabel>
          <Select label="Валюта" value="">
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
          id="outlined-basic"
          label="Сумма"
          variant="outlined"
          sx={{ width: "70%" }}
        />
        <FormControl sx={{ width: "27%" }}>
          <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
          <Select
            label="Валюта"
            value={selectedCoin2}
            onChange={(e) => setSelectedCoin2(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
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
