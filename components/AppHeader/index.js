import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Notification from "components/Common/Icons/notification";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";
import AppLink from "components/Common/AppLink";
// import linksData from "constant_data/navigation/linksData";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "redux/user/userSlice";
import { MERCHANT, PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useSnackbar } from "notistack";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AppImage from "components/Common/AppImage";
import logo from "public/assets/ecom.png";
import { fetchPublishableProductsStatusStart } from "redux/products/productsSlice";

const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	productsData,
});
const AppHeader = ({ appHeaderBg, showLogo, ...props }) => {
	// console.log({ popupState, isOpen: popupState.isOpen });
	const router = useRouter();
	const { currentUser, productsData } = useSelector(mapState);
	const taskID = productsData.publishTaskID;
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const pathname = router.asPath;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const links = [
		// {
		// 	title: "Home",
		// 	url: "/",
		// },
		// {
		// 	title: "Products",
		// 	url: "/app/products",
		// },
		// {
		// 	title: "Profile",
		// 	url: "/onboarding/merchant",
		// },
		// {
		// 	title: "Vendors",
		// 	url: "/onboarding/vendor",
		// },
		// {
		// 	title: "Calendar",
		// 	url: "/calendar",
		// },
	];
	function handleLogin() {
		router.push("/auth/login");
	}
	function handleLogout() {
		const url = MERCHANT.LOGOUT;
		const data = {
			merchant_id: currentUser.merchant_id,
		};
		appFetch(url, data)
			.then((json) => {
				dispatch(signOutUser());
				enqueueSnackbar(json.message);
			})
			.catch((err) => console.error(err));
	}
	useEffect(() => {
		if (!currentUser) router.push("/auth/login");
	}, [currentUser, router]);

	// const handleFetchProductPublishStatus = () => {
	// 	const URL = PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS;
	// 	const data = {
	// 		task_id: taskID,
	// 	};
	// 	dispatch(fetchPublishableProductsStatusStart({ URL, data }));
	// };
	// useEffect(() => {
	// 	if (taskID) {
	// 		handleFetchProductPublishStatus();
	// 	}
	// }, [taskID]);
	return (
		<>
			<AppBar
				elevation={0}
				color="default"
				sx={{
					// bgcolor: appHeaderBg || "rgba(21, 50, 48, 1)",
					// "transparent",
					// color: "white",
					borderBottom: "1px solid #DADEE6",
					background: "white",
				}}
			>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							flex: 1,
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						{showLogo && (
							<AppImage
								src={logo}
								sx={{
									width: "94px",
									height: "40px",
									cursor: "pointer",
								}}
								onClick={() => router.push("/")}
							/>
						)}
						<div style={{ flex: 1 }} />
						{links.length > 0 &&
							links.map((item, index) => {
								return (
									<AppLink
										key={index}
										href={item.url}
										sx={{
											marginRight: "24px",
											color:
												pathname === item.url
													? "#07617D"
													: "rgba(54, 54, 54, 0.6)",
											fontWeight:
												// pathname === item.url &&
												700,
											// padding: "8px",
											// "&:hover": {
											// 	background: "rgba(0,0,0,0.1)",
											// },
										}}
									>
										{item.title}
									</AppLink>
								);
							})}
					</Box>

					{/* <NotificationsNoneOutlinedIcon
						sx={{
							marginRight: "20px",
							color: "#313D4E",
							cursor: "pointer",
						}}
					/> */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<TextField
							sx={{ width: "180px", marginRight: "20px" }}
							size="small"
							id="outlined-basic"
							label="Search"
							variant="outlined"
						/>
						<Notification
							sx={{
								cursor: "pointer",
							}}
						/>

						{currentUser ? (
							<div>
								<IconButton
									sx={{ marginLeft: "10px" }}
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<Avatar
										sx={{
											cursor: "pointer",
											width: 40,
											height: 40,
										}}
										alt="ABC"
										src=""
									/>
								</IconButton>
								<Menu
									sx={{ mt: "40px" }}
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									{/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
									<MenuItem
										sx={{
											color: "rgba(88, 96, 215, 6)",
											fontSize: "16px",
											fontWeight: "700",
											marginX: "8px",
											":hover": {
												background:
													"rgba(88, 96, 215, 0.10)",
												borderRadius: "5px",
											},
										}}
										onClick={() => handleLogout()}
									>
										Logout
									</MenuItem>
								</Menu>
							</div>
						) : (
							<MenuItem onClick={() => handleLogin()}>
								Login
							</MenuItem>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default AppHeader;
