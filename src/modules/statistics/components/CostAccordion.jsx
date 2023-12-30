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
import { getRangeState } from "../statisticsApi";
import { APIROUTES } from "../../../constants/routes";
import dayjs from "dayjs";
import { dateTimeFormat } from "../../../constants/dateTimeFormat";

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
  const [expanded, setExpanded] = React.useState(null);
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [fetchData, setFetchDate] = React.useState({
    totalIncome: 0,
    totalDeliveredOrders: 0,
    totalOrders: 0,
  });
  const [fetchStatus, setFetchStatus] = React.useState(STATUS.IDLE);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <TextField ref={ref} onClick={onClick} value={value} autoComplete="off" />
  ));

  const handleBtnClick = async () => {
    setFetchStatus(STATUS.LOADING);

    const url =
      APIROUTES.getRangeState +
      `?from=${dayjs(startDate).format(
        dateTimeFormat.orderGridDate
      )}&to=${dayjs(endDate).format(dateTimeFormat.orderGridDate)}`;
    const response = await getRangeState(url).catch((e) =>
      setFetchStatus(STATUS.ERROR)
    );
    if (response) {
      setFetchDate((prev) => ({
        ...prev,
        totalIncome: response.data.totalIncome,
        totalOrders: response.data.totalOrders,
        totalDeliveredOrders: response.data.totalDeliveredOrders,
      }));
      setFetchStatus(STATUS.SUCCESS);
    }
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
          {fetchStatus === STATUS.SUCCESS && (
            <div>
              <div className="py-2">
                মোট ডেলিভারি করা অর্ডার: {fetchData.totalDeliveredOrders}
              </div>
              <div className="py-2">মোট অর্ডার: {fetchData.totalOrders}</div>
              <div className="py-2">মোট আয়: {fetchData.totalIncome}</div>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
