import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, TextField } from "@mui/material";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { auth, recaptcha, signIn } from "./firebaseAuth";
import { RecaptchaVerifier } from "firebase/auth";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    "& .MuiFormControl-root, .react-tel-input": {
      marginBottom: "20px",
      width: "75%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      textAlign: "left",
      "& .form-control": {
        height: "50px",
        width: "100%",
        // border: "1px solid rgba(38, 51, 77, 0.15)",
        [theme.breakpoints.down("sm")]: {
          fontSize: "14px",
        },
      },
    },
    "& .react-tel-input": { marginBottom: "0" },
    "& .MuiOutlinedInput-root": {
      height: "50px",
      // border: "1px solid rgba(38, 51, 77, 0.15)",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
    },
    "& .MuiFormHelperText-root": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiButton-root": {
        fontSize: "10px",
        padding: "0 2px !important",
      },
    },
  },
  otpHelperText: {
    fontSize: "11px",
    color: "#26334D",
    opacity: "0.5",
    marginBottom: "20px",
  },
}));

const ScheduleForm = ({ onSubmit }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const [isLoading, setIsLoading] = useState(false);
  const enqueueSnackbar = useEnqueueSnackbar();
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isResend, setIsResend] = useState(0);
  const [phone, setPhone] = useState(null);

  const classes = useStyles();
  const firstnameRef = useRef();
  // const lastnameRef = useRef();
  // const emailRef = useRef();
  const mobileRef = useRef();
  const OTPRef = useRef();
  const notesRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const requestData = {
      customer_first_name: firstnameRef.current.value,
      customer_last_name: "", //lastnameRef.current.value,
      customer_email: "", //emailRef.current.value,
      customer_phone: phone, //mobileRef.current.value,
      booking_note: notesRef.current.value,
    };
    onSubmit(requestData);
  };

  const sendOTP = () => {
    const phoneNumber = `+${phone}`; //mobileRef.current.value;
    const appVerifier = window.recaptchaVerifier;
    setIsLoading(true);
    signIn(auth, phoneNumber, appVerifier)
      .then((result) => {
        setIsLoading(false);
        // SMS sent. Prompt user to type the code from the message, then sign the
        window.confirmationResult = result;
        setfinal(result);
        setshow(true);
        setIsResend(60);
        enqueueSnackbar("OTP sent succesfully", { variant: "success" });
      })
      .catch((error) => {
        // Error; SMS not sent
        setIsLoading(false);
        console.log(error);
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  const validateOTP = () => {
    const code = OTPRef.current.value;
    setIsLoading(true);
    final
      .confirm(code)
      .then((result) => {
        setIsLoading(false);
        // User signed in successfully.
        setOtpVerified(true);
        setshow(false);
        enqueueSnackbar("OTP verified succesfully", { variant: "success" });
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
        enqueueSnackbar("Incorrect OTP", { variant: "error" });
      });
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sendOTP",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // sendOTP();
        },
      },
      auth
    );
  }, []);

  useEffect(() => {
    if (isResend > 0) {
      setTimeout(() => setIsResend(isResend - 1), 1000);
    }
  });

  return (
    <Container
      style={{
        borderRight: !matches && "1px solid #DADEE6",
        width: !matches ? "96%" : "100%",
      }}
    >
      <LoadingBackdrop open={isLoading} />
      <form noValidate className={classes.form} onSubmit={onSubmitHandler}>
        <Typography
          variant="h6"
          color="#26334D"
          fontWeight="bold"
          align="left"
          mb={3}
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }}
        >
          Enter your details to book an appointment
        </Typography>

        <TextField
          id="outlined-basic"
          label="Full name"
          variant="outlined"
          fullWidth
          inputRef={firstnameRef}
          required
        />
        <div style={{ display: "flex" }}>
          <div id="recaptcha-container"></div>

          {/* <TextField
            id="outlined-basic"
            label="Mobile number"
            variant="outlined"
            fullWidth
            inputRef={mobileRef}
            helperText={
              otpVerified
                ? "OTP Verified"
                : "*An OTP will be sent for confirmation"
            }
            required={true}
            disabled={otpVerified}
          /> */}
          <PhoneInput
            country={"in"}
            inputRef={mobileRef}
            helperText={
              otpVerified
                ? "OTP Verified"
                : "*An OTP will be sent for confirmation"
            }
            required={true}
            disabled={otpVerified}
            countryCodeEditable={false}
            onChange={(phone) => setPhone(phone)}
          />
          {!otpVerified && (
            <PrimaryButton
              title={isResend ? `Resend in ${isResend}` : "Send OTP"}
              disabled={isResend ? true : false}
              style={{ height: "50px", marginLeft: "10px" }}
              onClick={sendOTP}
              id="sendOTP"
            />
          )}
        </div>
        <div className={classes.otpHelperText}>
          {otpVerified
            ? "OTP Verified"
            : "*an OTP will be sent for confirmation"}
        </div>
        {show && (
          <div style={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Enter OTP"
              variant="outlined"
              inputRef={OTPRef}
            />

            <PrimaryButton
              title="Submit OTP"
              style={{ height: "50px", marginLeft: "10px" }}
              onClick={validateOTP}
              id="submitOTP"
            />
          </div>
        )}
        <TextField
          id="outlined-basic"
          label="Booking notes"
          variant="outlined"
          minRows={4}
          maxRows={4}
          multiline
          fullWidth
          inputRef={notesRef}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "auto",
              // border: "1px solid rgba(38, 51, 77, 0.15)",
            },
          }}
          required={true}
        />
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <SecondaryButton
            // onClick={onSubmitHandler}
            style={{ marginTop: "10px", height: "50px" }}
            title={"Confirm your booking"}
            disabled={!otpVerified}
            type="submit"
          />
        </div>
      </form>
    </Container>
  );
};

export default ScheduleForm;
