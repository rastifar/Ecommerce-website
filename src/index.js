import React from "react";
import ReactDOM from "react-dom/client";
//---------App
import App from "./App";
//---------ThemeProvider
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/material_ui/styles";
import RTL from './assets/material_ui/RTL';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeProvider theme={theme}><RTL><App/></RTL></ThemeProvider>);
