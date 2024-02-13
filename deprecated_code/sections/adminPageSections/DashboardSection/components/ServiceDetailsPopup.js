import React, { useState } from "react";
import HivepathBaseDialog from "components/common/Dialog/HivepathBaseDialog";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import OutlinedButton from "components/common/Buttons/OutlinedButton";
import { Button, Typography, Divider, Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES } from "constants/API_URLS";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down("sm")]: {
			"& .MuiTypography-root": {
				fontSize: "12px",
			},
		},
	},
}));

const ServiceDetailsPopup = ({ open, handleClose, data, updateStatus }) => {
	const classes = useStyles();
	const theme = useTheme();
	const mobileView = theme.breakpoints.down("sm");
	const matches = useMediaQuery(mobileView);
	const { user_id, domain } = useSelector((state) => state.user.currentUser);

	const [status, setStatus] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleChange = (e) => {
		setStatus(e.target.value);
	};

	const handleCloseHandler = () => {
		handleClose();
		setStatus(null);
	};
	const enqueueSnackbar = useEnqueueSnackbar();
	const {
		customer_first_name,
		customer_last_name,
		customer_phone,
		booking_data,
		booking_note,
		booking_id,
		booking_status,
	} = data || {};

	const { service_record, service_price, service_date, service_time } =
		booking_data || {};

	const name = `${customer_first_name} ${customer_last_name}`;
	const services =
		service_record?.map((item) => item.service_name).join(",") || "";

	const updateStatusHandler = () => {
		if (!status) {
			enqueueSnackbar("Select an option first", { variant: "error" });
			return;
		}
		setIsLoading(true);
		const service_id = service_record[0].service_id;
		const requestData = {
			booking_id: booking_id,
			booking_status: status,
			admin_id: user_id,
			domain: domain,
		};
		authFetch(ADMIN_SERVICES.UPDATE_BOOKING, requestData)
			.then((res) => {
				setIsLoading(false);
				const { status, message } = res;
				if (status === "success") {
					enqueueSnackbar(message, { variant: "success" });
					handleClose();
					updateStatus(requestData);
				} else {
					enqueueSnackbar(message, { variant: "error" });
				}
			})
			.catch((res) => {
				setIsLoading(false);
				enqueueSnackbar(res.message, { variant: "error" });
			});
	};

	return (
		<HivepathBaseDialog
			open={open}
			handleClose={handleCloseHandler}
			// popupStyles={{ minWidth: "600px" }}
			popupStyles={{
				minWidth: matches ? "none" : "600px",
				margin: matches && "10px",
			}}
		>
			<LoadingBackdrop open={isLoading} />
			<div className={classes.root}>
				<Typography align="center" fontWeight="bold" mb={2}>
					Service details
				</Typography>
				<Divider style={{ marginBottom: "20px" }} />
				<div style={{ padding: "10px" }}>
					<div style={{ display: "flex", marginBottom: "10px" }}>
						<Typography sx={{ width: "33%" }}>Name </Typography>
						<Typography sx={{ width: "10%" }}>:</Typography>
						<Typography sx={{ width: "50%" }}> {name}</Typography>
					</div>
					<div style={{ display: "flex", marginBottom: "10px" }}>
						<Typography sx={{ width: "33%" }}>Mobile Number </Typography>
						<Typography sx={{ width: "10%" }}>:</Typography>
						<Typography sx={{ width: "50%" }}> {customer_phone}</Typography>
					</div>
					<div style={{ display: "flex", marginBottom: "10px" }}>
						<Typography sx={{ width: "33%" }}>Service </Typography>
						<Typography sx={{ width: "10%" }}>:</Typography>
						<Typography sx={{ width: "50%" }}>{services} </Typography>
					</div>
					<div style={{ display: "flex", marginBottom: "10px" }}>
						<Typography sx={{ width: "33%" }}>Service Price </Typography>
						<Typography sx={{ width: "10%" }}>:</Typography>
						<Typography sx={{ width: "50%" }}> ₹ {service_price} </Typography>
					</div>
					<div style={{ display: "flex", marginBottom: "10px" }}>
						<Typography sx={{ width: "33%" }}>Date of Booking </Typography>
						<Typography sx={{ width: "10%" }}>:</Typography>
						<Typography sx={{ width: "50%" }}> {service_date} </Typography>
					</div>
					<div style={{ display: "flex", marginBottom: "10px" }}>
						<Typography sx={{ width: "33%" }}>Time </Typography>
						<Typography sx={{ width: "10%" }}>:</Typography>
						<Typography sx={{ width: "50%" }}> {service_time}</Typography>
					</div>
					<div style={{ display: "flex", marginBottom: "10px" }}>
						<Typography sx={{ width: "33%" }}>Booking Notes </Typography>
						<Typography sx={{ width: "10%" }}>:</Typography>
						<Typography sx={{ width: "50%" }}>{booking_note}</Typography>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "10px",
						}}
					>
						{(!matches || booking_status !== "confirmed") && (
							<>
								<Typography sx={{ width: "33%" }}>Status </Typography>
								<Typography sx={{ width: "10%" }}>:</Typography>
							</>
						)}

						<Typography
							sx={{
								width: "50%",
								[theme.breakpoints.down("sm")]: {
									width: "100%",
									textAlign: "center",
								},
							}}
						>
							{booking_status !== "confirmed" && (
								<span style={{ textTransform: "capitalize" }}>
									{booking_status}
								</span>
							)}

							{booking_status === "confirmed" && (
								<FormControl>
									<RadioGroup
										row
										aria-labelledby="demo-row-radio-buttons-group-label"
										name="row-radio-buttons-group"
										sx={{ paddgin: "0" }}
									>
										<FormControlLabel
											value="completed"
											control={<Radio />}
											label="Completed"
											onClick={handleChange}
											sx={{
												background: "#3361FF1A",
												padding: "5px",
												paddingRight: "10px",
												borderRadius: "5px",
												height: "50px",
												"& .MuiTypography-root": {
													fontSize: "14px",
												},
												[theme.breakpoints.down("sm")]: {
													height: "40px",
												},
											}}
										/>
										<FormControlLabel
											value="cancelled"
											control={<Radio />}
											label="Cancelled"
											onClick={handleChange}
											sx={{
												background: "#FF00001A",
												padding: "5px",
												paddingRight: "10px",
												borderRadius: "5px",
												height: "50px",
												"& .MuiTypography-root": { fontSize: "14px" },
												[theme.breakpoints.down("sm")]: {
													height: "40px",
												},
											}}
										/>
									</RadioGroup>
								</FormControl>
							)}
						</Typography>
					</div>
				</div>

				<Box mt={2} textAlign="right">
					{booking_status !== "confirmed" && (
						<OutlinedButton onClick={handleCloseHandler} title="Close" />
					)}
					{booking_status === "confirmed" && (
						<>
							<Button
								onClick={handleCloseHandler}
								style={{ marginRight: "20px" }}
							>
								Cancel
							</Button>
							<SecondaryButton
								title="Update status"
								onClick={updateStatusHandler}
								disabled={!status}
							/>
						</>
					)}
				</Box>
			</div>
		</HivepathBaseDialog>
	);
};

export default ServiceDetailsPopup;
