import React from "react";

import {
  Paper,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography
} from "@mui/material";

import { useStyles } from "../styles";

export const Conventor: React.FC = ({}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.inputs}>
      <div className={classes.inputItem}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ width: "70%" }}
        />
        <FormControl sx={{ width: "27%" }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.inputItem}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ width: "70%" }}
        />
        <FormControl sx={{ width: "27%" }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Typography variant="h5" className={classes.title}>
        h1. Heading
      </Typography>
    </Paper>
  );
};
