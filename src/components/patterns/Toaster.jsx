import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = ({
  open,
  message,
  severity,
  handleClose,
  autoHideDuration,
  ...rest
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || 5000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
    >
      <Alert onClose={handleClose} severity={severity} {...rest}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
