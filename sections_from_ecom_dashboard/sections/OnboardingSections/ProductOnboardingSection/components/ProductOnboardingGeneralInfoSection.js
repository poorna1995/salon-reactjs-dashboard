import { Box } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import TextInput from "components/Common/Inputs/TextInput";
import TextEditor from "components/Common/TextEditor";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";

export default function ProductOnboardingGeneralInfoSection({
	title,
	setTitle,
	editorState,
	onEditorStateChange,
	containerStyles,
}) {
	return (
		<ProductOnboardingSectionContainer
			containerStyles={containerStyles}
			// sx={{
			// 	padding: "16px",
			// 	paddingBottom: "32px",
			// 	// maxWidth: "600px",
			// 	border: "1px solid rgba(0,0,0,0.1)",
			// 	boxShadow: "none",
			// }}
		>
			<SectionTitleText
				sx={
					{
						// paddingBottom: "16px",
						// borderBottom: "1px solid rgba(0,0,0,0.1)",
					}
				}
			>
				General
			</SectionTitleText>
			<TextInput
				title="Title"
				value={title}
				required
				onChange={(e) => setTitle(e.target.value)}
				containerStyles={{
					maxWidth: "100%",
					marginTop: "16px",
				}}
				// helperText="Enter product title"
				// maxLength={100}
				// error={title.length === 0}
			/>

			<TextEditor
				title={`Product long description`}
				onEditorStateChange={onEditorStateChange}
				//

				// placeholder={`Add product description`}
				editorState={editorState}
				defaultValue={editorState}
				// helperText="MaxLength : 1000"
				// handleBlurDescription={handleBlurDescription}
			/>
		</ProductOnboardingSectionContainer>
	);
}
