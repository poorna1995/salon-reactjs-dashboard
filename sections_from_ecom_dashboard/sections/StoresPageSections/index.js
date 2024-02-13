import { Box } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import AddCircleIcon from "components/Common/Icons/AddCircleIcon";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, THIRD_PARTY } from "constants/API_URL";
import { groupBy } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import AddedChannelStoresListSection from "./components/AddedChannelStoresListSection";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

export default function StoresPageSections() {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	const [appsData, setAppsData] = useState([]);
	const [appLineData, setAppLineData] = useState([]);
	const [connectedApps, setConnectedApps] = useState();

	const { enqueueSnackbar } = useSnackbar();

	const handleFetchThirdPartyApps = () => {
		const url = THIRD_PARTY.FETCH_APPS;
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				setAppsData(json.result);
			});
	};
	const handleFetchThirdPartyAppLine = () => {
		const url = THIRD_PARTY.FETCH_APPLINE;
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				setAppLineData(json.result);
			});
	};

	useEffect(() => {
		handleFetchThirdPartyApps();
		handleFetchThirdPartyAppLine();
		handleFetchConnectedApps();
	}, []);

	const handleFetchConnectedApps = () => {
		const url = CHANNEL.FETCH_CONNECTED_APPS;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(url, data).then((json) => {
			if (json.status === "success") {
				console.log(json);
				setConnectedApps(json.result);
			}
		});
	};

	const groupByChannelName = groupBy(connectedApps, "channel_name");
	console.log({ groupByChannelName });
	return (
		<div>
			<Box
				sx={{
					px: 2,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mt: 1,
				}}
			>
				<SectionTitleText>Stores</SectionTitleText>
				<PrimaryButton
					startIcon={<AddCircleIcon />}
					onClick={() =>
						router.push(
							"/app/stores/add-store?step=select-channel&id=0",
						)
					}
				>
					Add New Store
				</PrimaryButton>
			</Box>
			<Box>
				{Object.keys(groupByChannelName).map((channelName) => (
					<>
						<AddedChannelStoresListSection
							channelName={channelName}
							data={groupByChannelName[channelName]}
						/>
						{/* <Box>{channelName}</Box>
						<Box>
							{groupByChannelName[channelName].map(
								(app, index) => (
									<Box key={index}>{app.shop}</Box>
								),
							)}
						</Box> */}
					</>
				))}
			</Box>
		</div>
	);
}



