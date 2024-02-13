import React from "react";
import { Grid, Typography } from "@mui/material";
import CalendarView from "./components/CalendarView";
import SelectCheckbox from "./components/SelectCheckbox";
import { useTheme } from "@mui/styles";

const CalendarSection = () => {
	const theme = useTheme();
	return (
		<div>
			<Typography fontSize="26px" fontWeight="bold">
				Calendar
			</Typography>
			<Grid container>
				<Grid item md={9} xs={12}>
					<CalendarView />
				</Grid>

				<Grid
					item
					md={3}
					sx={{ [theme.breakpoints.down("sm")]: { display: "none" } }}
				>
					<SelectCheckbox />
				</Grid>
			</Grid>
		</div>
	);
};

export default CalendarSection;
