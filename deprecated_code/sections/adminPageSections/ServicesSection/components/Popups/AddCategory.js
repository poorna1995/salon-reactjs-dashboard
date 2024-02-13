import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HivepathBaseDialog from "components/common/Dialog/HivepathBaseDialog";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import { Button, Typography, TextField, Divider, Box } from "@mui/material";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES } from "constants/API_URLS";
import { updateServices } from "store/services/servicesSlice";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { ReactComponent as BinIcon } from "assets/svg/general/bin.svg";
import ShowTipsDrawer from "components/common/Drawers/ShowTipsDrawer";

const AddCategory = ({ open, handleClose, isEdit, editData, onDelete }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const { category_name, category_id } = editData || {};
  const [categoryState, setCategoryState] = useState("");

  const dispatch = useDispatch();
  const { company_base_id, branches } = useSelector(
    (state) => state.companyInfo
  );
  const branchesData = branches | [];

  const { user_id, domain } = useSelector((state) => state.user.currentUser);
  const { data } = useSelector((state) => state.services);
  const category = useRef();
  const enqueueSnackbar = useEnquequeSnackbar();

  const handleAddCategory = () => {
    if (branches.length > 0) {
      const company_id = branches[0].company_id;
      const categoryValue = categoryState; //category.current.value;
      const requestData = {
        category_name: categoryValue,
        description: "",
        company_id: company_id,
        admin_id: user_id,
        domain: domain,
      };
      authFetch(ADMIN_SERVICES.CREATE_CATEGORY, requestData)
        .then((res) => {
          const { status, message, category_id } = res;
          if (status === "success") {
            const newCategory = {
              category_id,
              category_name: categoryValue,
              service_list: [],
            };
            const newCategoryState = [...data, newCategory];
            dispatch(updateServices({ data: newCategoryState }));
            enqueueSnackbar(message, { variant: "success" });
            closeHandleAction();
          } else {
            enqueueSnackbar(message, { variant: "error" });
          }
        })
        .catch((res) => {
          const { message } = res;
          enqueueSnackbar(message, { variant: "error" });
        });
    }
  };

  const handleEditCategory = () => {
    if (branches.length > 0) {
      const company_id = branches[0].company_id;
      const categoryValue = categoryState; //category.current.value;
      const requestData = {
        company_id: company_id,
        category_id: category_id,
        category_name: categoryValue,
        description: "",
        admin_id: user_id,
        domain: domain,
      };
      authFetch(ADMIN_SERVICES.UPDATE_CATEGORY, requestData)
        .then((res) => {
          const { status, message } = res;
          if (status === "success") {
            const modifiedData = data.map((item) => {
              return item.category_id === category_id
                ? { ...item, category_name: categoryValue }
                : { ...item };
            });
            dispatch(updateServices({ data: modifiedData }));
            enqueueSnackbar(message, { variant: "success" });
            handleClose();
          } else {
            enqueueSnackbar(message, { variant: "error" });
          }
        })
        .catch((res) => {
          console.log(res);
          enqueueSnackbar(res.message, { variant: "error" });
        });
    }
  };

  const handleCategoryName = (e) => {
    setCategoryState(e.target.value);
  };

  const onDeleteHandler = () => {
    onDelete(category_id);
  };

  const closeHandleAction = () => {
    handleClose();
    setCategoryState("");
  };

  useEffect(() => {
    if (category_name) {
      setCategoryState(category_name);
    }
  }, [category_name]);

  const component = (
    <div>
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
        {isEdit ? "Edit" : "Add new"} category
      </Typography>
      <Divider />
      <Typography
        mt={2}
        sx={{
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
          },
        }}
      >
        Enter category name
      </Typography>
      <TextField
        fullWidth
        inputRef={category}
        value={categoryState}
        onChange={handleCategoryName}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "50px",
            [theme.breakpoints.down("sm")]: {
              height: "40px",
            },
          },
        }}
      />
      <Divider style={{ marginTop: "20px", marginBottom: "10px" }} />
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.down("sm")]: {
            "& .MuiButton-root": { fontSize: "12px" },
          },
        }}
      >
        <Button
          sx={{
            textTransform: "none",
            color: "#CC2F2F",
            visibility: isEdit ? "visible" : "hidden",
          }}
          onClick={onDeleteHandler}
        >
          <BinIcon style={{ marginRight: "5px" }} />
          Delete category
        </Button>
        <div>
          <Button
            onClick={handleClose}
            style={{ marginRight: "20px", height: "50px" }}
          >
            Cancel
          </Button>
          <SecondaryButton
            title={isEdit ? "Update" : "Add category"}
            style={{ height: "50px" }}
            onClick={isEdit ? handleEditCategory : handleAddCategory}
            disabled={!categoryState}
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
      handleClose={closeHandleAction}
      popupStyles={{
        minWidth: matches ? "none" : "600px",
        margin: matches && "10px",
      }}
    >
      {component}
    </HivepathBaseDialog>
  );
};

export default AddCategory;
