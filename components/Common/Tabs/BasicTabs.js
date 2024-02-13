import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		TabIndicatorProps={{
			children: <span className="MuiTabs-indicatorSpan" />,
		}}
		// centered
	/>
))({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	"& .MuiTabs-indicatorSpan": {
		// maxWidth: 40,
		width: "100%",
		// backgroundColor: "#635ee7",
	},
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: "none",
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		// margin: "12px",
		// color: "rgba(255, 255, 255, 0.7)",
		"&.Mui-selected": {
			color: theme.palette.primary.main,
			// backgroundColor:"#EEEFFB",
			borderBottom: `2px solid ${theme.palette.primary.main}`,
			// borderRadius: "5px",
		},
		"&.Mui-focusVisible": {
			backgroundColor: "rgba(100, 95, 228, 0.32)",
		},
	}),
);

export default function BasicTabs({ data, tabContainerStyles }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box
				sx={{
					...tabContainerStyles,
				}}
			>
				<Box
					sx={{
						//  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
						// backgroundColor:"white",
						borderBottom: "2px solid rgba(0,0,0,0.1)",
					}}
				>
					<StyledTabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						{data.map((item, index) => (
							<StyledTab
								key={index}
								label={item.label}
								sx={{
									textTransform: "initial",
									fontWeight: 600,
									fontSize: "16px",
									// lineHeight: "30px",
									fontStyle: "normal",
								}}
								{...a11yProps(index)}
							/>
						))}
					</StyledTabs>
				</Box>
			</Box>

			{data.map((item, index) => (
				<TabPanel key={index} value={value} index={index}>
					{item.component}
				</TabPanel>
			))}
		</Box>
	);
}
