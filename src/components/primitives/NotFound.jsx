import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import carTreeImg from "../../assets/images/car_tree.page_not_found.gif";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Grid container alignItems={"center"} className="p-5" minHeight="80vh">
        <Grid xs={12} className="py-1">
          <Box fontSize={30}>
            <Typography
              fontSize={40}
              fontWeight={700}
              fontFamily="roboto"
              className="text-center"
            >
              Oops...
            </Typography>
            <Typography fontSize={25} className="text-center">
              Sorry, we can't find that page
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} className="py-1">
          <div className="flex justify-content-center">
            <img
              src={carTreeImg}
              alt="Car Tree"
              width={200}
              height="auto"
            ></img>
          </div>
        </Grid>
        <Grid xs={12} className="py-1">
          <div className="flex justify-content-center">
            <Button
              variant="contained"
              color="warning"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
