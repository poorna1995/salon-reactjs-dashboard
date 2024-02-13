import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import { useRouter } from "next/router";

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
		// borderBottom: "2px solid rgba(0,0,0,0.1)",
		// marginBottom: "0px",
		// color: "rgba(255, 255, 255, 0.7)",
		"&.Mui-selected": {
			color: "#5860D7",
			backgroundColor: "#EEEFFB",
			borderRadius: "5px",
		},
		"&.Mui-focusVisible": {
			backgroundColor: "rgba(100, 95, 228, 0.32)",
		},
	}),
);

export default function RouterTabs({ data, tabContainerStyles, basePath }) {
	const router = useRouter();
	const [value, setValue] = React.useState(``);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	console.log({ router });
	const currentPath = router.query.tab;

	const handleItemClick = (route) => {
		router.push(`${basePath}?tab=${route}`);
	};
	const isActive = (route) => currentPath && currentPath === route;
	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ ...tabContainerStyles }}>
				<Box
					sx={{
						//  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
						backgroundColor: "white",
						borderBottom: "2px solid rgba(0,0,0,0.1)",
						// paddingBottom: "-20px",
					}}
				>
					<StyledTabs
						aria-label="basic tabs example"
						// value={value}
						// onChange={handleChange}
					>
						{data.map((item, index) => (
							<StyledTab
								key={index}
								label={item.label}
								onClick={() => handleItemClick(item.route)}
								sx={
									isActive(item.route)
										? {
												color: (theme) =>
													theme.palette.primary.main,
												textTransform: "initial",
												fontWeight: 600,
												fontSize: "16px",
												borderBottom: (theme) =>
													`2px solid ${theme.palette.primary.main}`,
												// padding: "12px",
												// margin: "12px",
										  }
										: {
												textTransform: "initial",
												fontWeight: 600,
												fontSize: "16px",
												// padding: "12px",
										  }
								}
								{...a11yProps(index)}
							/>
						))}
					</StyledTabs>
				</Box>
			</Box>

			{data.map((item, index) => {
				if (item.route === currentPath)
					return <Box sx={{ p: 2 }}>{item.component}</Box>;
			})}
		</Box>
	);
}
