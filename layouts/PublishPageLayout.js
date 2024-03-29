import { Box } from "@mui/material";
import AppHeader from "components/AppHeader";
import AppNavigationDrawer from "components/Common/Drawer/AppNavigationDrawer";
import MiniDrawer from "components/Common/Drawer/MiniDrawer";
import PublishPageDrawer from "components/Common/Drawer/PublishPageDrawer";
import drawerNavLinks from "constants/navigation/drawerNav";
import publishPageNavLinks from "constants/navigation/publishPageNavLinks";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function PublishPageLayout({
	pageTitle,
	children,
	drawerTitle,
	links,
}) {
	const { currentUser } = useSelector(mapState);
	const router = useRouter();
	useEffect(() => {
		if (!currentUser) {
			router.push("/login");
		}
	}, [currentUser]);

	return (
		<Box>
			<Head>
				<title>{pageTitle || "Ecommerce Dashboard App"}</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* <AppHeader /> */}

			<PublishPageDrawer links={links} pageTitle={drawerTitle}>
				{children}
			</PublishPageDrawer>
		</Box>
	);
}
