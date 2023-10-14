import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APPROUTES } from "../../../constants/routes";

const SuccessfulOrder = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex align-items-center flex-column">
        <CheckCircleIcon color="success" fontSize="large" />
        <div className="py-2">আপনার অর্ডার সফল হয়েছে</div>
        <div className="py-2">
          <Button
            variant="contained"
            onClick={() => navigate(APPROUTES.orderList)}
          >
            অর্ডার লিস্ট দেখুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulOrder;
