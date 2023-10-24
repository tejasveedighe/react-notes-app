import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { auth, db } from "../../firebase/firebase";
import { notify } from "../../helper";
import { NoteType } from "../../types/Notes";
import styles from "./AddNote.module.css";

export default function AddNote() {
	const [uid, setUid] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [details, setDetails] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const navigate = useNavigate();
	const handleSubmit = useCallback(async () => {
		const newNote: NoteType = {
			title: title,
			note: details,
			authorid: uid,
			category: {
				title: category,
			},
			date: new Date(),
		};
		const docRef = await addDoc(collection(db, "notes"), newNote);
		if (docRef) {
			notify("success", `${title} Uploaded!!`);
			navigate("/");
		} else {
			notify("error", `${title} Falied to Upload!`);
		}
	}, [category, details, navigate, title, uid]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			} else {
				notify("error", "please login");
			}
		});
	}, []);
	return (
		<div className="min-h-full mt-5 relative">
			<div className={styles.inputsContainer}>
				<Input
					required
					autoFocus
					placeholder="Title.."
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<Input
					placeholder="Category of Note"
					onChange={(e) => setCategory(e.target.value)}
					value={category}
				/>
				<textarea
					className={styles.textInput}
					placeholder="Notes.."
					onChange={(e) => setDetails(e.target.value)}
					value={details}
					rows={15}
				/>
			</div>
			<SubmitButton handleSubmit={handleSubmit} />
		</div>
	);
}
