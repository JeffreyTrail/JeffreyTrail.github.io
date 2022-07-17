import {
  Box,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from "@mui/material";
import * as React from "react";
import {
  BarChart,
  LiveHelp,
  Input,
  DarkMode,
  LightMode,
  Assignment,
} from "@mui/icons-material";
import Ticketing from "./Ticketing";
import Stats from "./Stats";
import Help from "./Help";
import ReactGA from "react-ga4";


import carrierDark from "./carrier-darkm.png"
import carrierLight from "./carrier-lightm.png"

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme =  createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#1452ee',
    // },
    primary: {
      main: '#eeb114',
    },
    secondary: {
      main: '#1452ee',
    }
  }
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#1452ee',
    // },
    primary: {
      main: '#eeb114',
    },
    secondary: {
      main: '#1452ee',
    }
  }
});

function App() {

  let localDarkSetting = null;
  let localTab = null;

  if (typeof(Storage) !== "undefined") {
    // Getting user settings
    localDarkSetting = localStorage.getItem("dark")
    localTab = localStorage.getItem("tab")
  }

  const browserDarkSetting = useMediaQuery('(prefers-color-scheme: dark)');

  const [tab, setTab] = React.useState((localTab !== null) ? parseInt(localTab) : 0);
  const [dark, setDark] = React.useState((localDarkSetting !== null) ? localDarkSetting==="true" : browserDarkSetting);

  const [scrWidth, setScrWidth] = React.useState(window.innerWidth);
  const updateWidth = () => {
    setScrWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  }

  ReactGA.initialize("G-65F1XKCTRN");
  ReactGA.send("pageview");

  React.useEffect(()=>{
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  })

  const handleTabChange = (e,newMode) => {
    setTab(newMode);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("tab", newMode);
  }

  const handleDark = (e) => {
    const newMode = !dark;
    setDark(newMode);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("dark", newMode);
  }

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <React.Fragment>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            height: "100%"
          }}
        >
        <AppBar position="static">
        <Toolbar variant="dense">
          <img src={dark ? carrierDark : carrierLight} alt="jt-carrier-logo"/>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 3 }}>
            JT Carrier
          </Typography>


          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              flexGrow: 1,
            }}
          >
            <Tab
              icon={<Input />}
              iconPosition="start"
              label="Submit"
            />
            <Tab
              icon={<BarChart />}
              iconPosition="start"
              label="Stats"
            />
            <Tab
              icon={<LiveHelp />}
              iconPosition="start"
              label="Help"
            />
          </Tabs>

          <Button
            href="https://forms.gle/t9R29o6ZJXDM7NE37"
            target="_blank"
            rel="noreferrer"
            variant="variant"
            color="secondary"
            startIcon={<Assignment />}>
            Feedback
          </Button>

          <IconButton color="inherit" onClick={handleDark}>
            {dark ? <LightMode /> : <DarkMode />}
          </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{width: scrWidth > 750 ? "50%" : "90%", margin: "auto"}}>
          {tab === 0 ? <Ticketing /> : (tab === 1 ? <Stats /> : <Help />)}
        </Box>
        </Box>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
