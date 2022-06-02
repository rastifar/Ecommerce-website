import React from 'react'
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../fonts/fontFace.css'
import { faIR } from '@mui/material/locale';

const Colors = {
  primary: "#00adb5",
  secondary: "#89A026",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",
};

// export const theme = createTheme({
//   direction: "rtl",
//   fontFamily: [yekan].join(","),
//   palette: {
//     primary: {
//       main: Colors.primary,
//     },
//     secondary: {
//       main: Colors.secondary,
//     },
//   },
//   components: {
//     MuiButton: {
//       defaultProps: {
//         disableRipple: true,
//       },
//     },
//   },
// });
export const theme  = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSansWeb, san-serif',
    fontSize: 15,
    
  },
  palette:{
    primary:{
      light: Colors.light,
      main: Colors.primary,
      dark: Colors.dark
    },
    secondary:{
      light:  Colors.success,
      main:Colors.secondary
    }
  },
}, faIR);

theme.typography.h1 = {
  fontSize: '1.8rem',
  fontWeight: 700,
  
  '@media (max-width:425px)': {
    fontSize: '1.4rem',
  },
  '@media (min-width:700px)': {
    fontSize: '2.2rem',
  },
};
theme.typography.h2 = {
  fontSize: '1.3rem',
  fontWeight: 700,
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
};
theme.typography.h3 = {
  fontSize: '1.2rem',
  fontWeight: 700,
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
};

