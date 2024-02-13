import { Tooltip } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React from "react";
import Shopify from "public/assets/icons/shopifyListIcon.png";
import Unlisted from "public/assets/icons/unlisted.png";
import Woocommerce from "public/assets/icons/woocommerceListIcon.png";
function RenderChannelAsIcon({ value }) {
	let iconImage;
	switch (value) {
		case "shopify":
			iconImage = Shopify;
			break;
		case "native":
			iconImage = Unlisted;
			break;

		case "woocommerce":
			iconImage = Woocommerce;
			break;

		default:
			iconImage = Unlisted;
			break;
	}
	return (
		<div>
			<div>
				{value === "native" ? (
					<Tooltip title="unlisted">
						<span>
							<AppImage src={iconImage} width="40" height="40" />
						</span>
					</Tooltip>
				) : (
					<Tooltip title={value}>
						<span>
							<AppImage src={iconImage} width="40" height="40" />
						</span>
					</Tooltip>
				)}
			</div>
		</div>
	);
}

export default RenderChannelAsIcon;
