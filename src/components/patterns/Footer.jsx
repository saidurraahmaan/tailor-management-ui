import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Paper } from "@mui/material";

const Footer = () => {
  const [value, setValue] = React.useState(0);
  const phoneNumber = "123-456-7890"; // Replace with the phone number you want to call

  const handleCallButtonClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={handleCallButtonClick}
            label="Saidur Rahman"
            icon={<CopyrightIcon color="success" />}
          />
          <BottomNavigationAction
            onClick={handleCallButtonClick}
            label="01304730345"
            icon={<WhatsAppIcon color="primary" />}
          />
        </BottomNavigation>
      </Box>
    </Paper>
  );
};

export default Footer;
