import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
	container: {
		width: "120px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		[theme.breakpoints.down("sm")]: {
			fontSize: "12px",
		},
	},
	button: {
		width: "30px",
		minWidth: "30px !important",
		height: "30px",
		fontSize: "14px",
		padding: "0",
		backgroundColor: "#3361FF1A !important",
		color: "#3361FF !important",
		textTransform: "none !important",
		fontWeight: "700 !important",

		[theme.breakpoints.down("sm")]: {
			height: "30px",
			// width: "130px",
			fontWeight: "500",
		},
	},
}));
const CartItemButton = ({ count, onAdd, onRemove, ...props }) => {
	const classes = useStyles();
	const { containerStyles } = props;
	return (
		<div className={classes.container} style={{ ...containerStyles }}>
			<Button
				disableRipple
				className={classes.button}
				{...props}
				onClick={onRemove}
			>
				-
			</Button>
			{count}
			<Button
				disableRipple
				className={classes.button}
				{...props}
				onClick={onAdd}
			>
				+
			</Button>
		</div>
	);
};

export default CartItemButton;
