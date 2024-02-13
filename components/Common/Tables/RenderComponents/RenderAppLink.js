import AppLink from "components/Common/AppLink";
import React from "react";

function RenderAppLink({ href, title }) {
	return (
		<AppLink sx={{ marginLeft: "16px" }} href={href}>
			{title}
		</AppLink>
	);
}

export default RenderAppLink;
