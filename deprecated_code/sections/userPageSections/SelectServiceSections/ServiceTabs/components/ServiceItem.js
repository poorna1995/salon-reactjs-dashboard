import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import CartItemButton from "components/common/Buttons/CartItemButton";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(38, 51, 77, 0.08)",
    // borderRadius: "10px",
    padding: "10px 0",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      border: "none",
      padding: "0",
      "& .MuiButton-root": {
        height: "35px",
      },
    },
  },
}));

const ServiceItem = ({ data, onAdd, onRemove }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const classes = useStyles();
  const { items } = useSelector((state) => state.cart);
  const { service_name, service_id, service_meta } = data || {};
  const { service_price } = service_meta || {};

  const currentItem = items.filter((item) => item.service_id === service_id);
  const itemCount = currentItem.length > 0 ? currentItem[0].count : 0;

  const onAddHandler = () => {
    onAdd(data);
  };

  const onRemoveHandler = () => {
    onRemove(service_id);
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography
          color="#26334D"
          fontSize="16px"
          fontWeight="bold"
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }}
        >
          {service_name}
        </Typography>

        <Typography color="#26334D" fontSize="12px" style={{ opacity: "0.5" }}>
          ₹{service_price}
        </Typography>
      </div>
      {itemCount > 0 && (
        <CartItemButton
          count={itemCount}
          onAdd={onAddHandler}
          onRemove={onRemoveHandler}
          containerStyles={{ fontSize: "16px" }}
        />
      )}
      {itemCount === 0 && <PrimaryButton title="Add" onClick={onAddHandler} />}
    </div>
  );
};

export default ServiceItem;
