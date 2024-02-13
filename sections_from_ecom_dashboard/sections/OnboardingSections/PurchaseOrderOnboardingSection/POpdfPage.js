import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import imageList1 from "public/assets/imageList1.png";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import TextInput from "components/Common/Inputs/TextInput";
import BasicTabs from "components/Common/Tabs/BasicTabs";

const columnData = [
	{
		field: "product",
		headerName: "Product",
		renderCell: (params) => (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
				}}
			>
				<AppImage
					sx={{ objectFit: "cover", borderRadius: "5px" }}
					width="45"
					height="45"
					src={params.row.display_image || imageList1}
				/>
				<Typography
					sx={{
						// maxWidth:"250px",
						marginLeft: "16px",
						fontWeight: "500",
						fontSize: "14px",
						lineHeight: "20px",
						// color: (theme) => theme.palette.primary.main,
					}}
				>
					Nike Mens Air Max Sc Running Shoe-Black/9
				</Typography>
			</Box>
		),
		flex: 1,
		width: 220,
	},
	{
		field: "sku",
		headerName: "SKU",
		renderCell: (params) => <Typography>A0B1C008</Typography>,

		width: 110,
	},
	{
		field: "unit cost",
		headerName: "Unit Cost",
		renderCell: (params) => <Typography>422</Typography>,
		width: 110,
		headerAlign: "center",
		align: "center",
	},
	{
		field: "order qty",
		headerName: "Order Qty",
		renderCell: (params) => <Typography>100</Typography>,
		width: 110,
		headerAlign: "center",
		align: "center",
	},
	{
		field: "total",
		headerName: "Total",
		renderCell: (params) => <Typography>$ 50,000</Typography>,
		width: 120,
		headerAlign: "center",
		align: "center",
	},
];

const rowsData = [
	{
		id: 1,
	},
	{
		id: 2,
	},
	{
		id: 3,
	},
];

function POpdfPage() {
	return (
		<>
			<Box sx={{ p: "16px" }}>
				<Container
					maxWidth="md"
					sx={{ border: "1px solid #E4E7EC", borderRadius: "10px" }}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Box>
							<SectionTitleText
								sx={{
									color: (theme) =>
										theme.palette.primary.main,
									mt: "28px",
								}}
							>
								Arihan Clothing
							</SectionTitleText>
							<DescriptionText
								sx={{
									color: (theme) =>
										theme.palette.primary.main,
									fontWeight: "700",
									mt: "28px",
								}}
							>
								Shipping Address
							</DescriptionText>
							<Typography sx={{ mt: "6px" }}>
								52 Bedok Reservoir Cres Singapore 479226
							</Typography>
						</Box>
						<Box>
							<SectionTitleText
								sx={{
									mt: "28px",
								}}
							>
								Purchase Order
							</SectionTitleText>
							<Box sx={{ display: "flex", mt: "28px" }}>
								<Typography sx={{ fontWeight: "600" }}>
									Issue Date :
								</Typography>
								<Typography>12/12/2021</Typography>
							</Box>
							<Box sx={{ display: "flex", mt: "6px" }}>
								<Typography sx={{ fontWeight: "600" }}>
									Expected By :
								</Typography>
								<Typography>12/12/2021</Typography>
							</Box>
						</Box>
					</Box>
					<Divider sx={{ mt: "18px" }} />
					<Box>
						<DescriptionText
							sx={{
								color: (theme) => theme.palette.primary.main,
								fontWeight: "700",
								mt: "18px",
							}}
						>
							Shipping Address
						</DescriptionText>
						<Typography sx={{ mt: "6px" }}>
							52 Bedok Reservoir Cres Singapore 479226
						</Typography>
					</Box>
					<Box sx={{ mt: "24px" }}>
						<MuiBaseDataGrid
							columns={columnData}
							rows={rowsData}
							hideFooter={true}
							containerStyles={{
								height: "280px",
							}}
						/>
					</Box>
					<Box sx={{ mt: "24px" }}>
						<SectionTitleText>Customer Notes</SectionTitleText>
						<Typography sx={{ mt: "16px" }}>
							Lorem ipsum dolor sit amet consectetur. Amet neque
							consectetur fermentum sed est amet vitae tellus
							nibh. Turpis at penatibus a sapien vitae
							sollicitudin faucibus pharetra quis. Facilisis quam
							feugiat
						</Typography>
					</Box>
					<Divider sx={{ mt: "24px" }} />
					<Box
						sx={{ ml: "65%", width: "30%", mt: "24px", mb: "24px" }}
					>
						<Box sx={{ display: "flex", mt: "30px", mb: "10px" }}>
							{/* <Grid item xs={2}> */}
							<Typography sx={{ marginRight: "45px" }}>
								SubTotal
							</Typography>
							<Typography>$ 110.00</Typography>
						</Box>
						<Box sx={{ display: "flex", mb: "10px" }}>
							<Typography sx={{ marginRight: "45px" }}>
								Total Qty
							</Typography>
							<Typography>300</Typography>
						</Box>
						<Box sx={{ display: "flex", mb: "10px" }}>
							<Typography>Tax %</Typography>
							<TextInput
								sx={{
									"& .MuiOutlinedInput-input": {
										padding: "10px 12px",
									},

									"& .MuiOutlinedInput-notchedOutline": {
										border: "1px solid #E5E5E5",
									},
								}}
								containerStyles={{
									marginTop: "0px",
									width: "100px",
									marginLeft: "70px",
								}}
							/>
						</Box>
						<Divider sx={{ marginRight: "20px" }} />
						<Box sx={{ display: "flex", mt: "30px" }}>
							<SectionTitleText
								sx={{ marginRight: "45px", mt: "-18px" }}
							>
								Total
							</SectionTitleText>
							<SectionTitleText sx={{ mt: "-18px" }}>
								$ 110.00
							</SectionTitleText>
						</Box>
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default POpdfPage;
