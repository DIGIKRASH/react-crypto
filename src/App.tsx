import React from "react";

import { Container, Grid, Paper } from "@mui/material";

import { Conventor, TableCoins } from "./components";
import { fetchCoins } from "./redux/coins/slice";
import { useAppDispatch } from "./redux/store";

import { useStyles } from "./styles";

function App() {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        dispatch(fetchCoins());
      };
      fetchData();
    } catch (error) {
      alert("Ошибка!");
      console.log("Ошибка при получении данных валют!");
      console.log(error);
    }
  }, []);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container>
        <Grid xs={8}>
          <div className={classes.table}>
            <Paper>
              <TableCoins />
            </Paper>
          </div>
        </Grid>
        <Grid xs={4}>
          <Conventor />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
