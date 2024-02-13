import React from "react";
// import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";

const Seo = ({ title, image, keywords, description, lang, meta, site }) => {
	const { company_logo } = useSelector((state) => state.companyInfo);
	const updateIcon = () => {
		const fav = document.getElementById("favicon");
		fav.href = company_logo;
	};

	const metaDescription = description;
	const defaultTitle = title;

	useEffect(() => {
		if (company_logo) {
			updateIcon();
		}
	}, [company_logo]);

	return (
		<Head>
			<title>{title}</title>
		</Head>
		// <Helmet
		//   htmlAttributes={{
		//     lang,
		//   }}
		//   title={title}
		//   // titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
		//   meta={[
		//     {
		//       name: `description`,
		//       content: metaDescription,
		//     },
		//     {
		//       name: `keywords`,
		//       content: keywords,
		//     },
		//     {
		//       property: `og:title`,
		//       content: title,
		//     },
		//     {
		//       property: `og:description`,
		//       content: metaDescription,
		//     },
		//     {
		//       property: `og:type`,
		//       content: `website`,
		//     },
		//     {
		//       property: `og:image`,
		//       content: image,
		//     },
		//     {
		//       name: `twitter:card`,
		//       content: `summary`,
		//     },
		//     {
		//       name: `twitter:image`,
		//       content: image,
		//     },
		//     {
		//       name: `twitter:creator`,
		//       content: site?.siteMetadata?.author || ``,
		//     },
		//     {
		//       name: `twitter:title`,
		//       content: title,
		//     },
		//     {
		//       name: `twitter:description`,
		//       content: metaDescription,
		//     },
		//   ].concat(meta)}
		// />
	);
};

Seo.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
};
Seo.propTypes = {
	description: PropTypes.string,
	image: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
};

export default Seo;
