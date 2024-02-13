import { Box, Divider, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";

import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import WooCommerceIcon from "components/Common/Icons/StoresIcon/WooCommerceIcon";

import React from "react";
import AddedStoreCard from "./AddedStoreCard";

function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function AddedChannelStoresListSection({ channelName, data }) {
	console.log({ channelName, data });
	return (
		<div>
			<Box
				sx={{
					display: "flex",
					flex: 1,
					alignItems: "center",
					px: 2,
					mt: 2,
				}}
			>
				{
					channelName === "shopify" ? (
						<AppImage
							src="/assets/ShopifyImage.png"
							width={26}
							height={26}
							alt="shopify"
						/>
					) : (
						// <ShopifyIcon/>
						<AppImage
							src="/assets/WooComImage.png"
							width={45}
							height={26}
							alt="woo commerce"
						/>
					)
					// <WooCommerceIcon/>
				}

				<Typography
					sx={{
						fontWeight: 600,
						fontSize: "18px",
						lineHeight: "22px",
						marginLeft: "12px",
					}}
				>
					{capitaliseFirstLetter(channelName)}
				</Typography>
				<Divider sx={{ flex: 1, ml: 2 }} />
			</Box>
			<Grid container spacing={2} sx={{ mt: 1, px: 2 }}>
				{Array.isArray(data) &&
					data.map((item, index) => {
						return (
							<Grid item key={index}>
								<AddedStoreCard title={item.shop} data={item} />
							</Grid>
						);
					})}
			</Grid>
		</div>
	);
}
