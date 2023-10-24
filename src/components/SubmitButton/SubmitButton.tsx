import { IconContext } from "react-icons";
import { TiTick } from "react-icons/ti";

type props = {
	handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
};

function SubmitButton({ handleSubmit }: props) {
	return (
		<button
			onClick={handleSubmit}
			className="fixed bottom-3 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
		>
			<IconContext.Provider
				value={{
					size: "1.5em",
				}}
			>
				<TiTick />
			</IconContext.Provider>
		</button>
	);
}

export default SubmitButton;
