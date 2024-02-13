// This function is used for fetching data from authentication apis/ app apis
async function authFetch(url = "", data = {}, type = "POST") {
	// try {
	// const domain = "hsaloon"; //window.location.hostname.split(".")[0];
	const requestData = {
		...data,
		// domain: domain,
	};
	const response = await fetch(url, {
		method: type,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestData),
	});
	//
	if (!response.ok) {
		throw Error("Problem in loading data!");
	}
	return response.json();
	// } catch (err) {
	//   console.error(err);
	//   const response = {
	//     result: "Connection Time Out!",
	//   };
	//   return response;
	// }
}

export default authFetch;
