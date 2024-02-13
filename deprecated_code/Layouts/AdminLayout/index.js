import { Box, Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import Seo from "components/Seo";
import React from "react";
import MiniDrawer from "./MiniDrawer";

const AdminLayout = ({ children, title, paddingLeft }) => {
	return (
		<Box maxWidth="100%">
			<AppHeader position="fixed" isAdmin/>
			<Toolbar style={{ height: "80px" }} />

			<Seo title={title} />
			<MiniDrawer paddingLeft={paddingLeft}>{children}</MiniDrawer>
		</Box>
	);
};

export default AdminLayout;
