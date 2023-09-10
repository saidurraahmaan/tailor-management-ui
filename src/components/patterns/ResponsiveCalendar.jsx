import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/material";

const ResponsiveCalendar = ({ value, label, handleChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack>
        <DatePicker
          label={label}
          defaultValue={dayjs()}
          disablePast
          value={value}
          onChange={handleChange}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default ResponsiveCalendar;
