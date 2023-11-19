import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from "@mui/icons-material/List";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { APPROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../services/logoutService";
import { authInformation } from "../../modules/auth/authSlice";
import tailorImg from "../../assets/images/tailor.png";
import KeyboardReturnSharpIcon from "@mui/icons-material/KeyboardReturnSharp";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

const drawerWidth = 220;

export default function PermanentDrawerLeft({
  children,
  setDrawerText,
  drawerText,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const {
    user: { storeName },
  } = useSelector(authInformation);

  const handleClick = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    navigate(APPROUTES.signin);
    dispatch(resetState());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ bgcolor: "#38a9d9" }}>
          <Grid container spacing={2} width={"100%"} alignItems={"center"}>
            <Grid xs={5}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate(-1)}
              >
                <KeyboardReturnSharpIcon sx={{ color: "white" }} />
              </Button>
            </Grid>
            <Grid xs={7}>
              <Typography variant="h6" noWrap component="div">
                {drawerText}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "& .MuiPaper-root": {
            backgroundColor: "#bcd0d1",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          onClick={() => navigate(APPROUTES.orderList)}
          sx={{ cursor: "pointer" }}
        >
          <div>
            <img src={tailorImg} alt="tailor" height={55} />
          </div>
          <Box
            sx={{
              ml: "4px",
              fontSize: 12,
              fontWeight: 1000,
              fontStyle: "italic",
              textTransform: "uppercase",
            }}
          >
            {storeName}
          </Box>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(APPROUTES.orderList)}
              sx={{
                bgcolor: pathname === APPROUTES.orderList && "aliceblue",
              }}
            >
              <ListItemIcon>
                <ListIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"অর্ডারের তালিকা"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(APPROUTES.newOrder)}
              sx={{
                bgcolor: pathname === APPROUTES.newOrder && "aliceblue",
              }}
            >
              <ListItemIcon>
                <AddCircleOutlineIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"নতুন অর্ডার"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(APPROUTES.product)}
              sx={{
                bgcolor: pathname === APPROUTES.product && "aliceblue",
              }}
            >
              <ListItemIcon>
                <ViewListIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"প্রোডাক্টের তালিকা"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(APPROUTES.cost)}
              sx={{
                bgcolor: pathname === APPROUTES.cost && "aliceblue",
              }}
            >
              <ListItemIcon>
                <PriceChangeIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"খরচের হিসাব"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(APPROUTES.statistics)}
              sx={{
                bgcolor: pathname === APPROUTES.statistics && "aliceblue",
              }}
            >
              <ListItemIcon>
                <BarChartIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"পরিসংখ্যান"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(APPROUTES.profile)}
              sx={{
                bgcolor: pathname === APPROUTES.profile && "aliceblue",
              }}
            >
              <ListItemIcon>
                <AccountBoxIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"প্রোফাইল"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"লগআউট"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
