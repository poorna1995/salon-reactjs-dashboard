import React from "react";
import { Typography, Divider } from "@mui/material";
import SummaryItem from "./components/SummaryItem";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "store/cart/cartSlice";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import format from "date-fns/format";

import { makeStyles } from "@mui/styles";
import MobileCart from "./MobileCart";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
    paddingBottom: "30px",
    textAlign: "left",
    border: "1px solid rgba(38, 51, 77, 0.08)",
    borderRadius: "5px",
    maxWidth: "450px",
    maxHeight: "57vh",
    overflow: "hidden",
  },
  cartHeader: {
    // background: "#F5F7FF",
    padding: "5px 20px",
    textAlign: "center",
    fontWeight: "600",
    // borderBottom: "1px solid rgba(38, 51, 77, 0.08)",
  },
  itemContainer: {
    maxHeight: "25vh",
    overflow: "auto",
  },
}));

const Summary = ({ mobile, navigate, isBookingPage }) => {
  const classes = useStyles();
  const enqueueSnackbar = useEnqueueSnackbar();
  const { items, staff, time, selectedDate } = useSelector(
    (state) => state.cart
  );
  const { company_address } = useSelector((state) => state.serviceHeader);
  let formattedDate = null;
  if (selectedDate) {
    formattedDate = format(selectedDate, "eee, d MMMM");
  }
  const dispatch = useDispatch();
  let grandTotal = 0;
  grandTotal = items.reduce(function (sum, item) {
    const { service_price } = item.service_meta;
    return sum + item.count * service_price;
  }, grandTotal);

  const addToCart = (data) => {
    const { service_id } = data;
    const item = items.filter((item) => item.service_id === service_id);

    if (item.length > 0) {
      const itemCount = item[0].count;
      if (itemCount > 9) {
        enqueueSnackbar("Cannot add more than 10 services", {
          variant: "error",
        });
        return;
      }
      let newItem = { ...item[0], count: itemCount + 1 };
      dispatch(updateItem(newItem));
    } else {
      dispatch(addItem([...items, { ...data, count: 1 }]));
    }
  };

  const decreaseItem = (service_id) => {
    const item = items.filter((item) => item.service_id === service_id);

    if (item.length > 0) {
      const selectedItem = item[0];
      if (selectedItem.count > 1) {
        let newItem = { ...item[0], count: item[0].count - 1 };
        dispatch(updateItem(newItem));
      } else {
        if (isBookingPage && items.length === 1) {
          enqueueSnackbar("Cannot remove all the items from the cart", {
            variant: "error",
          });
          return;
        }
        let filteredItem = items.filter(
          (item) => item.service_id !== service_id
        );
        dispatch(removeItem([...filteredItem]));
      }
    }
  };

  if (mobile) {
    return (
      <MobileCart
        onAdd={addToCart}
        onRemove={decreaseItem}
        navigate={navigate}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.cartHeader}>
        <Typography sx={{ fontSize: "26px" }}>Cart</Typography>
      </div>
      {items.length > 0 && (
        <div style={{ padding: "0px 20px" }}>
          {staff && (
            <Typography color="#26334D" fontSize="16px">
              Staff :{" "}
              <span style={{ marginLeft: "20px", fontWeight: "bold" }}>
                {staff}
              </span>
            </Typography>
          )}

          {selectedDate && (
            <Typography color="#26334D" fontSize="16px" mt={1}>
              <span style={{}}>Date:</span>{" "}
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {formattedDate}
              </span>
            </Typography>
          )}

          {time && (
            <Typography color="#26334D" fontSize="16px">
              <span style={{}}>Time:</span>
              <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                {time}
              </span>
            </Typography>
          )}

          {company_address && (
            <Typography
              color="#26334D"
              fontSize="16px"
              mt={selectedDate ? 0 : 1}
              title={company_address}
              mb={3}
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              <span style={{}}>Address:</span>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {company_address}
              </span>
            </Typography>
          )}

          <div className={classes.itemContainer}>
            {items.map((item, index) => {
              return (
                <SummaryItem
                  data={item}
                  key={`summaryItem${index}`}
                  onAdd={addToCart}
                  onRemove={decreaseItem}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              // marginBottom: "10px",
              borderTop: "1px solid black",
              paddingTop: "10px",
            }}
          >
            <Typography variant="h6" mb={2} fontSize="16px" fontWeight="bold">
              Subtotal
            </Typography>
            <Typography variant="h6" mb={2} fontSize="16px" fontWeight="bold">
              ₹{grandTotal}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
