import * as React from "react";

import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import image from "../../assets/images/pomegranate1.png";

const theme = createTheme();

export default function AdminLogin() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={image} style={{ objectFit: "contain" }} />

          <Typography component="h1" variant="h5" sx={{ color: "green" }}>
            انار سبز
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              //   label="نام کاربری"
              name="username"
              placeholder="نام کاربری"
              autoComplete="username"
              autoFocus
              color="success"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              //   label="رمز عبور"
              placeholder="کلمه عبور"
              type="password"
              id="password"
              autoComplete="current-password"
              color="success"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="success" />}
              label="مرا به خاطر بسپار"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              ورود
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ textDecoration: "none" }}>
                  فراموشی رمز عبور
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}