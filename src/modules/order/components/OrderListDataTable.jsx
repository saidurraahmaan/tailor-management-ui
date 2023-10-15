import React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { dateTimeFormat } from "../../../constants/dateTimeFormat";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { APPROUTES } from "../../../constants/routes";

const VISIBLE_FIELDS = [
  { field: "orderNo", header: "Order No" },
  { field: "customerName", header: "Customer Name" },
  { field: "productName", header: "Product Name" },
  { field: "deliveryDate", header: "Delivery Date" },
  { field: "orderDate", header: "Order Date" },
  { field: "mobileNumber", header: "Mobile Number" },
  { field: "isDelivered", header: "isDelivered" },
  { field: "action", header: "actions" },
];

// const sampleData = [
//   {
//     id: 1,
//     orderNo: 12345,
//     customerName: "John Doe",
//     productName: ["go", "lol"],
//     deliveryDate: "2023-10-10",
//     orderDate: "2023-09-30",
//     isDelivered: false,
//   },
//   {
//     id: 2,
//     orderNo: 54321,
//     customerName: "Jane Smith",
//     productName: "B",
//     deliveryDate: "2023-10-15",
//     orderDate: "2023-09-28",
//     isDelivered: true,
//   },
//   // Add more data as needed
// ];

export default function OrderListDataTable({ orderDataList }) {
  const navigate = useNavigate();
  // const [orderList, setOrderList] = useState([]);

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      VISIBLE_FIELDS.map((obj) => ({
        field: obj.field,
        headerName: obj.header,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          if (obj.field === "productName" && Array.isArray(params.value)) {
            return params.value.join(",");
          }
          if (obj.field.includes("Date")) {
            return dayjs(params.value).format(dateTimeFormat.orderGridDate);
          }
          if (obj.field === "isDelivered") {
            return params.value ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              <CancelIcon style={{ color: "red" }} />
            );
          }
          if (obj.field === "action") {
            return (
              <div>
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(APPROUTES.orderDetails(params.row.id))
                  }
                >
                  Details
                </Button>
              </div>
            );
          }
          return params.value;
        },
      })),
    [navigate]
  );

  return (
    <Box sx={{ maxWidth: "xxl" }}>
      <DataGrid
        rows={orderDataList}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}
