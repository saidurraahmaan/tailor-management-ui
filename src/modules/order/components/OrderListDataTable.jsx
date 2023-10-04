import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const VISIBLE_FIELDS = [
  "orderNo",
  "customerName",
  "productName",
  "deliveryDate",
  "orderDate",
  'mobileNumber'
];

const sampleData = [
  {
    id: 1,
    orderNo: 12345,
    customerName: "John Doe",
    productName: "Product A",
    deliveryDate: "2023-10-10",
    orderDate: "2023-09-30",
  },
  {
    id: 2,
    orderNo: 54321,
    customerName: "Jane Smith",
    productName: "Product B",
    deliveryDate: "2023-10-15",
    orderDate: "2023-09-28",
  },
  // Add more data as needed
];

export default function OrderListDataTable({orderDataList}) {
  const [orderList, setOrderList] = useState([]);

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      VISIBLE_FIELDS.map((field) => ({
        field,
        headerName: field,
        flex: 1,
      })),
    []
  );

  useEffect(() => {
    setOrderList(sampleData);
  }, []);

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={orderList}
        columns={columns}
        disableColumnFilter
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
