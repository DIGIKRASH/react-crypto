import ReactDOM from "react-dom/client";

import App from "./App";
// import { store } from './redux/store';

import "./scss/app.scss";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <Provider store={store}>
    <App />
    // </Provider>
  );
}
