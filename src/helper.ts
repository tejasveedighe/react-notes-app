import { toast } from "react-toastify";
export const notify = (type: string, title: string) => {
	if (type === "error") {
		toast.error(title, {
			position: toast.POSITION.TOP_RIGHT,
		});
	} else
		toast.success(title, {
			position: toast.POSITION.TOP_RIGHT,
		});
};
