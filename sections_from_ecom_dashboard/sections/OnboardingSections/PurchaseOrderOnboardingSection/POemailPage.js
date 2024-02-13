/* eslint-disable react/jsx-key */
import {
	Box,
	Container,
	Divider,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PDFicon from "components/Common/Icons/PDFicon";
import DownloadIcon from "components/Common/Icons/POicons/DownloadIcon";
import CreatableMultiSelect from "components/Common/Inputs/SelectInput/CreatableMultiSelect";
import TextInput from "components/Common/Inputs/TextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";

const selection = [
	{
		title: "From",
	},

	{
		title: "Send to",
	},
	{
		title: "CC",
	},
];

const minWidth = "calc(100% - 840px)";
function POemailPage() {
	const router = useRouter();
	return (
		<>
			<Container maxWidth="md">
				<Box sx={{}}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mt: "18px",
							position: "fixed",
							backgroundColor: "white",
							zIndex: "100",
							top: "64.5px",
							width: minWidth,
							borderBottom: "1px solid #F2F4F7",
						}}
					>
						<SectionTitleText>
							Email to ASD Clothing
						</SectionTitleText>
						<PrimaryButton
							onClick={() => router.push("/app/purchase-orders?tab=all")}
						>
							Save and Send
						</PrimaryButton>
					</Box>
					{/* <Divider sx={{ mt: "6px" }} /> */}
				</Box>
				<Box sx={{ mt: "45px" }}>
					{selection.map((select) => (
						<CreatableMultiSelect
							styles={{
								control: (style) => ({
									...style,
									// borderRadius: "10px",
									paddingTop: "5px",
									paddingBottom: "5px",
								}),

								multiValueRemove: (styles) => ({
									...styles,
									":hover": {
										backgroundColor: "#F2F4F7",
										// color: "white",
									},
								}),

								multiValue: (styles) => ({
									...styles,
									backgroundColor: "#F2F4F7",
									color: "black",
									borderRadius: "10px",
								}),
							}}
							title={select.title}
						/>
					))}
				</Box>
				{/* <CreatableMultiSelect
					styles={{
						control: (style) => ({
							...style,
							// borderRadius: "10px",
							paddingTop: "5px",
							paddingBottom: "5px",
							// border: "1px solid #F2F4F7",
						}),

						multiValueRemove: (styles) => ({
							...styles,
							":hover": {
								backgroundColor: "#F2F4F7",
								// color: "white",
							},
						}),

						multiValue: (styles) => ({
							...styles,
							backgroundColor: "#F2F4F7",
							color: "black",
							borderRadius: "10px",
						}),
					}}
					title="Send To"
				/>

				<CreatableMultiSelect
					styles={{
						control: (style) => ({
							...style,
							// borderRadius: "10px",
							paddingTop: "5px",
							paddingBottom: "5px",
						}),

						multiValueRemove: (styles) => ({
							...styles,
							":hover": {
								backgroundColor: "#F2F4F7",
								// color: "white",
							},
						}),

						multiValue: (styles) => ({
							...styles,
							backgroundColor: "#F2F4F7",
							color: "black",
							borderRadius: "10px",
						}),
					}}
					title="CC"
				/> */}

				<TextInput title="Subject" />
				<TextInput multiline minRows={4} />

				<Box
					sx={{
						mt: "8px",
						backgroundColor: "#EFF8FF",
						borderRadius: "10px",
						py: "8px",
						px: "16px",
					}}
				>
					<Grid
						container
						sx={{ display: "flex", alignItems: "center" }}
					>
						<Grid item xs={7}>
							<Typography sx={{ fontWeight: "600" }}>
								Attached Files
							</Typography>
						</Grid>
						<Grid
							item
							sx={{ display: "flex", alignItems: "center" }}
							xs={3}
						>
							<IconButton>
								<PDFicon />
							</IconButton>
							<Typography sx={{ fontWeight: "600" }}>
								PO-00002.pdf
							</Typography>
						</Grid>
						<Grid
							item
							sx={{ display: "flex", alignItems: "center" }}
							xs={2}
						>
							<Typography
								sx={{
									fontSize: "16px",
									color: (theme) =>
										theme.palette.primary.main,
									mr: "30px",
								}}
							>
								View
							</Typography>
							<IconButton>
								<DownloadIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}

export default POemailPage;
