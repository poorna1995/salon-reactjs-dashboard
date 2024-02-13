import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ServiceItem from "./components/ServiceItem";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "store/cart/cartSlice";
import MobileServiceSection from "./MobileServiceSection";
import ScrollSpyTabs from "./components/ScrollSpyTabs";
import res from "data/serviceData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, paddingTop: "0" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ServiceTabs = ({ data }) => {
  const theme = useTheme();
  // const data = res.result;
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const enqueueSnackbar = useEnqueueSnackbar();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addToCart = (data) => {
    const { service_id } = data;
    const item = cartItems.filter((item) => item.service_id === service_id);

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
      dispatch(addItem([...cartItems, { ...data, count: 1 }]));
    }
  };

  const decreaseItem = (service_id) => {
    const item = cartItems.filter((item) => item.service_id === service_id);

    if (item.length > 0) {
      const selectedItem = item[0];
      const itemCount = item[0].count;
      if (selectedItem.count > 1) {
        let newItem = { ...item[0], count: itemCount - 1 };
        dispatch(updateItem(newItem));
      } else {
        let filteredItem = cartItems.filter(
          (item) => item.service_id !== service_id
        );
        dispatch(removeItem([...filteredItem]));
      }
    }
  };

  // Mobile view
  if (matches) {
    return (
      <MobileServiceSection
        data={data}
        onAdd={addToCart}
        onRemove={decreaseItem}
      />
    );
  }

  const scrollData =
    data.map((item, index) => {
      const { category_name, service_list } = item;
      const components = service_list.map((tabItem) => (
        <ServiceItem
          data={tabItem}
          onAdd={addToCart}
          onRemove={decreaseItem}
          key={`si${index}`}
        />
      ));
      return {
        text: category_name,
        component: components,
      };
    }) || [];

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {scrollData.length > 0 && <ScrollSpyTabs tabsInScroll={scrollData} />}
      </Box>
    </>
  );
};

export default ServiceTabs;
