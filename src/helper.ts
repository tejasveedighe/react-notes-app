import { toast } from "react-toastify";
export const notify = (type: string, title: string) => {
	if (type === "error") {
		toast.error(`${title} Upload Failed`, {
			position: toast.POSITION.TOP_RIGHT,
		});
	} else
		toast.success(`${title} Uploaded!`, {
			position: toast.POSITION.TOP_RIGHT,
		});
};
