import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import unauthorizeImg from "../../assets/images/unauthorize.webp";
import { APPROUTES } from "../../constants/routes";
import Footer from "../patterns/Footer";

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Grid container alignItems={"center"} className="p-5" minHeight="80vh">
        <Grid xs={12}>
          <Box fontSize={30}>
            <Typography
              fontSize={30}
              fontWeight={700}
              fontFamily="roboto"
              className="text-center"
            >
              Access Denied
            </Typography>
            <Typography className="text-center">
              If you want to access this page then{" "}
              <Link
                to={APPROUTES.signin}
                className="font-main text-decoration-none font-w-700"
              >
                login
              </Link>{" "}
              using magic link or password
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12}>
          <div className="flex justify-content-center">
            <img
              src={unauthorizeImg}
              alt="unauthorize"
              width={200}
              height="auto"
            ></img>
          </div>
        </Grid>
        <Grid xs={12}>
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
      <Footer />
    </Container>
  );
};

export default UnAuthorized;
