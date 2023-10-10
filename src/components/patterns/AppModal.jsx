import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button, DialogActions } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(3px)",
  zIndex: 10,
};

const AppModal = ({
  open,
  title,
  children,
  handleOk,
  handleClose,
  modalContentStyle,
  ...rest
}) => {
  return (
    <>
      {open && <div style={backdropStyle} />}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        {...rest}
      >
        <DialogTitle sx={{ p: 1 }}>
          <div className="flex justify-content-between">
            <div className="font-12 font-accentThree pl-2 ">{title}</div>
          </div>
        </DialogTitle>
        <DialogContent sx={{ overflowWrap: "anywhere", ...modalContentStyle }}>
          {children}
        </DialogContent>
        <DialogActions>
          <div className="flex  g-3">
            <Button variant="contained" onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleOk} color="success">
              Ok
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AppModal;
