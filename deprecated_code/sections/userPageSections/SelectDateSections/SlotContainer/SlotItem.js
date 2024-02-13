import React from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import { Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

const SlotItem = ({ data, onclick }) => {
  const theme = useTheme();
  const { time } = useSelector((state) => state.cart);
  const isSelected = time === data;
  const onClickHandler = () => {
    onclick(data);
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }}
        >
          {data}
        </Typography>{" "}
        <PrimaryButton
          onClick={onClickHandler}
          title={isSelected ? "Selected" : "Select"}
        />
      </div>
      <Divider />
    </>
  );
};

export default SlotItem;
