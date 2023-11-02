import React, { Fragment } from "react";
import ProductListWithoutDelete from "./ProductListwithoutDelete";
import { useNavigate } from "react-router-dom";
import { APPROUTES } from "../../../constants/routes";
import { Button, Pagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const PaginatedProductList = ({ data, itemsPerPage }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentData.map((ele) => (
        <ProductListWithoutDelete
          key={ele._id}
          type={ele.productType}
          productName={ele.productName}
          handleEdit={() => navigate(APPROUTES.productEdit(ele._id))}
        />
      ))}
      {Array.from({ length: itemsPerPage - currentData.length }).map(
        (_, index) => (
          <Fragment key={index}>
            <Grid xs={4}></Grid>
            <Grid xs={4}></Grid>
            <Grid xs={4} sx={{ visibility: "hidden" }}>
              <Button variant="contained">Edit</Button>
            </Grid>
          </Fragment>
        )
      )}

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="secondary"
        sx={{
          "& .MuiPaginationItem-page": {
            fontSize: "20px",
            padding: 1,
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        className="pt-5"
      />
    </>
  );
};

export default PaginatedProductList;
