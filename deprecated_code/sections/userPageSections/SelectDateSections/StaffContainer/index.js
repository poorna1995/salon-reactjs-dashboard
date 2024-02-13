import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useDispatch } from "react-redux";
import StaffRadioButton from "./StaffRadioButton";
import { updateCart } from "store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "components/common/Buttons/PrimaryButton";

const StaffContainer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectStaff = (staff) => {
		dispatch(updateCart({ staff: staff }));
	};

	const navigateConfirmBooking = () => {
		navigate("/confirm-booking");
	};

	return (
		<div>
			{/* <RadioGroup
				aria-labelledby="demo-radio-buttons-group-label"
				defaultValue="No preference"
				name="radio-buttons-group"
				sx={{ display: "flex", flexDirection: "inherit" }}
			>
				<StaffRadioButton label="No preference" onclick={selectStaff} />
				<StaffRadioButton label="Jenny" onclick={selectStaff} />
				<StaffRadioButton label="Ronny" onclick={selectStaff} />
				<StaffRadioButton label="Wilson" onclick={selectStaff} />
			</RadioGroup> */}

			<div style={{ textAlign: "center" }}>
				<PrimaryButton
					style={{ width: "60%", height: "40px", marginTop: "20px" }}
					onClick={navigateConfirmBooking}
					title="Continue"
				/>
			</div>
		</div>
	);
};

export default StaffContainer;
