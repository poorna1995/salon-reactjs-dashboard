import React from "react";
import CircularProgress, {
	circularProgressClasses,
} from "@mui/material/CircularProgress";
import { Box, Fab, Typography } from "@mui/material";
import CheckCircleIcon from "../Icons/CheckCircleIcon";

export default function CustomCircularProgress({ progress, ...props }) {
	const isCompleted = progress === 100;

	return (
		<>
			{isCompleted ? (
				<Box
					sx={{
						"& svg": {
							height: "40px",
							width: "40px",
						},
					}}
				>
					<CheckCircleIcon />
				</Box>
			) : (
				<Box sx={{ position: "relative", display: "inline-flex" }}>
					<CircularProgress
						variant="determinate"
						sx={{
							color: (theme) =>
								theme.palette.grey[
									theme.palette.mode === "light" ? 200 : 800
								],
						}}
						size={40}
						thickness={4}
						{...props}
						value={100}
					/>
					<Box
						sx={{
							top: 16,
							left: 10,
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							sx={{
								fontSize: "12px",
								fontWeight: 600,
								color: (theme) => theme.palette.primary.main,
							}}
						>
							{progress ? `${Math.round(progress)}` : "0"}
							{/* {`${Math.round(progress)}` }  */}
						</Typography>
					</Box>
					<CircularProgress
						variant={
							// progress ? "indeterminate" :
							"determinate"
						}
						value={progress ?? 0}
						disableShrink
						sx={{
							color: (theme) => theme.palette.primary.main,
							animationDuration: "550ms",
							position: "absolute",
							left: 0,
							[`& .${circularProgressClasses.circle}`]: {
								strokeLinecap: "round",
							},
						}}
						size={40}
						thickness={4}
						{...props}
					/>
				</Box>
			)}
		</>
	);
}
