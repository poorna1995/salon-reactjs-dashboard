import React from "react";
import { Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CartItemButton from "components/common/Buttons/CartItemButton";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    [theme.breakpoints.down("sm")]: {
      // fontSize: "24px",
      padding: "20px",
    },
  },
}));

const SummaryItem = ({ data, onAdd, onRemove }) => {
  const classes = useStyles();
  const { service_name, service_id, service_meta, count } = data;
  const { service_price } = service_meta;

  const { items } = useSelector((state) => state.cart);
  const currentItem = items.filter((item) => item.service_id === service_id);
  const itemCount = currentItem.length > 0 ? currentItem[0].count : 0;

  const onAddHandler = () => {
    onAdd(data);
  };

  const onRemoveHandler = () => {
    onRemove(service_id);
  };
  return (
    <>
      <div className={classes.root}>
        <div style={{ width: "50%" }}>
          <Typography color="#26334D" fontSize="16px" fontWeight="bold" mb={1}>
            {service_name}
          </Typography>

          {/* <Typography color="#26334D" fontSize="12px" opacity="0.5">
						{service_duration} {duration_dim}
					</Typography> */}
        </div>
        <div style={{ width: "32%" }}>
          <CartItemButton
            count={itemCount}
            onAdd={onAddHandler}
            onRemove={onRemoveHandler}
          />
        </div>

        <Typography
          fontSize="12px"
          fontWeight="700"
          textAlign={"right"}
          width="20%"
        >
          ₹{count * service_price}
        </Typography>
      </div>
      {/* <Divider /> */}
    </>
  );
};

export default SummaryItem;
