import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { STATUS } from "../../constants/fetch";
import { Toaster } from "../../components";
import { fetchUser, updateUser } from "./authApi";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LoadingButton } from "@mui/lab";

const Profile = () => {
  const { setDrawerText } = useOutletContext();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    storeName: "",
    storeAddress: "",
    fetchStatus: STATUS.IDLE,
    updateStatus: STATUS.IDLE,
    fetchError: null,
    updateError: null,
  });

  const handleFetchToasterErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setProfile((prev) => ({
      ...prev,
      fetchError: null,
      fetchStatus: STATUS.IDLE,
    }));
  };

  const handleUpdateToasterSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setProfile((prev) => ({
      ...prev,
      updateError: null,
      updateStatus: STATUS.IDLE,
    }));
  };
  const handleUpdateToasterErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setProfile((prev) => ({
      ...prev,
      updateError: null,
      updateStatus: STATUS.IDLE,
    }));
  };

  const handleError = (error) => {
    setProfile((prev) => ({ ...prev, fetchStatus: STATUS.ERROR }));
    if (error.data.message) {
      setProfile((prev) => ({ ...prev, fetchError: error.data.message }));
      return;
    }
    setProfile((prev) => ({ ...prev, fetchError: "something went wrong" }));
  };

  const handleUpdateError = (error) => {
    setProfile((prev) => ({ ...prev, updateStatus: STATUS.ERROR }));
    if (error.data.message) {
      setProfile((prev) => ({ ...prev, updateError: error.data.message }));
      return;
    }
    setProfile((prev) => ({ ...prev, updateError: "something went wrong" }));
  };

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSubmit = async () => {
    setProfile((prev) => ({
      ...prev,
      updateStatus: STATUS.LOADING,
      updateError: null,
    }));
    const data = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      storeName: profile.storeName,
      storeAddress: profile.storeAddress,
    };
    const response = await updateUser(data).catch((e) =>
      handleUpdateError(e.response)
    );

    if (response) {
      setProfile((prev) => ({
        ...prev,
        updateError: null,
        updateStatus: STATUS.SUCCESS,
      }));
      return;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setProfile((prev) => ({ ...prev, fetchStatus: STATUS.LOADING }));
      const response = await fetchUser().catch((e) => handleError(e));
      if (response) {
        const { name, email, phone, storeName, storeAddress } = response.data;

        setProfile((prev) => ({
          ...prev,
          name,
          email,
          phone,
          storeName,
          storeAddress,
          fetchStatus: STATUS.SUCCESS,
        }));
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    setDrawerText("Profile");
  }, [setDrawerText]);

  return (
    <div className="pt-3">
      <Grid container spacing={4}>
        <Grid xs={12} sm={6} display={"flex"} justifyContent={"center"}>
          <TextField
            label="Full Name"
            variant="outlined"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Grid>
        <Grid xs={12} sm={6} display={"flex"} justifyContent={"center"}>
          <TextField
            label="Email"
            variant="outlined"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Grid>
        <Grid xs={12} sm={6} display={"flex"} justifyContent={"center"}>
          <TextField
            label="Store Name"
            variant="outlined"
            required
            value={profile.storeName}
            onChange={(e) => handleChange("storeName", e.target.value)}
          />
        </Grid>
        <Grid xs={12} sm={6} display={"flex"} justifyContent={"center"}>
          <TextField
            label="Store Address"
            variant="outlined"
            required
            value={profile.storeAddress}
            onChange={(e) => handleChange("storeAddress", e.target.value)}
          />
        </Grid>
        <Grid xs={12} sm={6} display={"flex"} justifyContent={"center"}>
          <TextField
            label="Phone"
            variant="outlined"
            required
            value={profile.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Grid>
      </Grid>
      <div className="py-3 flex justify-content-center">
        <LoadingButton
          variant="contained"
          loading={profile.updateStatus === STATUS.LOADING}
          onClick={handleSubmit}
        >
          আপডেট
        </LoadingButton>
      </div>

      <Toaster
        severity={"error"}
        message={"Error while fetching"}
        open={profile.fetchStatus === STATUS.ERROR}
        handleClose={handleFetchToasterErrorClose}
      />
      <Toaster
        severity={"success"}
        message={"আপনার প্রোফাইল আপডেট হয়েছে"}
        open={profile.updateStatus === STATUS.SUCCESS}
        handleClose={handleUpdateToasterSuccessClose}
      />
      <Toaster
        severity={"error"}
        message={"আপনার প্রোফাইল আপডেট করা সম্ভব হয় নি"}
        open={profile.updateStatus === STATUS.ERROR}
        handleClose={handleUpdateToasterErrorClose}
      />
    </div>
  );
};

export default Profile;
