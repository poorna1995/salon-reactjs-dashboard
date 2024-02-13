import { Box, Paper, Table } from "@mui/material";
import React from "react";
import ODTableHeaderRow from "./components/ODTableHeaderRow";
import ODTableRow from "./components/ODTableRow";

const ODUsersTable = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Paper
      sx={{
        borderRadius: "12px",
        boxShadow: "none",
        border: "1px solid rgba(0,0,0,0.1)",
        overflow: "hidden",
        marginTop: "16px",
      }}
    >
      <Table sx={{}}>
        <ODTableHeaderRow />

        {listData.map((item) => {
          const { id, email, action, name, status, timeline, userType } = item;
          return (
            <ODTableRow
              id={id}
              email={email}
              action={action}
              name={name}
              status={status}
              timeline={timeline}
              userType={userType}
            />
          );
        })}
      </Table>
    </Paper>
  );
};

export default ODUsersTable;

const listData = [
  {
    id: 1,
    email: "willie.jennings@example.com",
    action: "block",
    name: "Kathryn Murphy",
    status: "active",
    timeline: "12/06/2020",
    userType: "Member",
  },
  {
    id: 2,
    email: "kenzi.lawson@example.com",
    action: "block",
    name: "Darlene Robertson",
    status: "invited",
    timeline: "12/06/2020",
    userType: "Host",
  },
  {
    id: 3,
    email: "nathan.roberts@example.com",
    action: "block",
    name: "Ronald Richards",
    status: "active",
    timeline: "12/06/2020",
    userType: "Host",
  },
  {
    id: 4,
    email: "willie.jennings@example.com",
    action: "block",
    name: "Kathryn Murphy",
    status: "active",
    timeline: "12/06/2020",
    userType: "Member",
  },
  {
    id: 5,
    email: "kenzi.lawson@example.com",
    action: "block",
    name: "Darlene Robertson",
    status: "invited",
    timeline: "12/06/2020",
    userType: "Host",
  },
  {
    id: 6,
    email: "nathan.roberts@example.com",
    action: "block",
    name: "Ronald Richards",
    status: "active",
    timeline: "12/06/2020",
    userType: "Host",
  },
];
