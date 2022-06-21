import React from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ThemeProvider,
  styled,
} from "@mui/material/styles";

import { useKBar } from "kbar";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyItems: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const {
    DrawerBody,
    DrawerFooter,
    MainSection,
    tool,
    theme,
  } = props;
  const { window } = props;

  const [open, setOpen] = React.useState(true);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { query } = useKBar();

  const drawer = (
    <>
      <DrawerHeader sx={{ background: "#1e1e1e" }}>
        <div className="w-full text-center" style={{ background: "#1e1e1e" }}>
          <Link href="/app">
            <a
              className="title-font flex flex-1 cursor-pointer items-center font-medium"
              style={{ paddingLeft: "4px", paddingRight: "8px" }}
            >
              <img
                src="/logo.png"
                style={{ width: "40px" }}
                alt="DevKit Logo"
              />
              <span
                className="text-md ml-1 font-semibold"
                style={{ color: "white" }}
              >
                DevKit
              </span>
            </a>
          </Link>
        </div>
      </DrawerHeader>
      <Divider />
      {DrawerBody}
      <Divider />
      {DrawerFooter}
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#1e1e1e",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            className="flex w-full items-center justify-center"
            style={{ position: "relative", gap: "40px" }}
          >
            <div className="flex-1">
              <p
                className="m-auto flex w-full items-center gap-4 font-semibold tracking-normal"
                style={{
                  gap: "8px",
                  fontSize: "20px",
                  fontFamily: `"Inter", sans-serif !important`,
                }}
              >
                {tool?.icon}
                <span className="text-sm lg:text-lg">{tool?.label}</span>
              </p>
            </div>
            <div
              className="bp3-dark flex"
              style={{ width: "92px", height: "40px" }}
            >
              <button
                className="bp3-button bp3-minimal bp3-intent-primary ml-2"
                value={""}
                onClick={query.toggle}
                style={{ width: "40px", color: "white" }}
              >
                <span
                  className="bp3-icon bp3-icon-search inline-block"
                  style={{
                    marginLeft: "4px",
                    marginRight: "4px",
                  }}
                ></span>
              </button>
              <div
                className="color-white flex items-center"
                style={{ width: "40px", color: "white", marginLeft: "12px" }}
              >
                <a
                  href="https://discord.gg/qFaUEhsME8"
                  target={"_blank"}
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <i
                    className="fa-brands fa-discord"
                    style={{ fontSize: "16px" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <ThemeProvider theme={theme}>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
              display: { xs: "none", sm: "block" },
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </ThemeProvider>
      </Box>
      <Main
        open={open}
        style={{ padding: 0, background: "#1e1e1e", color: "white!important" }}
        className="text-white"
      >
        <DrawerHeader />
        {MainSection}
      </Main>
    </Box>
  );
}
