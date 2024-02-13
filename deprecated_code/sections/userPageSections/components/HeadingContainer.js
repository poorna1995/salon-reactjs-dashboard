import React from "react";

const HeadingContainer = ({ title, ...props }) => {
	return (
		<div
			style={{
				background: "#3361FF0D",
				color: "#26334D",
				borderRadius: "5px",
				width: "95%",
				padding: "10px",
				textAlign: "left",
				fontWeight: "bold",
			}}
		>
			{title}
		</div>
	);
};

export default HeadingContainer;
