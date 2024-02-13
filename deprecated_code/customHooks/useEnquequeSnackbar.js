// import { useSnackbar  } from "notistack";
import Snackbar from "components/common/Feedback/Snackbars/CustomSuccessSnackbar";
import { useSnackbar as useDefaultSnackbar } from "notistack";

const useEnqueueSnackbar = () => {
	const { enqueueSnackbar, closeSnackbar } = useDefaultSnackbar();

	const pushSnackbar = (
		message,
		// extend the default options object
		options,
	) => {
		enqueueSnackbar(message, {
			...options,
			content: (key) => {
				// destructure the options we need from the extended options
				// object, and provide a default case if we didn't provide any
				const { variant, iconVariant } = options || {
					variant: undefined,
				};
				return (
					<Snackbar
						id={`${key}`}
						message={message}
						variant={variant || "success"}
						iconVariant={iconVariant}
						closeSnackbar={() => closeSnackbar(key)}
					/>
				);
			},
		});
	};

	return pushSnackbar;
};

export default useEnqueueSnackbar;
