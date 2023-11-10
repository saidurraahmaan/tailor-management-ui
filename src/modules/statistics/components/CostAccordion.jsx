import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { STATUS } from "../../../constants/fetch";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CostAccordion() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [fetchStatus, setFetchStatus] = React.useState(STATUS.IDLE);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <TextField ref={ref} onClick={onClick} value={value} autoComplete="off" />
  ));

  const handleBtnClick = () => {
    console.log({ startDate, endDate });
    setFetchStatus(STATUS.LOADING);
  };

  return (
    <div className="py-2">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary>
          <Typography>তারিখ ভিত্তিক অর্ডার এবং আয় স্ট্যাটিসটিক্স</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex align-items-center g-3">
            <div className="flex align-items-center g-3">
              <div>একটি ডেট রেঞ্জ সিলেক্ট করুন</div>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                customInput={<ExampleCustomInput />}
                isClearable={true}
              />
            </div>
            <LoadingButton
              loading={fetchStatus === STATUS.LOADING}
              variant="contained"
              onClick={handleBtnClick}
            >
              রেজাল্ট দেখুন
            </LoadingButton>
          </div>
          {fetchStatus !== STATUS.IDLE && <div>Hello </div>}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}