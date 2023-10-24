import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const AppCard = ({ title, value, bgColor, onCardClick }) => {
  return (
    <Card
      onClick={onCardClick}
      sx={{
        width: 230,
        height: 250,
        bgcolor: bgColor || "#b4ced1",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
        cursor: "pointer",
      }}
    >
      <Typography sx={{ fontWeight: 700 }} color="text.secondary">
        {title}
      </Typography>
      <Box
        sx={{
          mt: 2,
          border: "1px solid black",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          width: "100px",
        }}
      >
        {value}
      </Box>
    </Card>
  );
};

export default AppCard;
