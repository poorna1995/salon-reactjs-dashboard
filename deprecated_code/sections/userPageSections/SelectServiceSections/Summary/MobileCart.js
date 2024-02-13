import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import SummaryItem from "./components/SummaryItem";

import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import MobileCartHeader from "./components/MobileCartHeader";

function MobileCart(props) {
  const { window, onAdd, onRemove, navigate } = props;
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  const { items } = useSelector((state) => state.cart);
  return (
    <div>
      <React.Fragment key={"bottom"}>
        <MobileCartHeader
          navigate={navigate}
          toggleDrawer={toggleDrawer}
          open={state}
        />
        <SwipeableDrawer
          anchor={"bottom"}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box sx={{ overflow: "auto" }}>
            {items.map((item, index) => {
              return (
                <SummaryItem
                  data={item}
                  key={`summaryItem${index}`}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              );
            })}
          </Box>
          <MobileCartHeader
            navigate={navigate}
            toggleDrawer={toggleDrawer}
            styles={{ position: "relative"}}
            open={state}
          />
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

export default MobileCart;
