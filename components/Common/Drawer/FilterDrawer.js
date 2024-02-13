import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import OutlinedButton from "../Buttons/OutlinedButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import SectionTitleText from "../Typography/HeadingText/SectionTitleText";

export default function SelectLabels() {
	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<Box sx={{ px: 2 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					my: "16px",
					px: "16px",
					borderBottom: (theme) =>
						`1px solid ${theme.palette.divider}`,
					pb: "8px",
				}}
			>
				<SectionTitleText>Set Filters</SectionTitleText>
				<OutlinedButton
					sx={{
						border: "none",
						color: (theme) => theme.palette.primary.main,
						"&:hover": {
							// background: (theme) => theme.palette.grey[300],
							background: (theme) => theme.palette.blue[50],
						},
					}}
				>
					Clear Filters
				</OutlinedButton>
				{/* <IconButton onClick={() => handleShowFilters()}>
					<MdClose />
				</IconButton> */}
			</Box>
			<Box sx={{ px: 2 }}>
				<Stack>
					<Typography
						sx={{
							marginBottom: "10px",
							fontWeight: 600,
							fontSize: "16px",
							lineHeight: "19px",
						}}
					>
						Status
					</Typography>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Active"
					/>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Archived"
					/>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Inactive"
					/>
				</Stack>
				<Stack>
					<Typography
						sx={{
							marginTop: "20px",
							marginBottom: "10px",
							fontWeight: 600,
							fontSize: "16px",
							lineHeight: "19px",
						}}
					>
						Channel
					</Typography>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Shopify"
					/>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Etsy"
					/>
					{/* <FormControlLabel
					sx={{ marginTop: "-8px" }}
					control={<Checkbox size="small" />}
					label="Inactive"
				/> */}
				</Stack>
				<Stack>
					<Typography
						sx={{
							marginTop: "20px",
							marginBottom: "10px",
							fontWeight: 600,
							fontSize: "16px",
							lineHeight: "19px",
						}}
					>
						Category
					</Typography>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Jeans"
					/>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Dress"
					/>
					<FormControlLabel
						sx={{ marginTop: "-8px" }}
						control={<Checkbox size="small" />}
						label="Shirts"
					/>
				</Stack>
			</Box>
			{/* <Stack spacing={1}>
				<FormSelectInput
					title={"Channel Name"}
					sx={{ marginTop: "-8px" }}
					size="small"
				/>
				<FormSelectInput
					title="Category"
					sx={{ marginTop: "-8px" }}
					size="small"
				/>
			</Stack> */}
			{/* <Stack spacing={1}>
				<Typography sx={{ marginTop: "20px", marginBottom: "10px" }}>
					Created at
					<DateInput label="Start Date" />
					<DateInput label="End Date" />
				</Typography>

				<Typography sx={{ marginTop: "10px" }}>
					Updated at
					<DateInput label="Start Date" />
					<DateInput label="End Date" />
				</Typography>
			</Stack> */}
			<Box
				sx={{
					borderTop: (theme) =>
						`1px solid ${theme.palette.grey[300]}`,
					display: "flex",
					mt: "16px",
					position: "fixed",
					bottom: "0",
					width: "372px",
					pt: "16px",
					pb: "24px",
				}}
			>
				<OutlinedButton fullWidth sx={{ height: "44px" }}>
					Cancel
				</OutlinedButton>
				<PrimaryButton fullWidth sx={{ ml: 1, height: "44px" }}>
					Apply Filters
				</PrimaryButton>
			</Box>
		</Box>

		// <Box>
		// 	<Stack
		// 	spacing={1.5}
		// 	>
		// 		<Typography>Created at</Typography>
		// 	{/* <Typography sx={{marginBottom: "-30px"}}>Catalog</Typography> */}
		// 		<MuiSelectInput size="small"
		// 			sx={{
		// 				// paddingTop: "24px",
		// 				// marginBottom: "-20px",

		// 			}}
		// 			label="Catalog"

		// 		/>
		// 		<Typography  >Created at</Typography>
		// 		{/* <Typography sx={{marginBottom: "-10px"}}>Brand</Typography> */}
		// 		<MuiSelectInput size="small" label="Brand" />
		// 		</Stack>
		// 		<Stack>
		// 			<Typography>Status</Typography>
		// 			<FormControlLabel  control={<Checkbox size="small"/>} label="Active" />
		// 			<FormControlLabel  control={<Checkbox size="small" />} label="Archived" />
		// 			<FormControlLabel  control={<Checkbox size="small"/>} label="Inactive" />
		// 		</Stack>
		// 		<Stack>
		// 		<Typography>Created at</Typography>
		// 		<DateInput label="Start Date" />
		// 		<DateInput  />
		// 		<Typography>Updated at</Typography>
		// 		<DateInput  />
		// 		<DateInput />
		// 	</Stack>
		// </Box>
	);
}
