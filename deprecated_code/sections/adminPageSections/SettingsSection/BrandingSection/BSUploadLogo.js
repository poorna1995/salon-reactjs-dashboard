import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import cameraIcon from "assets/svg/general/camera.svg";
// import { ReactComponent as LogoDots } from "assets/svg/all/new-icons/admin-page/logo-dots.svg";
import { ADMIN_SERVICES } from "constants/API_URLS";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

// import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    background: "rgba(38, 51, 77, 0.04)",
    borderRadius: "5px",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      textAlign: "center",
    },
  },
  noImageDivContainer: {
    position: "relative",
    background: "#F7F7F7",
    borderRadius: "9px",
    padding: "10px",
    width: "250px",
    marginBottom: "16px",
    marginRight: "10px",
    height: "90px",
    display: "flex",
    alignItems: "center",
  },
  imageDivContainer: {
    position: "relative",
    borderRadius: "10px",
    width: "250px",
    marginBottom: "16px",
    marginRight: "10px",
    height: "90px",
    "& img": {
      width: "100%",
      margin: "auto",
      height: "100%",
      borderRadius: "10px",
      objectFit: "contain",
    },
  },
  overlay: {
    top: "0",
    left: "0",
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    opacity: "0",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      opacity: "1",
      cursor: "pointer",
      backgroundColor: "#a4939366",
    },
    "& img": {
      width: "30px",
      height: "30px",
    },
  },
  uploadBtnContainer: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: { marginLeft: "0" },
  },
}));

// const mapState = ({ user, companyInfo }) => ({
//   currentUser: user.currentUser,
//   companyInfo: companyInfo,
// });

const BSUploadLogo = ({ onSubmit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();
  //   const [isLoading, setIsLoading] = useState(false);
  const { company_logo } = useSelector((state) => state.companyInfo || {});
  const [logoImg, setLogoImg] = useState(null);

  const setProfileImgHandler = (file) => {
    const fileSize = file.size / 1024 / 1024;
    if (fileSize > 10) {
      enqueueSnackbar("Image size must be less than 10 Mb", {
        variant: "error",
      });
      return;
    }
    setLogoImg(file);
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", logoImg);
    const url = `${ADMIN_SERVICES.UPLOAD_FILE_SERVICE}?type=company_logo&category=company_logo
    `;
    // setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        // setIsLoading(false);
        const { status, file_url, message } = json;
        if (status === "success") {
          onSubmit(file_url);
          enqueueSnackbar(message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(message, {
            variant: "error",
          });
        }
        //
      })
      .catch((err) => {
        console.error(err);
        const { message } = err;
        // setIsLoading(false);
        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  return (
    <>
      {/* <LoadingBackdrop open={isLoading} /> */}
      <Typography fontSize="14px" mb={1}>
        Add logo
      </Typography>
      <div className={classes.root}>
        <label htmlFor="file-input" style={{ display: "inline-block" }}>
          {!logoImg && !company_logo && (
            <div className={classes.noImageDivContainer}>
              <div className={classes.overlay}>
                <img src={cameraIcon} alt="camera" />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {/* <LogoDots /> */}
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "29px",
                    lineHeight: "38px",
                  }}
                >
                  Your Logo
                </Typography>
              </div>
            </div>
          )}

          {company_logo && !logoImg && (
            <div className={classes.imageDivContainer}>
              <div className={classes.overlay}>
                <img src={cameraIcon} alt="camera" />
              </div>

              <img src={`${company_logo}`} alt="logo" />
            </div>
          )}

          {logoImg && (
            <div className={classes.imageDivContainer}>
              <div className={classes.overlay}>
                <img src={cameraIcon} alt="camera" />
              </div>

              <img src={URL.createObjectURL(logoImg)} alt="logo" />
            </div>
          )}
        </label>

        <input
          style={{ display: "none" }}
          type="file"
          id="file-input"
          name="logoImg"
          accept="image/*"
          onChange={(event) => {
            setProfileImgHandler(event.target.files[0]);
          }}
        />

        <Box className={classes.uploadBtnContainer}>
          <SecondaryButton
            title={`Upload`}
            style={{ width: "160px", height: "50px" }}
            onClick={uploadImage}
          />
          <Typography
            fontSize="14px"
            color="#26334D"
            mt={1}
            style={{ opacity: "0.7" }}
          >
            PNG with transparent backround recommended
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default BSUploadLogo;
