import TextInput from "components/Common/Inputs/TextInput";
import React from "react";

export default function RenderTextInput({ params, ...props }) {
	return (
		<TextInput
			value={params.value}
			containerStyles={{
				width: "100%",
				marginTop: "0px",
			}}
			inputStyles={{
				paddingTop: "8px",
				paddingBottom: "8px",
			}}
			{...props}
		/>
	);
}
