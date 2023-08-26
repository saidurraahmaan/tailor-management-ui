import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {},
  breakpoints: {
    values: { xs: 0, sm: 480, md: 768, lg: 1024, xl: 1280, xxl: 1920 },
  },
});

export default theme;
