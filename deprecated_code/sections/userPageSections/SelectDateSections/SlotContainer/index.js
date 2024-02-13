import React from "react";
import Typography from "@mui/material/Typography";
import SlotItem from "./SlotItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCart } from "../../../../store/cart/cartSlice";
import format from "date-fns/format";

const Slots = ({ data }) => {
  const { company_domain } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedDate } = useSelector((state) => state.cart);
  let formattedDate = null;
  let filteredSlot = [];
  if (selectedDate) {
    formattedDate = format(selectedDate, "eee, d MMMM");
    filteredSlot = data.filter(
      (item) => item.service_date === format(selectedDate, "yyyy-MM-dd")
    );
  }

  let slots = [];
  if (filteredSlot.length > 0) {
    slots = filteredSlot[0].service_time;
  }

  const selectSlot = (time) => {
    dispatch(updateCart({ time: time }));
    navigate(`/${company_domain}/confirm-booking`);
  };

  return (
    <div style={{ paddingTop: "30px", maxHeight: "60vh", overflow: "scroll" }}>
      <Typography
        color="#26334D"
        fontSize="18px"
        fontWeight="bold"
        align="left"
        paddingLeft={"20px"}
      >
        {formattedDate}
      </Typography>
      {slots.map((item, index) => (
        <SlotItem data={item} onclick={selectSlot} key={`slotItem${index}`} />
      ))}
    </div>
  );
};

export default Slots;
