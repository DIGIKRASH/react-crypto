import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
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
    borderRadius: 50,
  },
  inputs: {
    padding: 20,
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
});
