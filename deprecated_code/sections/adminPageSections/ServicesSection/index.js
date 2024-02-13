import React from "react";
import { Box } from "@mui/material";
import WelcomeSection from "./WelcomeSection";
import ServicesContainer from "./ServicesContainer";

const DashboardSection = () => {
	return (
		<Box
			sx={{
				paddingBottom: "32px",
			}}
		>
			<WelcomeSection />
			<ServicesContainer />
		</Box>
	);
};

export default DashboardSection;
