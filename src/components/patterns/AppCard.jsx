import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const AppCard = ({ title, value }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {title}
        </Typography>
        <Box>{value}</Box>
      </CardContent>
    </Card>
  );
};

export default AppCard;
