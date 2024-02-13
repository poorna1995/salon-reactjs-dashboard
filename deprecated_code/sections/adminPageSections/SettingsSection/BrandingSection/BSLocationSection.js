import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Divider } from "@mui/material";
import LocationItem from "sections/userPageSections/SelectLocationPageSections/components/LocationItem";
import EditBranchPopup from "./components/EditBranchPopup";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES, GENERAL_SERVICES } from "constants/API_URLS";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import { useTheme } from "@mui/styles";

const BSLocationSection = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const enqueueSnackbar = useEnqueueSnackbar();
  const { company_base_name, company_base_id } = useSelector(
    (state) => state.companyInfo || {}
  );
  const { user_id, domain } = useSelector((state) => state.user.currentUser);
  const [editPopup, setEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [addPopup, setAddPopup] = useState(false);
  const closeEditPopup = () => {
    setEditPopup(false);
    setEditData({});
  };

  const openEditPopup = (data) => {
    setEditData(data);
    setEditPopup(true);
  };
  const toggleAddPopup = () => {
    setAddPopup((state) => !state);
  };

  const fetchCompanyDetails = () => {
    setIsLoading(true);
    const requestData = {
      company_id: "",
      company_base_id: company_base_id,
      admin_id: user_id,
      domain: domain,
    };
    authFetch(GENERAL_SERVICES.FETCH_COMPANY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, result, message } = res;
        if (status === "success") {
          setBranches(result.filter((item) => item.company_name !== ""));
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
      });
  };
  const addBranchHandler = (data) => {
    const requestData = {
      ...data,
      company_base_name: company_base_name,
      company_base_id: company_base_id,
      timezone: "Asia/Calcutta",
      company_country: "",
      company_logo: "",
      admin_id: user_id,
      domain: domain,
    };
    setIsLoading(true);
    authFetch(ADMIN_SERVICES.CREATE_BRANCH, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, result, message } = res;
        if (status === "success") {
          enqueueSnackbar(message, { variant: "success" });
          toggleAddPopup();
          fetchCompanyDetails();
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar(res.message, { variant: "error" });
        console.log(res);
      });
  };

  const updateBranchHandler = (data) => {
    const requestData = {
      ...data,
      company_base_name: company_base_name,
      company_base_id: company_base_id,
      timezone: "Asia/Calcutta",
      company_country: "",
      company_logo: "",
      admin_id: user_id,
      domain: domain,
    };
    setIsLoading(true);
    authFetch(ADMIN_SERVICES.UPDATE_COMPANY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, result, message } = res;
        if (status === "success") {
          closeEditPopup();
          setBranches((state) =>
            state.map((item) =>
              item.company_id === requestData.company_id ? requestData : item
            )
          );
          enqueueSnackbar(message, { variant: "success" });
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar(res.message, { variant: "error" });
        console.log(res);
      });
  };

  const deleteBranch = (company_id) => {
    setIsLoading(true);
    const requestData = {
      company_id: company_id,
      admin_id: user_id,
      domain: domain,
    };
    authFetch(ADMIN_SERVICES.DELETE_COMPANY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, message } = res;
        if (status === "success") {
          const removedBranch = branches.filter(
            (item) => item.company_id !== company_id
          );
          setBranches(removedBranch);
          closeEditPopup();
          enqueueSnackbar(message, { variant: "success" });
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
        enqueueSnackbar(res.message, { variant: "error" });
      });
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  return (
    <div>
      <LoadingBackdrop open={isLoading} />
      <EditBranchPopup
        open={editPopup}
        handleClose={closeEditPopup}
        isEdit={true}
        editData={editData}
        onSubmit={updateBranchHandler}
        onDelete={deleteBranch}
      />
      <EditBranchPopup
        open={addPopup}
        handleClose={toggleAddPopup}
        onSubmit={addBranchHandler}
      />

      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography
          mr={2}
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          Branches
        </Typography>
        <Divider style={{ width: "70%" }} />
      </div>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
          alignItems: "center",
          width: "90%",
          padding: "30px",
          minHeight: "80px",
          [theme.breakpoints.down("sm")]: {
            display: "block",
            width: "100%",
            // padding: "0",
          },
        }}
      >
        {branches.map((item, index) => {
          const { company_id } = item;
          return (
            <div key={`branchesdiv${index}`}>
              <LocationItem
                data={item}
                titleStyle={{ fontSize: "14px" }}
                conatinerStyle={{ marginBottom: "0" }}
                onclick={() => openEditPopup(item)}
              />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {/* <Typography
                  color="#3361FF"
                  fontSize="14px"
                  textAlign="center"
                  onClick={() => openEditPopup(item)}
                  sx={{
                    cursor: "pointer",
                    [theme.breakpoints.down("sm")]: {
                      // marginLeft: "10px",
                    },
                  }}
                >
                  Edit
                </Typography> */}
                {/* <Typography
                  color="#3361FF"
                  fontSize="14px"
                  textAlign="center"
                  onClick={() => deleteBranch(company_id)}
                  sx={{
                    cursor: "pointer",
                    [theme.breakpoints.down("sm")]: {
                      // marginLeft: "10px",
                    },
                  }}
                >
                  Delete
                </Typography> */}
              </div>
            </div>
          );
        })}

        <Typography
          fontWeight="bold"
          color="#3361FF"
          fontSize="16px"
          textAlign="center"
          sx={{
            width: "200px",
            cursor: "pointer",
            [theme.breakpoints.down("sm")]: {
              marginTop: "10px",
              width: "100%",
            },
          }}
          onClick={toggleAddPopup}
        >
          Request new branch addition
        </Typography>
      </Box>
    </div>
  );
};

export default BSLocationSection;

// const data = [
//   "South Ex, New Delhi",
//   "Vasant Kunj , New Delhi",
//   "Rajouri Garden, New Delhi",
// ];
