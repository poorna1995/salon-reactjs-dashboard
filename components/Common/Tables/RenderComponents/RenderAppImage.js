import AppImage from "components/Common/AppImage";
import React from "react";

function RenderAppImage({ display_image, ...props }) {
	return (
		<AppImage
			// sx prop to fit app image to a definite size
			sx={{ objectFit: "cover", borderRadius: "5px" }}
			width="45"
			height="45"
			src={display_image}
			{...props}
		/>
	);
}

export default RenderAppImage;
