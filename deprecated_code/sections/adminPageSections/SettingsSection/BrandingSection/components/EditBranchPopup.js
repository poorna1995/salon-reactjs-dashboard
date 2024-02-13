import React, { useEffect, useRef, useState } from "react";
import HivepathBaseDialog from "components/common/Dialog/HivepathBaseDialog";
import {
  Typography,
  FormGroup,
  FormControl,
  Divider,
  TextField,
  Box,
  Button,
} from "@mui/material";
import TextInput from "components/common/Inputs/TextInput";
import CheckBoxItem from "./CheckboxItem";
import SelectInput from "components/common/Inputs/SelectInput";
import OutlinedButton from "components/common/Buttons/OutlinedButton";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import { makeStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import SelectAutoWidth from "./TimeDropDown";
import { ReactComponent as BinIcon } from "assets/svg/general/bin.svg";
import ShowTipsDrawer from "components/common/Drawers/ShowTipsDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-root": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-root": {
      height: "50px",
      [theme.breakpoints.down("sm")]: {
        height: "40px",
      },
    },
    "& .MuiButton-root": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px !important",
        padding: "0 !important",
      },
    },
    "& #submitBtn": {
      [theme.breakpoints.down("sm")]: {
        padding: "5px !important",
      },
    },
  },
}));

const amPm = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];
const hours = Array(12 - 1 + 1)
  .fill()
  .map((_, idx) => 1 + idx);
const mins = Array(5)
  .fill()
  .map((_, idx) => 15 * idx);

const hoursDropdown = hours.map((item, index) => {
  const counter = index + 1;
  const val = counter > 9 ? "" + counter : "0" + counter;
  return { label: val, value: val };
});
const minDropdown = mins.map((item, index) => {
  const val = index === 0 ? "0" + item : "" + item;
  return { label: val, value: val };
});

const initState = {
  company_name: "",
  company_location: "",
  company_address: "",
  working_days: [],
  working_time: {
    opening_hours: "08",
    opening_minutes: "00",
    opening_format: "AM",
    closing_hours: "09",
    closing_minutes: "00",
    closing_format: "PM",
  },
};
const EditBranchPopup = ({
  open,
  handleClose,
  isEdit,
  editData,
  onSubmit,
  onDelete,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const [formData, setFormData] = useState(initState);

  const { company_id } = editData || {};

  const handleWorkingDays = (title, isChecked) => {
    let input = [];
    if (isChecked) {
      input = [...formData.working_days, title];
    } else {
      input = [...formData.working_days].filter((item) => item !== title);
    }
    setFormData((state) => {
      return { ...state, working_days: input };
    });
  };

  const changeDropDownHandler = (name, value) => {
    //------------
    const input = {
      ...formData,
      working_time: { ...formData["working_time"], [name]: value },
    };
    setFormData((state) => {
      return { ...input };
    });
  };

  const changeInputHandler = (e, name) => {
    const input = { [e.target.name]: e.target.value };
    setFormData((state) => {
      return { ...state, ...input };
    });
  };

  const onSubmitHandler = () => {
    // formdata
    const {
      company_name,
      company_location,
      company_address,
      working_days,
      working_time,
    } = formData;

    const {
      opening_hours,
      opening_minutes,
      opening_format,
      closing_hours,
      closing_minutes,
      closing_format,
    } = working_time;
    let data = {
      company_name,
      company_location: company_name,
      company_address,
      working_time: {
        working_days: working_days,
        starting_time: `${opening_hours}:${opening_minutes}${opening_format}`, //"09:00AM",
        closing_time: `${closing_hours}:${closing_minutes}${closing_format}`, //"09:00PM",
        break_times: [],
      },
    };

    //-----------

    if (isEdit) {
      data = { ...data, company_id: company_id };
    }

    onSubmit(data);
  };

  const handleDelete = () => {
    onDelete(company_id);
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      const { company_name, company_address, working_time } = editData;
      const { working_days, starting_time, closing_time } = working_time;

      setFormData((state) => {
        return {
          ...state,
          company_name,
          company_address,
          working_days,
          working_time: {
            opening_hours: starting_time.slice(0, 2),
            opening_minutes: starting_time.slice(3, 5),
            opening_format: starting_time.slice(5, 7),
            closing_hours: closing_time.slice(0, 2),
            closing_minutes: closing_time.slice(3, 5),
            closing_format: closing_time.slice(5, 7),
          },
        };
      });
    }
  }, [editData]);

  const isDisabled =
    formData.company_name &&
    formData.company_address &&
    formData.working_days.length > 0;

  const component = (
    <div className={classes.root}>
      <Typography
        mb={1}
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
          },
        }}
      >
        {isEdit ? "Edit Branch Details" : "Add New Branch"}
      </Typography>
      <Divider />

      <TextInput
        title="Branch name"
        name={"company_name"}
        value={formData.company_name}
        onChange={changeInputHandler}
        noMargin={matches}
      />
      {/* <TextInput title="Enter Location" inputRef={locationRef} /> */}
      <TextInput
        title="Address"
        name={"company_address"}
        value={formData.company_address}
        onChange={changeInputHandler}
        noMargin={matches}
        multiline
        rows={matches ? 1 : 2}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "auto !important",
            paddingTop: "0",
            borderRadius: "10px",
          },
        }}
      />

      <Typography
        fontSize="14px"
        sx={{
          marginTop: "24px ",
          [theme.breakpoints.down("sm")]: {
            marginTop: "10px",
          },
        }}
      >
        Select Working Days
      </Typography>

      <FormControl
        component="fieldset"
        sx={{
          [theme.breakpoints.down("sm")]: {
            "& .MuiTypography-root": { fontSize: "12px", marginTop: "10px" },
            "& .MuiCheckbox-root": { paddingBottom: "0" },
          },
        }}
      >
        <FormGroup aria-label="position" row>
          {days.map((item, index) => (
            <CheckBoxItem
              title={item}
              key={`days${index}`}
              onChange={handleWorkingDays}
              isChecked={formData.working_days.includes(item)}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginTop: "30px",
          [theme.breakpoints.down("sm")]: {
            display: "block",
          },
        }}
      >
        <Box
          sx={{
            width: "45%",
            display: "flex",
            alignItems: "end",
            height: "50px",
            // marginTop: "50px",
          }}
        >
          <SelectAutoWidth
            options={hoursDropdown}
            onChange={changeDropDownHandler}
            name="opening_hours"
            label="Hour"
            title={"Opening time"}
            value={formData.working_time.opening_hours}
          />
          <SelectAutoWidth
            options={minDropdown}
            onChange={changeDropDownHandler}
            name="opening_minutes"
            label={"Min"}
            value={formData.working_time.opening_minutes}
          />{" "}
          <SelectAutoWidth
            options={amPm}
            onChange={changeDropDownHandler}
            name="opening_format"
            label={"AM/PM"}
            value={formData.working_time.opening_format}
          />
        </Box>
        <Box
          sx={{
            width: "45%",
            display: "flex",
            alignItems: "end",
            height: "50px",
            [theme.breakpoints.down("sm")]: {
              marginTop: "30px",
            },
          }}
        >
          <SelectAutoWidth
            title={"Closing time"}
            options={hoursDropdown}
            onChange={changeDropDownHandler}
            name="closing_hours"
            label={"Hour"}
            value={formData.working_time.closing_hours}
          />{" "}
          <SelectAutoWidth
            onChange={changeDropDownHandler}
            options={minDropdown}
            name="closing_minutes"
            label={"Min"}
            value={formData.working_time.closing_minutes}
          />{" "}
          <SelectAutoWidth
            options={amPm}
            onChange={changeDropDownHandler}
            name="closing_format"
            label={"AM/PM"}
            value={formData.working_time.closing_format}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          [theme.breakpoints.down("sm")]: {
            "& .MuiButton-root": {
              fontSize: "12px",
              height: "40px !important",
            },
          },
        }}
      >
        <Button
          sx={{
            textTransform: "none",
            color: "#CC2F2F",
            visibility: isEdit ? "visible" : "hidden",
          }}
          onClick={handleDelete}
        >
          <BinIcon style={{ marginRight: "5px" }} />
          Delete Branch
        </Button>

        <div>
          <OutlinedButton
            title="Cancel"
            onClick={handleClose}
            style={{
              height: "50px",
              marginRight: "10px",
            }}
          />
          <SecondaryButton
            id="submitBtn"
            title={isEdit ? "Update Details" : "Send Request"}
            onClick={onSubmitHandler}
            style={{ height: "50px" }}
            disabled={!isDisabled}
          />
        </div>
      </Box>
    </div>
  );

  if (matches) {
    return (
      <ShowTipsDrawer
        open={open}
        component={component}
        handleClose={handleClose}
      />
    );
  }

  return (
    <HivepathBaseDialog
      open={open}
      handleClose={handleClose}
      // popupStyles={{ paddingBottom: "20px", width: "600px" }}
      popupStyles={{
        minWidth: matches ? "0" : "600px",
        margin: matches && "10px",
      }}
    >
      {component}
    </HivepathBaseDialog>
  );
};

export default EditBranchPopup;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
