import { Chip, TableCell, TableRow, Button } from "@mui/material";
import React from "react";

const CTTableRow = ({
  id,
  name,
  email,
  number,
  date,
  time,
  status,
  data,
  showDetails,
}) => {
  return (
    <TableRow
      // key={row.name}
      sx={{
        "&:last-child td, &:last-child th": { borderRadius: "12px" },
        "&:th ": {
          fontSize: "16px",
          lineHeight: "21px",
        },
        "&: td": {
          fontSize: "16px",
          lineHeight: "21px",
          fontWeight: "500",
        },
      }}
    >
      <TableCell
        sx={{
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: " 21px",
          color: "#000000",
        }}
      >
        {name}
      </TableCell>
      {/* <TableCell>{email}</TableCell> */}
      <TableCell>{number}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell>
        {status === "confirmed" && (
          <Chip
            sx={{
              background: "#3361FF1A",
              color: "#3361FF",
              textTransform: "capitalize",
            }}
            label={status}
          />
        )}
        {status === "completed" && (
          <Chip
            sx={{
              background: "#00AF461A",
              color: "#00AF46",
              textTransform: "capitalize",
            }}
            label={status}
          />
        )}

        {status === "cancelled" && (
          <Chip
            sx={{
              background: "rgba(252, 236, 225, 0.6)",
              color: "#000",
              textTransform: "capitalize",
            }}
            label={status}
          />
        )}
      </TableCell>
      <TableCell>
        <Button onClick={() => showDetails(data)}>View</Button>
      </TableCell>
    </TableRow>
  );
};

export default CTTableRow;
