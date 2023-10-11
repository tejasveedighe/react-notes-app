import { FormEvent, useCallback, useState } from "react";
import styles from "./AddNote.module.css";
import { TiTick } from "react-icons/ti";
import { IconContext } from "react-icons";

export default function AddNote() {
	const [title, setTitle] = useState<string>("");
	const [details, setDetails] = useState<string>("");
	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			if (title) {
				console.log(title, details);
			}
		},
		[details, title]
	);
	return (
		<div className="min-h-full mt-5 relative">
			<form onSubmit={handleSubmit}>
				<div className={styles.inputsContainer}>
					<input
						required
						autoFocus
						className={styles.titleInput}
						placeholder="Title.."
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
					<textarea
						className={styles.textInput}
						placeholder="Notes.."
						onChange={(e) => setDetails(e.target.value)}
						value={details}
						rows={15}
					/>
				</div>
				<button
					type="submit"
					className="absolute bottom-3 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
				>
					<IconContext.Provider
						value={{
							size: "1.5em",
						}}
					>
						<TiTick />
					</IconContext.Provider>
				</button>
			</form>
		</div>
	);
}
