import React from "react";

import { Container, Grid, Paper } from "@mui/material";

import { Conventor, TableCoins } from "./components";
import { fetchCoins } from "./redux/coins/slice";
import { useAppDispatch } from "./redux/store";

import { useStyles } from "./styles";

function App() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container>
        <Grid xs={8} item={true}>
          <div className={classes.table}>
            <Paper>
              <TableCoins />
            </Paper>
          </div>
        </Grid>
        <Grid xs={4} item={true}>
          <Conventor />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
