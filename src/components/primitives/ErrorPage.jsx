import React from "react";
import { Box, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import carTreeImg from "../../assets/images/car_tree.page_not_found.gif";

const ErrorPage = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Grid container alignItems={"center"} className="p-5" minHeight="80vh">
        <Grid xs={6}>
          <Box fontSize={30}>
            {children}
            <div>
              <Button
                variant="contained"
                color="warning"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </div>
          </Box>
        </Grid>
        <Grid xs={6}>
          <div>
            <img
              src={carTreeImg}
              alt="Car Tree"
              width={200}
              height="auto"
            ></img>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
