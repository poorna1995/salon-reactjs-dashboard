import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import DSWelcomeSection from "./DSWelcomeSection";
import CustomerTable from "./CustomerTable";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES } from "constants/API_URLS";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import { useTheme } from "@mui/styles";
import CustomerTableMobile from "./CustomerTableMobile";
import { useSelector } from "react-redux";

const DashboardSection = () => {
	const theme = useTheme();
	const mobileView = theme.breakpoints.down("sm");
	const matches = useMediaQuery(mobileView);

	const [isLoading, setIsLoading] = useState(false);
	const { user_id, domain } = useSelector((state) => state.user.currentUser);
	const [data, setData] = useState([]);
	const [appointmentData, setAppointmentData] = useState({});
	const enqueueSnackbar = useEnquequeSnackbar();
	const updateStatus = (requestdata) => {
		const { booking_id, booking_status } = requestdata;
		const modifiedData = data.map((item) => {
			if (item.booking_id === booking_id) {
				return { ...item, booking_status: booking_status };
			}
			return item;
		});
		setData(modifiedData);
		setAppointmentData((state) => {
			return { ...state, upcoming_appointment: state.upcoming_appointment - 1 };
		});
	};

	const welcomeData = [
		{
			count: appointmentData.total_appointment || 0,
			title: "Total Appoinments",
			styles: { background: "#29CC3938" },
		},
		{
			count: appointmentData.upcoming_appointment || 0,
			title: "Upcoming Appoinments",
		},
	];

	const fetchDashboard = () => {
		setIsLoading(true);
		const requestData = { company_id: [], admin_id: user_id, domain: domain };
		authFetch(ADMIN_SERVICES.FETCH_DASHBOARD, requestData)
			.then((res) => {
				setIsLoading(false);
				const {
					status,
					total_appointment,
					upcoming_appointment,
					message,
					result,
				} = res;
				if (status === "success") {
					setData(result);
					setAppointmentData({ total_appointment, upcoming_appointment });
				} else {
					enqueueSnackbar(message, { variant: "error" });
				}
			})
			.catch((res) => {
				setIsLoading(false);
				enqueueSnackbar(res.message, { variant: "error" });
			});
	};

	useEffect(() => {
		fetchDashboard();
	}, []);

	return (
		<Box
			sx={{
				paddingBottom: "32px",
			}}
		>
			<LoadingBackdrop open={isLoading} />
			<DSWelcomeSection data={welcomeData} />
			<Typography
				sx={{
					fontSize: "20px",
					fontWeight: "bold",
					[theme.breakpoints.down("sm")]: {
						fontSize: "12px",
					},
				}}
			>
				Customer details
			</Typography>
			{matches && (
				<CustomerTableMobile data={data} updateStatus={updateStatus} />
			)}
			{!matches && <CustomerTable data={data} updateStatus={updateStatus} />}
		</Box>
	);
};

export default DashboardSection;
