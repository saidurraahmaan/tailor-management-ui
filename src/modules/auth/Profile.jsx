import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { STATUS } from "../../constants/fetch";
import { Toaster } from "../../components";
import { fetchUser } from "./authApi";

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

  const handleError = (error) => {
    setProfile((prev) => ({ ...prev, fetchStatus: STATUS.ERROR }));
    if (error.data.message) {
      setProfile((prev) => ({ ...prev, fetchError: error.data.message }));
      return;
    }
    setProfile((prev) => ({ ...prev, fetchError: "something went wrong" }));
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

  console.log({ profile });
  return (
    <div>
      Profile
      <div>
        <Toaster
          severity={"error"}
          message={"Error while fetching"}
          open={profile.fetchStatus === STATUS.ERROR}
          handleClose={handleFetchToasterErrorClose}
        />
      </div>
    </div>
  );
};

export default Profile;
