import React from "react";
import { Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

const ServiceListItem = ({ data, onDelete, onEdit }) => {
  const theme = useTheme();
  const { service_name, service_meta, category_id, service_id } = data;
  const { duration_dim, service_duration, service_price } = service_meta || {};

  const onDeleteHandler = () => {
    onDelete(category_id, service_id);
  };

  const onEditHandler = () => {
    onEdit(data);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "400",
          padding: "10px 5px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          {service_name}
        </Typography>

        <div style={{ display: "flex" }}>
          <Typography
            sx={{
              background: "#26334D0D",
              padding: "5px 20px",
              borderRadius: "5px",
              fontWeight: "600",
              marginRight: "20px",
              [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
              },
            }}
          >
            ₹{service_price}
            {/* <Button onClick={onDeleteHandler} style={{ marginRight: "10px" }}>
            Delete
          </Button> */}
          </Typography>
          <Button
            onClick={onEditHandler}
            style={{ color: "#3361FF", fontWeight: "bold" }}
          >
            Edit
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ServiceListItem;
