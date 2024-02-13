import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import ServiceListItem from "./components/ServiceListItem";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import AddService from "./components/Popups/AddService";
import AddCategory from "./components/Popups/AddCategory";
import { updateServices } from "store/services/servicesSlice";
import { useTheme } from "@mui/styles";
import { useMediaQuery, Button } from "@mui/material";
import { ReactComponent as EditIcon } from "assets/svg/service-header/edit.svg";

import authFetch from "utils/authFetch";
import { ADMIN_SERVICES } from "constants/API_URLS";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import { GENERAL_SERVICES } from "constants/API_URLS";
import HivepathBaseDialog from "components/common/Dialog/HivepathBaseDialog";

export default function ServiceList() {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const { company_base_id, branches } = useSelector(
    (state) => state.companyInfo
  );
  const { data } = useSelector((state) => state.services);
  let sortedData = [...data];
  sortedData.sort((a, b) =>
    a.category_name > b.category_name
      ? 1
      : b.category_name > a.category_name
      ? -1
      : 0
  );

  const { user_id, domain } = useSelector((state) => state.user.currentUser);
  // const [branches, setBranches] = useState([]);
  const company_id =
    branches && branches.length > 0 ? branches[0].company_id : company_base_id;

  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();
  const [expanded, setExpanded] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [categoryData, setCategoryData] = useState({});
  const handleCloseEditCategory = () => {
    setIsEditCategory(false);
    setCategoryData(null);
  };

  const handleOpenEditCategory = (data) => {
    setIsEditCategory(true);
    setCategoryData(data);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [addServicePopup, setAddServicePopup] = useState(null);
  const openAddService = (data) => setAddServicePopup(data);
  const [editServicePopup, setEditServicePopup] = useState(false);
  const [editServiceData, setEditServiceData] = useState({});
  const openEditService = (data) => {
    setEditServicePopup(true);
    setEditServiceData(data);
  };
  const closeEditService = (data) => {
    setEditServicePopup(false);
    setEditServiceData({});
  };

  const addServiceHandler = (resData) => {
    const requestData = {
      admin_id: user_id,
      domain: domain,
      service_name: resData.service_name,
      description: "",
      company_id: company_base_id,
      service_meta: {
        price_denomination: "Rupees",
        duration_dim: "Min",
        service_price: resData.service_price,
        service_duration: resData.service_duration,
      },
      ...addServicePopup,
    };
    setIsLoading(true);
    authFetch(ADMIN_SERVICES.CREATE_SERVICE, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, message, service_id } = res;
        if (status === "success") {
          const newStateData = data.map((item) => {
            if (item.category_id === requestData.category_id) {
              return {
                ...item,
                service_list: [
                  ...item.service_list,
                  { ...requestData, service_id: service_id },
                ],
              };
            }
            return item;
          });
          dispatch(updateServices({ data: newStateData }));
          enqueueSnackbar("Service added succesfully", { variant: "success" });
          closeAddService();
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        const { message } = res;
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const closeAddService = () => {
    setAddServicePopup(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchCategories = () => {
    const requestData = {
      company_id: company_id,
      category_id: "",
      admin_id: user_id,
      domain: domain,
    };
    setIsLoading(true);
    authFetch(ADMIN_SERVICES.FETCH_AGGREGATED_CATEGORY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { result, status, message } = res;
        if (status === "success") {
          dispatch(updateServices({ data: result }));
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        const { message } = res;
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const deleteCategoryHandler = (category_id) => {
    const requestData = {
      category_id: category_id,
      company_id: company_id,
      admin_id: user_id,
      domain: domain,
    };
    setIsLoading(true);
    authFetch(ADMIN_SERVICES.DELETE_CATEGORY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, message, service_id } = res;
        if (status === "success") {
          const newStateData = data.filter(
            (item) => item.category_id !== category_id
          );
          dispatch(updateServices({ data: newStateData }));
          enqueueSnackbar(message, { variant: "success" });
          handleCloseEditCategory();
          // closeAddService();
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        const { message } = res;
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const deleteServiceHandler = (category_id, service_id) => {
    const requestData = {
      company_id: company_id,
      service_id: service_id,
      category_id: category_id,
      admin_id: user_id,
      domain: domain,
    };
    setIsLoading(true);
    authFetch(ADMIN_SERVICES.DELETE_SERVICE, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, message } = res;
        if (status === "success") {
          fetchCategories();
          // dispatch(updateServices({ data: newStateData }));
          enqueueSnackbar(message, { variant: "success" });
          closeEditService();
          // closeAddService();
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        const { message } = res;
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const editServiceHandler = (resData) => {
    const requestData = {
      ...resData,
      company_id: company_id,
      admin_id: user_id,
      domain: domain,
    };
    setIsLoading(true);
    authFetch(ADMIN_SERVICES.UPDATE_SERVICE, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, message } = res;
        if (status === "success") {
          const newStateData = data.map((item) => {
            if (item.category_id === requestData.category_id) {
              return {
                ...item,
                service_list: item.service_list.map((item) =>
                  item.service_id === resData.service_id ? resData : item
                ),
              };
            }
            return item;
          });
          dispatch(updateServices({ data: newStateData }));
          enqueueSnackbar("Service updated succesfully", {
            variant: "success",
          });
          closeEditService();
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        const { message } = res;
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ fontWeight: "800", marginBottom: "100px" }}>
      <LoadingBackdrop open={isLoading} />
      <AddService
        open={addServicePopup}
        handleClose={closeAddService}
        onSubmit={addServiceHandler}
      />
      <AddService
        open={editServicePopup}
        handleClose={closeEditService}
        onSubmit={editServiceHandler}
        onDelete={deleteServiceHandler}
        isEdit={true}
        editData={editServiceData}
      />

      <AddCategory
        open={isEditCategory}
        handleClose={handleCloseEditCategory}
        isEdit={true}
        editData={categoryData}
        onDelete={deleteCategoryHandler}
      />

      {sortedData.map((item, index) => {
        const { category_id, category_name, service_list } = item;
        let sortedServices = [...service_list];
        sortedServices.sort((a, b) =>
          a.service_name > b.service_name
            ? 1
            : b.service_name > a.service_name
            ? -1
            : 0
        );
        return (
          <Accordion
            expanded={expanded === category_id}
            onChange={handleChange(category_id)}
            key={`${index}accord`}
            sx={{
              border: "1px solid rgba(38, 51, 77, 0.08)",
              boxShadow: "none !important",
              marginBottom: "10px",
              borderRadius: "5px",
              "&::before": {
                backgroundColor: "transparent",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${category_id}bh-content`}
              id={`${category_id}bh-header`}
              sx={{
                display: "flex",
                alignItems: "center",
                "& .MuiAccordionSummary-content": {
                  display: "flex",
                  justifyContent: "space-between",
                },
              }}
            >
              <Typography
                sx={{
                  width: "70%",
                  flexShrink: 0,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {category_name}
              </Typography>
              {!matches && (
                <Typography sx={{ color: "text.secondary" }}></Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {sortedServices.map((item, index) => {
                return (
                  <ServiceListItem
                    data={item}
                    key={`${index}sli`}
                    onDelete={deleteServiceHandler}
                    onEdit={openEditService}
                  />
                );
              })}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <PrimaryButton
                  title="+ Add service"
                  onClick={() =>
                    openAddService({
                      category_id: category_id,
                      category_name: category_name,
                    })
                  }
                />

                <Button
                  onClick={() => handleOpenEditCategory(item)}
                  sx={{
                    color: "blue",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  <EditIcon style={{ marginRight: "5px" }} />
                  Edit category
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
