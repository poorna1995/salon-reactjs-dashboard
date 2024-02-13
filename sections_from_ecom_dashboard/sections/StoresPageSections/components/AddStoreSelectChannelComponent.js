import { Box, Grid } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import AmazonIcon from "components/Common/Icons/StoresIcon/AmazonIcon";
import EbayIcon from "components/Common/Icons/StoresIcon/EbayIcon";
import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import WooCommerceIcon from "components/Common/Icons/StoresIcon/WooCommerceIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";

import { useRouter } from "next/router";
import React, { useState } from "react";
import SelectChannelItemCard from "./SelectChannelItemCard";

export default function AddStoreSelectChannelComponent() {
	const router = useRouter();
	const [selectedChannel, setSelectedChannel] = useState("");
	const handleClickProceed = () => {
		router.push(
			`/app/stores/add-store?step=add-new-store&id=1&channel=${selectedChannel}`,
		);
	};
	const handleSelectChannel = (channel) => {
		setSelectedChannel(channel);
	};
	const disableButton = !selectedChannel;
	console.log({ selectedChannel });
	return (
		<Box sx={{ pt: 4 }}>
			<SectionTitleText>Select Channel</SectionTitleText>
			<DescriptionText>
				Please select a channel where you want to add the store
			</DescriptionText>
			<Grid container spacing={4} sx={{ marginTop: "24px" }}>
				{stores.map((store, index) => {
					return (
						<Grid item xs={12} md={3} key={index} sm={3}>
							<SelectChannelItemCard
								title={store.title}
								icon={store.icon}
								isSelected={selectedChannel === store.key}
								onClick={() => handleSelectChannel(store.key)}
							/>
						</Grid>
					);
				})}
			</Grid>
			<Box
				sx={{ display: "flex", mt: 4, justifyContent: "space-around" }}
			>
				<PrimaryButton
					onClick={() => handleClickProceed()}
					sx={{ width: "200px" }}
					disabled={disableButton}
				>
					Proceed
				</PrimaryButton>
			</Box>
		</Box>
	);
}

const stores = [
	{
		title: "Shopify",
		key: "shopify",
		icon: <ShopifyIcon />,
	},
	{
		title: "Amazon",
		key: "amazon",
		icon: <AmazonIcon />,
	},
	{
		title: "WooCommerce",
		key: "woocommerce",
		icon: <WooCommerceIcon />,
	},
	{
		title: "Ebay",
		key: "ebay",
		icon: <EbayIcon />,
	},
];
