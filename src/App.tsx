import { ThemeProvider } from "@material-ui/core/";
import React from "react";
import "./App.scss";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import { theme } from "./utils/theme";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
