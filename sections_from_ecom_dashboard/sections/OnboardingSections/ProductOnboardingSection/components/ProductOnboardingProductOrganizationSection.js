import { Divider, Grid } from "@mui/material";
import { Box } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import CreatableInputField from "components/Common/Inputs/SelectInput/CreatableInputField";
import CreatableMultiSelect from "components/Common/Inputs/SelectInput/CreatableMultiSelect";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import MultipleSelect from "components/Common/Inputs/SelectInput/MultipleSelect";
import TextInput from "components/Common/Inputs/TextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useRef } from "react";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";

export default function ProductOnboardingProductOrganizationSection({
	productCategory,
	setProductCategory,
	productType,
	setProductType,
	tags,
	setTags,
	collection,
	setCollection,
	containerStyles,
}) {
	console.log({
		productCategory,
		productType,
	});
	const tagsWithLabel =
		Array.isArray(tags) &&
		tags?.map((item) => {
			return {
				label: item,
				value: item,
			};
		});
	const collectionsRef = useRef(null);
	const tagsRef = useRef(null);
	const typeRef = useRef(null);

	const scrollToRef = (ref) =>
		typeof window !== undefined &&
		window?.scrollTo(0, ref?.current?.offsetTop);

	let executeScroll = (ref) => scrollToRef(ref);

	console.log({ tags });
	return (
		<ProductOnboardingSectionContainer
			containerStyles={containerStyles}
			// sx={{
			// 	padding: "16px",
			// 	paddingBottom: "32px",
			// 	border: "1px solid rgba(0,0,0,0.1)",
			// 	boxShadow: "none",
			// }}
			// title={`Product Organization`}
		>
			<SectionTitleText>Product Organization</SectionTitleText>
			<Grid container spacing={2}>
				<Grid item md={6}>
					<FormSelectInput
						title={"Product Category"}
						containerStyles={{
							marginTop: "16px",
							paddingTop: "0px",
						}}
						value={productCategory}
						onChange={(e) => setProductCategory(e)}
						options={PRODUCT_CATEGORIES_WITH_LABEL}
					/>
				</Grid>
				<Grid item md={6}>
					<FormSelectInput
						title={"Product type"}
						containerStyles={{
							marginTop: "16px",
							paddingTop: "0px",
						}}
						value={productType}
						onChange={(e) => setProductType(e)}
						options={PRODUCT_TYPES_WITH_LABEL}
						inputRef={typeRef}
						onFocus={() => executeScroll(typeRef)}
					/>
				</Grid>
				<Grid item md={6}>
					<CreatableMultiSelect
						title={"Tags"}
						containerStyles={{
							paddingTop: "0px",
							marginTop: "16px",
							maxWidth: "100%",
						}}
						value={tags}
						onChange={(e) => setTags(e)}
						options={COLLECTIONS_WITH_LABEL}
						inputRef={tagsRef}
						onFocus={() => executeScroll(tagsRef)}
					/>
				</Grid>
				<Grid item md={6}>
					<MultipleSelect
						title={"Collection"}
						containerStyles={{
							paddingTop: "0px",
							marginTop: "16px",
							maxWidth: "100%",
						}}
						value={collection}
						onChange={(e) => setCollection(e)}
						options={COLLECTIONS_WITH_LABEL}
						inputRef={collectionsRef}
						onFocus={() => executeScroll(collectionsRef)}
					/>
				</Grid>
			</Grid>
		</ProductOnboardingSectionContainer>
	);
}
const PRODUCT_CATEGORIES = [
	"Electronics",
	"Appliances",
	"Furniture",
	"Fashion",
	"Sports",
	"Books",
	"Movies",
	"Music",
	"Games",
	"Toys",
	"Home",
	"Garden",
	"Tools",
	"Grocery",
	"Health",
	"Beauty",
	"Baby",
	"Kids",
	"Pets",
	"Automotive",
	"Industrial",
];

const PRODUCT_CATEGORIES_WITH_LABEL = PRODUCT_CATEGORIES.map((item) => {
	return {
		label: item,
		value: item,
	};
});

const PRODUCT_TYPES = ["Denim", "Dress", "Jeans"];

const PRODUCT_TYPES_WITH_LABEL = PRODUCT_TYPES.map((item) => {
	return {
		label: item,
		value: item,
	};
});

const COLLECTIONS = ["Denim", "Dress", "Jeans"];

const COLLECTIONS_WITH_LABEL = COLLECTIONS.map((item) => {
	return {
		label: item,
		value: item,
	};
});
