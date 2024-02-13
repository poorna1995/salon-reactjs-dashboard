/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import productImage from "public/assets/t-shirt.png";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { Box, Card, Tooltip } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import imagegrid from "public/assets/imagegrid.png";
import { fontWeight } from "@mui/system";
import Shopify from "public/assets/icons/shopify-icon.png";
import Unlisted from "public/assets/icons/unlisted.png";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
export default function ProductGridItemCard({ item }) {
	const router = useRouter();
	const {
		barcode,
		item_desc,
		live_date,

		product_desc,
		status,
	} = item;

	const itemID = item["master_item_id"];
	const productId = item["master_product_id"];
	const itemTitle = item["item_title"];
	const productTitle = item["product_title"];
	const channelName = item["Channel Name"];
	const liveDate = item["Live Date"];
	const unitRetailPrice = item["unit_retail_price"];
	const imageURL =
		item.display_image === "" ? imagegrid.src : item.display_image;
	// console.log({images1,imageURL,productId,display_image:item.display_image})
	function getStr1(str, length) {
		return str.length > 20 ? str.slice(0, 30) + ".." : str;
	}
	return (
		<BaseCard
			variant="outlined"
			sx={{
				cursor: "pointer",
				padding: "10px",
				//  height: "520px"
				minHeight: "500px",
			}}
			onClick={() =>
				router.push(`/app/products/${productId}?tab=overview`)
			}
		>
			{/* {imageURL && (
        <BaseCard
          sx={{
            width: "100%",
            maxHeight: "200",
            height: "180",
            overflow: "hidden",
            border: "none",
          }}
        >
          <AppImage
            sx={{ marginLeft: "-20px", px: "30px", py: "10px" }}
            width="250"
            height="280"
            sizes="(max-width: 768px) 100vw,
						(max-width: 1200px) 50vw,
						33vw"
            alt={productTitle + itemTitle}
            src={imageURL}
          />
        </BaseCard>
      )} */}
			<Box
				sx={{
					borderRadius: "10px",
					// border: "1px solid rgba(0,0,0,0.1)",
					position: "relative",
					//   "&:hover": {
					//     "& .image_delete_icon": {
					//       display: "block",
					//     },
					//   },
					textAlign: "center",
				}}
			>
				<img
					// sx={{
					// 	// marginLeft: "-20px",
					// 	px: "20px",
					// 	py: "1.5px",
					// }}
					// width="250"
					// height="280"
					style={{
						width: "100%",
						maxWidth: "100%",
						maxHeight: "320px",
						minHeight: "320px",
						overflow: "hidden",
						objectFit: "cover",
						borderRadius: "5px",
					}}
					src={imageURL}
					alt="product image"
					// objectFit="contain"
					// style={{
					// 	width: "100%",
					// 	maxWidth: "100%",
					// 	maxHeight: "200px",
					// 	objectFit: "cover",
					// }}
				/>
				<Box
					className="image_delete_icon"
					sx={{
						// display: "none",
						position: "absolute",
						top: "15px",
						right: "10px",
					}}
				>
					{status === "active" ? (
						<Chip
							sx={{
								fontSize: "12px",
								fontWeight: "600",
								color: "#12B76A",
								backgroundColor: "#F7F7F0",
								borderRadius: "30px",
								marginTop: "-20px",
								marginRight: "-8px",
								height: "23px",
								width: "68px",
							}}
							label={status}
						/>
					) : (
						<Chip
							sx={{
								fontSize: "12px",
								fontWeight: "600",
								color: "#F79009",
								backgroundColor: "#F7F7F0",
								borderRadius: "30px",
								marginTop: "-20px",
								marginRight: "-8px",
								height: "23px",
								width: "70px",
							}}
							label={status}
						/>
					)}
				</Box>
			</Box>
			<Stack>
				<DescriptionText
					sx={{
						// color: "#313D4E",
						fontWeight: "800",
						paddingTop: "7px",
						marginLeft: "10px",
						fontSize: "16px",
					}}
				>
					<>
						<Tooltip title={productTitle || itemTitle}>
							<span>{getStr1(productTitle || itemTitle)}</span>
						</Tooltip>
					</>
				</DescriptionText>
				{/* <DescriptionText
					sx={{
						display: "flex",
						flexDirection: "row",

						color: "#313D4E",
						fontWeight: "700",
						paddingTop: "10px",

						marginLeft: "10px",
						fontSize: "14px",
					}}
				>
					Item ID:{" "}
					<DescriptionText
						sx={{
							color: "#313D4E",
							fontWeight: "500",
							// paddingTop: "1px",
							marginLeft: "10px",
							fontSize: "14px",
						}}
					>
						{itemID}
					</DescriptionText>
				</DescriptionText> */}
				<Box sx={{ display: "flex", alignItems: "center", pt: "16px" }}>
					<DescriptionText
						sx={{
							display: "flex",
							flexDirection: "row",

							color: "#313D4E",
							fontWeight: "700",
							// paddingTop: "7px",
							marginLeft: "10px",
							fontSize: "14px",
						}}
					>
						Product Id:
					</DescriptionText>
					<Typography
						sx={{
							color: "#313D4E",
							fontWeight: "500",
							// paddingTop: "1px",
							marginLeft: "10px",
							fontSize: "14px",
						}}
					>
						{productId}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", pt: "14px" }}>
					<DescriptionText
						sx={{
							display: "flex",
							flexDirection: "row",

							color: "#313D4E",
							fontWeight: "700",
							// paddingTop: "7px",
							marginLeft: "10px",
							fontSize: "14px",
						}}
					>
						Unit Price:
					</DescriptionText>
					<Typography
						sx={{
							color: "#313D4E",
							fontWeight: "500",
							// paddingTop: "1px",
							marginLeft: "10px",
							fontSize: "14px",
						}}
					>
						$ {unitRetailPrice}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", pt: "2px" }}>
					<DescriptionText
						sx={{
							display: "flex",
							flexDirection: "row",
							mr: "8px",
							color: "#313D4E",
							fontWeight: "700",
							// paddingTop: "7px",
							marginLeft: "10px",
							fontSize: "14px",
						}}
					>
						Channel Name:
					</DescriptionText>
					<RenderChannelAsIcon value={channelName} />
				</Box>
			</Stack>
		</BaseCard>
	);
}
