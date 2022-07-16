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
  // Celebration,
  Input,
  DarkMode,
  LightMode,
  Assignment,
} from "@mui/icons-material";
import Ticketing from "./Ticketing";
import Stats from "./Stats";
import ReactGA from 'react-ga';
// import Drawing from "./Drawing";

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

ReactGA.initialize("G-65F1XKCTRN");

function App() {
  const [tab, setTab] = React.useState(0);
  const [dark, setDark] = React.useState(useMediaQuery('(prefers-color-scheme: dark)'));

  const [scrWidth, setScrWidth] = React.useState(window.innerWidth);
  const updateWidth = () => {
    console.log(window.innerWidth);
    setScrWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  }

  React.useEffect(()=>{
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  })

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <React.Fragment className="App">
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
            onChange={(e,newMode)=>setTab(newMode)}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
                  bottom: "0px",
                }}
          >
            <Tab icon={<Input />} iconPosition="start" label="Submit" />
            <Tab
              icon={<BarChart />}
              iconPosition="start"
              label="Stats"
            />
            {/*<Tab
              icon={<Celebration />}
              iconPosition="start"
              label="WINGS Drawing"
            />*/}
          </Tabs>

          <Button
            href="https://forms.gle/t9R29o6ZJXDM7NE37"
            target="_blank"
            rel="noreferrer"
            variant="variant"
            color="secondary">
            <Assignment sx={{marginRight: 1}}/>
            Feedback
          </Button>

          <IconButton color="inherit" onClick={()=>setDark(!dark)}>
            {dark ? <LightMode /> : <DarkMode />}
          </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{width: scrWidth > 750 ? "50%" : "90%", margin: "auto"}}>
          {tab === 0 ? <Ticketing /> : <Stats />}
        </Box>
        </Box>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
