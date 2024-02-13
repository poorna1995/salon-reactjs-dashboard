import React, { useEffect, useRef, useState } from "react";
import HivepathBaseDialog from "components/common/Dialog/HivepathBaseDialog";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import { Button, Typography, TextField, Divider, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { ReactComponent as BinIcon } from "assets/svg/general/bin.svg";
import ShowTipsDrawer from "components/common/Drawers/ShowTipsDrawer";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      height: "50px",
      [theme.breakpoints.down("sm")]: {
        height: "40px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiTypography-root": { fontSize: "12px" },
      "& .MuiButton-root": { fontSize: "12px" },
    },
  },
}));

const AddService = ({
  open,
  handleClose,
  onSubmit,
  onDelete,
  isEdit,
  editData,
}) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const { service_name, service_meta, category_id, service_id } =
    editData || {};

  const { service_price } = service_meta || {};

  const classes = useStyles();
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const disabled = !serviceName || !servicePrice;

  const updateServiceName = (e) => {
    setServiceName(e.target.value);
  };
  const updateServicePrice = (e) => {
    setServicePrice(e.target.value);
  };

  const onSubmitHandler = () => {
    let requestData = {
      service_price: servicePrice,
      service_name: serviceName,
    };
    if (isEdit) {
      const service_meta = {
        ...editData.service_meta,
        service_price: servicePrice,
      };
      requestData = {
        ...editData,
        service_name: serviceName,
        service_meta: service_meta,
      };
    }
    onSubmit(requestData);
    closeServiceAction();
  };

  const onDeleteHandler = () => {
    onDelete(category_id, service_id);
  };

  const closeServiceAction = () => {
    handleClose();
    setServiceName("");
    setServicePrice("");
  };

  useEffect(() => {
    if (service_name) {
      setServiceName(service_name);
      setServicePrice(service_price);
    }
  }, [service_name]);

  const component = (
    <div className={classes.root}>
      <Typography
        align="center"
        fontWeight="bold"
        mb={2}
        sx={{
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
          },
        }}
      >
        {isEdit ? "Edit" : "Add new"} service
      </Typography>
      <Divider />
      <Typography mt={2}>Enter service name</Typography>
      <TextField
        fullWidth
        placeholder="e.g. Facial"
        onChange={updateServiceName}
        value={serviceName}
        //   inputRef={service_name}
      />
      <Typography mt={2}>Price</Typography>
      <TextField
        fullWidth
        placeholder="e.g. 500"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <strong>₹</strong>
            </InputAdornment>
          ),
        }}
        type="number"
        onChange={updateServicePrice}
        value={servicePrice}
      />

      <Divider style={{ marginTop: "20px", marginBottom: "10px" }} />
      <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{
            textTransform: "none",
            color: "#CC2F2F",
            visibility: isEdit ? "visible" : "hidden",
          }}
          onClick={onDeleteHandler}
        >
          <BinIcon style={{ marginRight: "5px" }} />
          Delete service
        </Button>

        <div>
          <Button
            onClick={handleClose}
            style={{ marginRight: "20px", height: "50px" }}
          >
            Cancel
          </Button>
          <SecondaryButton
            title={isEdit ? "Update" : "+ Add service"}
            onClick={onSubmitHandler}
            style={{ height: "50px" }}
            disabled={disabled}
          />
        </div>
      </Box>
    </div>
  );

  if (matches) {
    return <ShowTipsDrawer open={open} component={component} />;
  }

  return (
    <HivepathBaseDialog
      open={open}
      handleClose={closeServiceAction}
      popupStyles={{
        minWidth: matches ? "none" : "600px",
        margin: matches && "10px",
      }}
    >
      {component}
    </HivepathBaseDialog>
  );
};

export default AddService;
