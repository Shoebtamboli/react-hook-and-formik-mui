import * as React from "react";
import {
  Container,
  Typography,
  CssBaseline,
  Tabs,
  Tab,
  Box,
  AppBar
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LoginFormik } from "./LoginFormik";
import { LoginReactHook } from "./LoginReactHook";
import { SignUp } from "./SignUp";

const theme = createTheme({
  palette: {
    mode: "light"
  }
});

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            height: "100vh",
            p: 1
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          centered
        >
          <Tab label="React-hook-form Controller with MUI" {...a11yProps(0)} />
          <Tab label="React-hook-form Register with MUI" {...a11yProps(1)} />
          <Tab label="Formik with MUI" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Container maxWidth="md">
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginReactHook />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignUp />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <LoginFormik />
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}
