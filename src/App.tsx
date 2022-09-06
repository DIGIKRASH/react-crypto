import React from "react";
import axios from "axios";

import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

const useStyles = makeStyles({
  root: {
    paddingTop: 35,
    paddingBottom: 55,
  },
  table: {
    minWidth: "calc(70% - 30px)",
    marginRight: 30,
  },
  inputItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    // textAlign: "center",
  },
  icon: {
    width: 30,
  },
});

const tableLabels = ["", "Name", "Fullname", "Price", "Volume (24 hour)"];

type TCoin = {
  id: number;
  imageUrl: string;
  name: string;
  fullName: string;
  price: number;
  volume24hour: number;
};

function App() {
  const classes = useStyles();
  const [allCoins, setAllCoins] = React.useState<TCoin[]>([]);

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
        );

        const coins: TCoin[] = data.Data.map((coin: any) => {
          const obj: TCoin = {
            id: coin.CoinInfo.Id,
            imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            price: coin.RAW.USD.PRICE,
            volume24hour: coin.DISPLAY.USD.VOLUME24HOUR,
          };
          return obj;
        });

        setAllCoins(coins);
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
                {allCoins.map((obj) => (
                  <TableRow key={obj.id}>
                    <TableCell align="left">
                      <img className={classes.icon} src={obj.imageUrl} />
                    </TableCell>
                    <TableCell>{obj.name}</TableCell>
                    <TableCell align="left">{obj.fullName}</TableCell>
                    <TableCell align="left">{obj.price}</TableCell>
                    <TableCell align="left">{obj.volume24hour}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid xs={4}>
          <div className={classes.inputItem}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              sx={{ width: "80%" }}
            />
            <FormControl>
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
              sx={{ width: "80%" }}
            />
            <FormControl>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
