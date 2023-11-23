import React from "react";
import "../index.css";

const tableStyle = {
  border: "1px solid #000",
  borderCollapse: "collapse",
  width: "100%",
};

const cellStyle = {
  border: "1px solid #000",
  padding: "8px",
};

const valueCellStyle = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "end",
};

const OrderedItemListCustomer = ({
  advance,
  discount,
  clothPrice,
  orderedItems,
}) => {
  const calculateTotalPrice = () => {
    let totalCost = 0;
    orderedItems.forEach((element) => {
      totalCost += Number(element.makingCost) * Number(element.quantity);
    });

    return totalCost + Number(clothPrice);
  };

  return (
    <div>
      <table style={tableStyle} className="font-14">
        <thead>
          <tr>
            <th className="text-center" style={cellStyle}>
              বর্ণনা
            </th>
            <th className="text-center" style={cellStyle}>
              মূল্য
            </th>
          </tr>
        </thead>
        <tbody>
          {clothPrice ? (
            <tr>
              <td style={cellStyle}>কাপড়</td>
              <td style={valueCellStyle}>{clothPrice} </td>
            </tr>
          ) : (
            <></>
          )}
          {orderedItems.map((ele) => (
            <tr key={ele.id}>
              <td style={cellStyle}>
                {ele.productName} X {ele.quantity}
              </td>
              <td style={valueCellStyle}>
                {Number(ele.makingCost) * Number(ele.quantity)}
              </td>
            </tr>
          ))}
          <tr>
            <td style={cellStyle}>মোট</td>
            <td style={valueCellStyle}>{calculateTotalPrice()} </td>
          </tr>
          <tr>
            <td style={cellStyle}>ডিস্কাউন্ট</td>
            <td style={valueCellStyle}>{discount || 0} </td>
          </tr>
          <tr>
            <td style={cellStyle}>এডভান্স</td>
            <td style={valueCellStyle}>{advance || 0} </td>
          </tr>
          <tr>
            <td style={cellStyle}>বাকী</td>
            <td style={valueCellStyle}>
              {calculateTotalPrice() - Number(advance) - Number(discount)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderedItemListCustomer;
