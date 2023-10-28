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
import { useNavigate } from "react-router-dom";
import { APPROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../services/logoutService";
import { authInformation } from "../../modules/auth/authSlice";
import tailorImg from "../../assets/images/tailor.png";

const drawerWidth = 220;

export default function PermanentDrawerLeft({
  children,
  setDrawerText,
  drawerText,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <Toolbar sx={{ bgcolor: "#db93a0" }}>
          <Typography
            className="wd-100 text-center"
            variant="h6"
            noWrap
            component="div"
          >
            {drawerText}
          </Typography>
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
            backgroundColor: "#e3d8c5",
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
            <img src={tailorImg} alt="tailor" height={64} />
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
            <ListItemButton onClick={() => handleClick(APPROUTES.orderList)}>
              <ListItemIcon>
                <ListIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"Order list"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(APPROUTES.newOrder)}>
              <ListItemIcon>
                <AddCircleOutlineIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"New order"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(APPROUTES.product)}>
              <ListItemIcon>
                <ViewListIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"Product List"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(APPROUTES.cost)}>
              <ListItemIcon>
                <PriceChangeIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"Cost State"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(APPROUTES.statistics)}>
              <ListItemIcon>
                <BarChartIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"Statistics"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(APPROUTES.profile)}>
              <ListItemIcon>
                <AccountBoxIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#49ba67" }} />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
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
