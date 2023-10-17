import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { TiTick } from "react-icons/ti";
import { auth, db } from "../../firebase/firebase";
import styles from "./AddNote.module.css";

export default function AddNote() {
	const [uid, setUid] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [details, setDetails] = useState<string>("");
	const handleSubmit = useCallback(async () => {
		console.log("clicked");
		if (title) {
			try {
				const docRef = await addDoc(collection(db, "notes"), {
					title,
					details,
					uid,
				});
				console.log(docRef);
			} catch (error) {
				console.log(error);
			}
		} else console.log("no title");
	}, [details, title, uid]);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			}
		});
	}, []);
	return (
		<div className="min-h-full mt-5 relative">
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
				onClick={handleSubmit}
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
		</div>
	);
}
