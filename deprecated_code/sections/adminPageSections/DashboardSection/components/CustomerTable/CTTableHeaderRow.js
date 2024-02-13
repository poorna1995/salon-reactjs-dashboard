import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const CTTableHeaderRow = () => {
  return (
    <TableHead
      sx={{
        borderRadius: "12px 12px 0px 0px",
      }}
    >
      <TableRow
        sx={{
          background: "#F6F6F6",
          "& th": {
            fontWeight: "700",
            fontSize: "18px",
            lineHeight: "208.02%",
            color: "#000000",
          },
        }}
      >
        <TableCell>Name</TableCell>
        {/* <TableCell>Email</TableCell> */}
        <TableCell align="left">Number</TableCell>
        <TableCell align="left">Date</TableCell>
        <TableCell align="left">Time</TableCell>
		<TableCell align="left">Status</TableCell>
        <TableCell align="left"></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CTTableHeaderRow;
