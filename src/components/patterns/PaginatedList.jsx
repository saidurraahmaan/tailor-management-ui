import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginatedList = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Stack spacing={2}>
        {currentData.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
};

export default PaginatedList;
